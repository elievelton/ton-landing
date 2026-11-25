import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const URL =
  "https://www.ton.com.br/planos-e-taxas?coupon=ELIEVELTOSILVAVC&userAnticipation=0&utm_medium=invite_share&utm_source=revendedor";

const KEYWORDS =
  /plan|plans|offer|offers|fee|fees|mdr|rate|rates|pricing|installment|installments|condition|conditions|card_brand|base_plan|tier/i;

const OUTPUT_DIR = path.resolve("ton-capture");

type PlanLike = {
  type?: string;
  name?: string;
  tierLabel?: string;
  updated_at?: string;
  conditions_updated_at?: string;
  conditions?: unknown[];
};

function collectPlans(value: unknown, found: PlanLike[][] = []): PlanLike[][] {
  if (Array.isArray(value)) {
    for (const item of value) collectPlans(item, found);
    return found;
  }

  if (!value || typeof value !== "object") return found;

  const object = value as Record<string, unknown>;
  if (Array.isArray(object.plans)) {
    found.push(object.plans as PlanLike[]);
  }

  for (const child of Object.values(object)) {
    if (child && typeof child === "object") collectPlans(child, found);
  }

  return found;
}

function extractHtmlStates(html: string): unknown[] {
  const states: unknown[] = [];
  const regex =
    /<script[^>]*id="__FRSH_STATE_[^"]+"[^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(regex)) {
    const raw = match[1]?.trim();
    if (!raw) continue;
    try {
      states.push(JSON.parse(raw));
    } catch {
      // Estado serializado em formato não JSON: ignorar.
    }
  }

  return states;
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  console.log("🌐 Abrindo página da Ton...");
  console.log(`🔗 ${URL}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const seen = new Set<string>();
  const candidateSummaries: Array<{
    source: string;
    plans: PlanLike[];
  }> = [];
  let savedResponses = 0;

  page.on("response", async (response) => {
    const responseUrl = response.url();
    const contentType = response.headers()["content-type"] ?? "";
    const isHtml = contentType.includes("text/html");
    const isRelevant = KEYWORDS.test(responseUrl);

    if (!isHtml && !isRelevant) return;

    try {
      const body = await response.text();
      const bodyHash = `${response.status()}:${body.length}:${responseUrl}`;
      if (seen.has(bodyHash)) return;
      seen.add(bodyHash);

      const states = isHtml ? extractHtmlStates(body) : [];
      let plansFound = states.flatMap((state) => collectPlans(state));

      if (!plansFound.length && /json/i.test(contentType)) {
        try {
          plansFound = collectPlans(JSON.parse(body));
        } catch {
          // Nem toda resposta JSON contém planos.
        }
      }

      const interestingBody =
        plansFound.length > 0 ||
        /base_plan|conditions|mdrs|installments|card_brand|tiers/i.test(body);

      if (!interestingBody) return;

      savedResponses++;
      const filename = `response-${String(savedResponses).padStart(3, "0")}.txt`;
      await fs.writeFile(path.join(OUTPUT_DIR, filename), body, "utf8");

      console.log(`\n📡 ${response.status()} ${responseUrl}`);
      console.log(`Content-Type: ${contentType || "não informado"}`);
      console.log(`Tamanho: ${body.length} caracteres`);

      for (const plans of plansFound) {
        const summary = {
          source: responseUrl,
          plans: plans.map((plan) => ({
            type: plan.type,
            name: plan.name,
            tierLabel: plan.tierLabel,
            updated_at: plan.updated_at,
            conditions_updated_at: plan.conditions_updated_at,
            conditions: Array.isArray(plan.conditions)
              ? plan.conditions.length
              : 0,
          })),
        };
        candidateSummaries.push({ source: responseUrl, plans });
        console.log(
          "📋 Planos encontrados:",
          summary.plans.map((p) =>
            `${p.name ?? "sem nome"} | ${p.tierLabel ?? "sem faixa"} | ${p.type ?? "sem tipo"}`,
          ),
        );
      }
    } catch (error) {
      console.log(`⚠️ Não foi possível ler ${responseUrl}: ${String(error)}`);
    }
  });

  try {
    await page.goto(URL, {
      waitUntil: "networkidle",
      timeout: 60_000,
    });
  } catch {
    console.log("⚠️ networkidle não foi atingido; continuando a captura.");
  }

  await page.waitForTimeout(12_000);

  const finalHtml = await page.content();
  const finalStates = extractHtmlStates(finalHtml);
  const finalPlans = finalStates.flatMap((state) => collectPlans(state));

  if (finalPlans.length) {
    await fs.writeFile(
      path.join(OUTPUT_DIR, "page-plans.json"),
      JSON.stringify(finalPlans, null, 2),
      "utf8",
    );
    console.log("\n📦 Estado final da página também salvo em page-plans.json");
  }

  await fs.writeFile(
    path.join(OUTPUT_DIR, "plan-summary.json"),
    JSON.stringify(
      candidateSummaries.map(({ source, plans }) => ({
        source,
        plans: plans.map((plan) => ({
          type: plan.type,
          name: plan.name,
          tierLabel: plan.tierLabel,
          updated_at: plan.updated_at,
          conditions_updated_at: plan.conditions_updated_at,
          conditions: plan.conditions,
        })),
      })),
      null,
      2,
    ),
    "utf8",
  );

  await page.screenshot({
    path: path.join(OUTPUT_DIR, "ton-page.png"),
    fullPage: true,
  });

  await browser.close();

  console.log("\n====================================");
  console.log(`✅ Captura concluída. Responses salvas: ${savedResponses}`);
  console.log(`📁 Arquivos em: ${OUTPUT_DIR}/`);
  console.log("====================================");
}

main().catch((error) => {
  console.error("❌ Erro fatal na captura:", error);
  process.exit(1);
});
