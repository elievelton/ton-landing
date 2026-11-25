const PROMO_START = new Date("2026-11-01T00:00:00-03:00")
const PROMO_END = new Date("2026-12-01T00:00:00-03:00")

/** Retorna o percentual do cupom conforme o calendário de São Paulo. */
export function getCouponDiscount(now: Date = new Date()): number {
  const localDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now)

  const promoStart = "2026-11-01"
  const promoEnd = "2026-12-01"

  return localDate >= promoStart && localDate < promoEnd ? 0.3 : 0.2
}

export function getCouponPercentLabel(now: Date = new Date()): string {
  return String(Math.round(getCouponDiscount(now) * 100))
}
