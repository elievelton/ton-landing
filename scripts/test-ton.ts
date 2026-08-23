import { chromium } from "playwright"
import fs from "node:fs/promises"

const TON_URL =
  "https://www.ton.com.br/planos-e-taxas?coupon=ELIEVELTOSILVAVC&userAnticipation=0&utm_medium=invite_share&utm_source=revendedor"

async function main() {
  const browser = await chromium.launch({
    headless: true,
  })

  const page = await browser.newPage()

  const scripts: string[] = []

  page.on("response", async (response) => {
    const url = response.url()

    if (
      url.includes("island-plancardallfeesslider.js") ||
      url.includes("island-modalplandetailsdynamicisland.js")
    ) {
      console.log("\n📦 SCRIPT ENCONTRADO:")
      console.log(url)

      try {
        const content = await response.text()

        scripts.push(content)

        const filename = url.includes(
          "plancardallfeesslider"
        )
          ? "ton-plancard-fees.js"
          : "ton-modal-plan-details.js"

        await fs.writeFile(filename, content)

        console.log(
          `💾 Salvo em: ${filename}`
        )

        const keywords = [
          "fee",
          "fees",
          "rate",
          "rates",
          "tax",
          "parcel",
          "21",
          "3000",
          "30000",
          "visa",
          "mastercard",
          "elo",
          "amex",
        ]

        console.log("\n🔎 PALAVRAS ENCONTRADAS:")

        for (const keyword of keywords) {
          if (
            content
              .toLowerCase()
              .includes(keyword.toLowerCase())
          ) {
            console.log(`✅ ${keyword}`)
          }
        }
      } catch (error) {
        console.error(
          "❌ Erro ao ler script:",
          error
        )
      }
    }
  })

  console.log("🌐 Abrindo Ton...")

  await page.goto(TON_URL, {
    waitUntil: "networkidle",
    timeout: 60_000,
  })

  console.log("\n✅ Página carregada")

  await page.waitForTimeout(3_000)

  await browser.close()

  console.log(
    `\n📊 Total de scripts analisados: ${scripts.length}`
  )
}

main().catch((error) => {
  console.error("❌ Erro:", error)
  process.exit(1)
})