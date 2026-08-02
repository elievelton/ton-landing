export type Machine = {
  id: string
  name: string
  description: string
  image: string
  features: string[]
  featured: boolean
}

export const machines: Machine[] = [
  {
    id: "t3-smart",
    name: "T3 Smart",
    description:
      "A solução mais completa para quem busca praticidade e uma experiência moderna nas vendas.",
    image: "/images/machines/t3-smart.webp",
    features: [
      "Tela touchscreen",
      "Comprovante impresso",
      "Pagamento por aproximação",
      "Conexão Wi-Fi e chip",
    ],
    featured: true,
  },
  {
    id: "t3",
    name: "T3",
    description:
      "Uma máquina completa para quem vende com frequência e precisa de agilidade no dia a dia.",
    image: "/images/machines/t3.webp",
    features: [
      "Comprovante impresso",
      "Pagamento por aproximação",
      "Conexão Wi-Fi e chip",
      "Bateria para vendas no dia a dia",
    ],
    featured: true,
  },
  {
    id: "t2",
    name: "T2",
    description:
      "Compacta e prática para quem precisa levar a maquininha para diferentes lugares.",
    image: "/images/machines/t2.webp",
    features: [
      "Design compacto",
      "Pagamento por aproximação",
      "Conexão Wi-Fi e chip",
      "Comprovante digital",
    ],
    featured: false,
  },
  {
    id: "t1",
    name: "T1",
    description:
      "Uma opção simples para quem está começando a aceitar pagamentos com cartão.",
    image: "/images/machines/t1.webp",
    features: [
      "Compacta e leve",
      "Pagamento por aproximação",
      "Comprovante digital",
      "Ideal para começar",
    ],
    featured: false,
  },
]