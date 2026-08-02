export type AcceptedBrand = {
  id: string
  name: string
  image: string
  cnpjOnly?: boolean
}

export const acceptedBrands: AcceptedBrand[] = [
  {
    id: "mastercard",
    name: "Mastercard",
    image: "/images/brands/mastercard.svg",
  },
  {
    id: "visa",
    name: "Visa",
    image: "/images/brands/visa.svg",
  },
  {
    id: "elo",
    name: "Elo",
    image: "/images/brands/elo.svg",
  },
  {
    id: "amex",
    name: "American Express",
    image: "/images/brands/amex.svg",
  },
  {
    id: "pluxee",
    name: "Pluxee",
    image: "/images/brands/pluxee.svg",
    cnpjOnly: true,
  },
  {
    id: "ticket",
    name: "Ticket",
    image: "/images/brands/ticket.svg",
    cnpjOnly: true,
  },
  {
    id: "vr",
    name: "VR",
    image: "/images/brands/vr.svg",
    cnpjOnly: true,
  },
  {
    id: "alelo",
    name: "Alelo",
    image: "/images/brands/alelo.svg",
    cnpjOnly: true,
  },
  {
    id: "goodcard",
    name: "GoodCard",
    image: "/images/brands/goodcard.svg",
  },
  {
    id: "personal-card",
    name: "Personal Card",
    image: "/images/brands/personal-card.svg",
  },
  {
    id: "banes-card",
    name: "Banes Card",
    image: "/images/brands/banes-card.svg",
  },
  {
    id: "up-brasil",
    name: "Up Brasil",
    image: "/images/brands/up-brasil.svg",
    cnpjOnly: true,
  },
]