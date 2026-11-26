type MachinePriceConfig = {
  originalPrice: number
  priceBeforeCoupon: number
  couponEligible: boolean
  installments: number
}

const MACHINE_PRICES: Record<string, MachinePriceConfig> = {
  "mega-t3-smart": { originalPrice: 671.43, priceBeforeCoupon: 191.89, couponEligible: true, installments: 12 },
  "mega-t3": { originalPrice: 391.92, priceBeforeCoupon: 108, couponEligible: true, installments: 12 },
  "mega-t2": { originalPrice: 151.29, priceBeforeCoupon: 42.36, couponEligible: true, installments: 12 },
  "mega-t1": { originalPrice: 56.57, priceBeforeCoupon: 16.8, couponEligible: false, installments: 12 },
  "top-t3-smart": { originalPrice: 699.43, priceBeforeCoupon: 189, couponEligible: true, installments: 12 },
  "top-t3": { originalPrice: 179.17, priceBeforeCoupon: 129, couponEligible: true, installments: 12 },
}

function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function getMachinePrice(id: string, couponPercent: number) {
  const config = MACHINE_PRICES[id]
  if (!config) return null

  const discount = config.couponEligible ? couponPercent / 100 : 0
  const currentPrice = roundCurrency(config.priceBeforeCoupon * (1 - discount))
  const installmentPrice = Math.floor((currentPrice / config.installments + Number.EPSILON) * 100) / 100

  return {
    original: formatBRL(config.originalPrice),
    current: formatBRL(currentPrice),
    amount: currentPrice,
    beforeCoupon: config.priceBeforeCoupon,
    couponDiscount: discount,
    couponSavings: roundCurrency(config.priceBeforeCoupon - currentPrice),
    installments: config.installments,
    perInstallment: formatBRL(installmentPrice),
    couponEligible: config.couponEligible,
  }
}
