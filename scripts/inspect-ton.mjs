import fs from "node:fs";
import path from "node:path";

const files = [
  "ton-plancard-fees.js",
  "ton-modal-plan-details.js",
];

const terms = [
  "base_plan",
  "tiers",
  "anticipationValue",
  "flagValue",
  "taxes",
  "conditions",
  "mdrs",
  "installments",
  "card_brand",
];

const MAX_OCCURRENCES = 3;
const CONTEXT_BEFORE = 500;
const CONTEXT_AFTER = 1000;

function inspectFile(file) {
  const filePath = path.resolve(file);

  console.log("\n====================================");
  console.log(`📄 ${file}`);
  console.log("====================================");

  if (!fs.existsSync(filePath)) {
    console.log(`❌ Arquivo não encontrado: ${filePath}`);
    return;
  }

  let content;

  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.log(`❌ Erro ao ler ${file}:`);
    console.log(error.message);
    return;
  }

  console.log(`📦 Tamanho: ${content.length.toLocaleString("pt-BR")} caracteres`);

  for (const term of terms) {
    let position = 0;
    let count = 0;

    while (true) {
      position = content.indexOf(term, position);

      if (position === -1) {
        break;
      }

      count++;

      console.log(`\n🔎 ${term} — ocorrência ${count}`);
      console.log("------------------------------------");

      const start = Math.max(
        0,
        position - CONTEXT_BEFORE
      );

      const end = Math.min(
        content.length,
        position + term.length + CONTEXT_AFTER
      );

      console.log(
        content.slice(start, end)
      );

      position += term.length;

      if (count >= MAX_OCCURRENCES) {
        break;
      }
    }

    if (count === 0) {
      console.log(`❌ ${term} não encontrado`);
    } else if (count >= MAX_OCCURRENCES) {
      console.log(
        `⚠️ Mostrando apenas as primeiras ${MAX_OCCURRENCES} ocorrências`
      );
    }
  }
}

console.log("====================================");
console.log("🔬 INSPEÇÃO DOS SCRIPTS DA TON");
console.log("====================================");

for (const file of files) {
  inspectFile(file);
}

console.log("\n====================================");
console.log("✅ INSPEÇÃO FINALIZADA");
console.log("====================================");