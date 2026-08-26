export type Machine = {
  id: string
  name: string
  description: string
  image: string
  features: string[]
  featured: boolean

  // Destaques comerciais opcionais
  bestSeller?: boolean
  discount?: string
  badge?: string
}

export const machines: Machine[] = [
  {
    id: "t3-smart",
    name: "T3 Smart",
    description:
      "A solução mais completa para quem busca praticidade e uma experiência moderna nas vendas.",
    image: "/images/machines/t3-smart.webp",
    features: [
      "Tela touchscreen (Diferencial)",
      "Comprovante impresso",
      "Pagamento por aproximação",
      "Conexão Wi-Fi e chip",
      "Internet grátis",
      "Frete grátis",
      "Garantia Vitalícia, quebrou trocou!",
      "Bateria de Longa Duração",
      "Parcele vendas em até 21x",
    ],
    featured: true,
    bestSeller: true,
    discount: "Até 71% OFF",
    badge: "Mais vendida",
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
      "Internet grátis",
      "Garantia Vitalícia, quebrou trocou!",
      "Frete grátis",
      "Parcele vendas em até 21x",
      "Faz tudo que a Smart faz, mas sem touchscreen ",
    ],
    featured: true,
    discount: "Até 72% OFF",
  },

  {
    id: "t2",
    name: "T2",
    description:
      "Compacta e prática para quem precisa levar a maquininha para diferentes lugares.",
    image: "/images/machines/t2.webp",
    features: [
      "Leve design compacto",
      "Pagamento por aproximação",
      "Conexão Wi-Fi e chip",
      "Comprovante digital",
      "Internet grátis",
      "Garantia Vitalícia, quebrou trocou!",
      "Frete grátis",
      "Parcele vendas em até 12x",
      "Seu Diferencia é ser Portatil"
    ],
    featured: false,
    discount: "Até 72% OFF",
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
      "Precisa de celular com internet",
      "Garantia Vitalícia, quebrou trocou!",
      "Frete grátis",
      "Parcele vendas em até 12x",
      "Ideal para começar, baixo investimento",
    ],
    featured: false,
    discount: "Até 70% OFF",
  },
]