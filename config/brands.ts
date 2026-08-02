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
    image: "/images/brands/flag-visa.svg",
  },
  {
    id: "elo",
    name: "Elo",
    image: "/images/brands/flag-elo.svg",
  },
  {
    id: "amex",
    name: "American Express",
    image: "/images/brands/flag-amex.svg",
  },
  {
    id: "pluxee",
    name: "Pluxee",
    image: "/images/brands/flag-pluxee.svg",
    cnpjOnly: true,
  },
  {
    id: "ticket",
    name: "Ticket",
    image: "/images/brands/flag-ticket.svg",
    cnpjOnly: true,
  },
  {
    id: "vr",
    name: "VR",
    image: "/images/brands/flag-vr.svg",
    cnpjOnly: true,
  },
  {
    id: "alelo",
    name: "Alelo",
    image: "/images/brands/flag-alelo.svg",
    cnpjOnly: true,
  },
  {
    id: "goodcard",
    name: "GoodCard",
    image: "/images/brands/flag-goodcard.svg",
  },
  {
    id: "personal-card",
    name: "Personal Card",
    image: "/images/brands/flag-personal.svg",
  },
  {
    id: "banes-card",
    name: "Banes Card",
    image: "/images/brands/flag-banes.svg",
  },
  {
    id: "up-brasil",
    name: "Up Brasil",
    image: "/images/brands/flag-up.svg",
    cnpjOnly: true,
  },
]