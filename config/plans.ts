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
      "Plano Ton Top com faixas de taxas definidas conforme o volume mensal de vendas.",

    rates: {
      debit: "Variável",
      credit: "Variável",
      credit12x: "Variável",
    },

    rateNote:
      "Taxas organizadas por faixa de faturamento mensal.",

    benefits: [
      "Plano Ton Top",
      "Alternativa ao plano Mega+",
      "Condições próprias de taxas e recebimento",
    ],

    recommended: false,
    badge: "Exclusivo parceiro",
  },
]