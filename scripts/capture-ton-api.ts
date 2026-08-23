import { chromium } from "playwright";
import fs from "node:fs/promises";

const URL =
  "https://www.ton.com.br/planos-e-taxas?coupon=ELIEVELTOSILVAVC&userAnticipation=0&utm_medium=invite_share&utm_source=revendedor";

const KEYWORDS =
  /plan|plans|offer|offers|fee|fees|mdr|rate|rates|pricing|installment|installments|condition|conditions|card_brand|base_plan|tier/i;

async function main() {
  console.log("🌐 Abrindo página da Ton...");

  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  const relevantRequests = new Set<string>();
  let savedResponses = 0;

  /*
   * Captura TODAS as requests que possam ter relação
   * com planos/taxas.
   */
  page.on("request", (request) => {
    const url = request.url();

    if (KEYWORDS.test(url)) {
      relevantRequests.add(
        `${request.method()} ${url}`,
      );
    }
  });

  /*
   * Analisa responses.
   */
  page.on("response", async (response) => {
    const url = response.url();

    if (!KEYWORDS.test(url)) {
      return;
    }

    const status = response.status();

    console.log("\n📡 RESPONSE");
    console.log(`Status: ${status}`);
    console.log(`URL: ${url}`);

    const contentType =
      response.headers()["content-type"] ?? "";

    console.log(`Content-Type: ${contentType}`);

    /*
     * Só tentamos ler respostas que provavelmente
     * possuem dados.
     */
    if (
      !contentType.includes("json") &&
      !contentType.includes("text") &&
      !contentType.includes("javascript")
    ) {
      return;
    }

    try {
      const body = await response.text();

      /*
       * Procuramos especificamente a estrutura que
       * já sabemos que a calculadora da Ton consome.
       */
      const looksInteresting =
        /base_plan|conditions|mdrs|installments|card_brand|tiers/i.test(
          body,
        );

      if (!looksInteresting) {
        return;
      }

      savedResponses++;

      console.log(
        "\n🔥 POSSÍVEL FONTE DOS DADOS DAS TAXAS!",
      );

      console.log(
        `📏 Tamanho: ${body.length.toLocaleString(
          "pt-BR",
        )} caracteres`,
      );

      console.log("------------------------------------");
      console.log(body.slice(0, 3000));
      console.log("------------------------------------");

      const filename =
        `ton-response-${savedResponses}.txt`;

      await fs.writeFile(
        filename,
        body,
        "utf8",
      );

      console.log(
        `💾 Salvo em: ${filename}`,
      );
    } catch (error) {
      console.log(
        `⚠️ Não foi possível ler a response: ${url}`,
      );
    }
  });

  /*
   * Abre a página.
   */
  try {
    await page.goto(URL, {
      waitUntil: "networkidle",
      timeout: 60_000,
    });
  } catch {
    console.log(
      "⚠️ networkidle não foi atingido.",
    );
    console.log(
      "➡️ Continuando a captura...",
    );
  }

  console.log("✅ Página carregada");

  /*
   * Espera requests tardias.
   */
  await page.waitForTimeout(10_000);

  console.log(
    "\n====================================",
  );
  console.log("📡 REQUESTS RELEVANTES");
  console.log(
    "====================================",
  );

  if (relevantRequests.size === 0) {
    console.log(
      "❌ Nenhuma request relevante encontrada.",
    );
  } else {
    for (const request of relevantRequests) {
      console.log(request);
    }
  }

  console.log(
    `\n💾 Responses interessantes salvas: ${savedResponses}`,
  );

  await page.screenshot({
    path: "ton-api-capture.png",
    fullPage: true,
  });

  console.log(
    "📸 Screenshot: ton-api-capture.png",
  );

  await browser.close();

  console.log(
    "\n✅ Captura finalizada.",
  );
}

main().catch((error) => {
  console.error(
    "\n❌ Erro fatal:",
  );
  console.error(error);
  process.exit(1);
});