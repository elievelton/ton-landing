export type Machine = {
  id: string
  plan: "mega" | "top"
  name: string
  description: string
  image: string
  features: string[]
  featured: boolean
  tonDiscount: number
  couponEligible: boolean
  bestSeller?: boolean
  badge?: string
  cnpjOnly?: boolean
}

const sharedSmartFeatures = [
  "Tela touchscreen",
  "Comprovante impresso",
  "Pagamento por aproximação (NFC)",
  "Conexão Wi-Fi e chip 4G",
  "Frete grátis",
  "Garantia vitalícia",
  "Bateria de longa duração",
]

const sharedT3Features = [
  "Comprovante impresso",
  "Pagamento por aproximação (NFC)",
  "Conexão Wi-Fi e chip",
  "Frete grátis",
  "Garantia vitalícia",
  "Bateria para vendas no dia a dia",
]

export const machines: Machine[] = [
  {
    id: "mega-t3-smart",
    plan: "mega",
    name: "T3 Smart Mega+",
    description: "A maquininha Android, mais rápida e com melhor bateria.",
    image: "/images/machines/t3-smart.webp",
    features: sharedSmartFeatures,
    featured: true,
    bestSeller: true,
    badge: "Mais vendida",
    tonDiscount: 71,
    couponEligible: true,
  },
  {
    id: "mega-t3",
    plan: "mega",
    name: "T3 Mega+",
    description: "A maquininha com comprovante impresso.",
    image: "/images/machines/t3.webp",
    features: sharedT3Features,
    featured: true,
    tonDiscount: 72,
    couponEligible: true,
  },
  {
    id: "mega-t2",
    plan: "mega",
    name: "T2 Mega+",
    description: "A maquininha compacta que está sempre com você.",
    image: "/images/machines/t2.webp",
    features: [
      "Comprovante por SMS",
      "Pagamento por aproximação (NFC)",
      "Conexão Wi-Fi e chip 3G",
      "Aceita Pix na maquininha",
      "Frete grátis",
      "Garantia vitalícia",
    ],
    featured: false,
    tonDiscount: 72,
    couponEligible: true,
  },
  {
    id: "mega-t1",
    plan: "mega",
    name: "T1 Mega+",
    description: "A maquininha compacta que conecta com o seu celular.",
    image: "/images/machines/t1.webp",
    features: [
      "Precisa de celular com internet",
      "Comprovante por SMS",
      "Pagamento por aproximação (NFC)",
      "Frete grátis",
      "Garantia vitalícia",
    ],
    featured: false,
    tonDiscount: 70,
    couponEligible: false,
  },
  {
    id: "top-t3-smart",
    plan: "top",
    name: "T3 Smart Top",
    description: "A maquininha Android, mais rápida e com melhor bateria.",
    image: "/images/machines/t3-smart.webp",
    features: sharedSmartFeatures,
    featured: true,
    tonDiscount: 73,
    couponEligible: true,
    cnpjOnly: true,
  },
  {
    id: "top-t3",
    plan: "top",
    name: "T3 Top",
    description: "A maquininha com comprovante impresso.",
    image: "/images/machines/t3.webp",
    features: sharedT3Features,
    featured: false,
    tonDiscount: 72,
    couponEligible: true,
    cnpjOnly: true,
  },
]
