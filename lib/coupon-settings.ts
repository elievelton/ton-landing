import { Redis } from "@upstash/redis"
import { DEFAULT_COUPON_PERCENT } from "@/config/coupon-defaults"

export const COUPON_SETTINGS_KEY = "ton:settings:coupon-percent"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export async function getCouponPercent(): Promise<number> {
  try {
    const value = await redis.get<number | string>(COUPON_SETTINGS_KEY)
    if (value === null || value === undefined) return DEFAULT_COUPON_PERCENT

    const percent = Number(value)
    if (!Number.isInteger(percent) || percent < 0 || percent > 100) {
      return DEFAULT_COUPON_PERCENT
    }

    return percent
  } catch (error) {
    console.error("Erro ao carregar percentual do cupom:", error)
    return DEFAULT_COUPON_PERCENT
  }
}
