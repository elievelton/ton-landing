export type Plan = {
  id: string
  name: string
  shortName: string
  description: string
  benefits: string[]
  recommended: boolean
  badge?: string

  rates: {
    debit: string
    credit: string
    credit12x: string
  }

  rateHighlight?: string
  rateNote?: string
}

export const plans: Plan[] = [
  {
    id: "mega-plus",
    name: "Ton Mega+",
    shortName: "Mega+",
    description:
      "A principal oferta da Ton para quem busca taxas competitivas e condições que acompanham o crescimento do negócio.",

    rates: {
      debit: "0,57%",
      credit: "0,57%",
      credit12x: "7,97%",
    },

    rateHighlight:
      "Menor taxa do mercado pra vender parcelado",

    rateNote:
      "Taxas promocionais válidas durante 30 dias ou até atingir R$ 5 mil em vendas.",

    benefits: [
      "Disponível para CPF e CNPJ",
      "Opções de recebimento na hora ou em 1 dia útil",
      "Taxas que variam conforme a faixa de faturamento",
      "Pix 0% conforme as condições do plano",
      "Disponível para T1, T2, T3 e T3 Smart",
    ],

    recommended: true,
    badge: "Recomendado",
  },

  {
    id: "top",
    name: "Ton Top",
    shortName: "Top",
    description:
      "Plano exclusivo para MEI e empresas com CNPJ, com taxas que variam conforme o faturamento mensal, a bandeira e o prazo de recebimento.",

    rates: {
      debit: "1,09%",
      credit: "2,82%",
      credit12x: "10,88%",
    },

    rateNote:
      "Referência para Visa/Mastercard, recebimento na hora e faturamento acima de R$ 30 mil/mês. Consulte as demais faixas e condições na calculadora.",

    benefits: [
      "Exclusivo para MEI e empresas com CNPJ",
      "Cinco faixas de faturamento: até R$ 6 mil, R$ 6–10 mil, R$ 10–20 mil, R$ 20–30 mil e acima de R$ 30 mil",
      "Taxas variam conforme bandeira e prazo de recebimento",
      "Consulte as condições na calculadora de taxas",
    ],

    recommended: false,
    badge: "Exclusivo parceiro",
  },
]