export type Plan = {
  id: string
  name: string
  shortName: string
  description: string
  benefits: string[]
  recommended: boolean
}

export const plans: Plan[] = [
  {
    id: "mega-plus",
    name: "Ton Mega+",
    shortName: "Mega+",
    description:
      "Uma opção completa para quem busca boas condições para vender com a Ton.",
    benefits: [],
    recommended: true,
  },
  {
    id: "black",
    name: "Ton Black",
    shortName: "Black",
    description:
      "Uma alternativa de plano Ton para diferentes perfis de negócio.",
    benefits: [],
    recommended: false,
  },
]