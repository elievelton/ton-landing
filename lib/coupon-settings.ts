import { Redis } from "@upstash/redis"

export const COUPON_SETTINGS_KEY = "ton:settings:coupon-percent"
export const DEFAULT_COUPON_PERCENT = 30

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export async function getCouponPercent(): Promise<number> {
  const value = await redis.get<number | string>(COUPON_SETTINGS_KEY)
  const percent = Number(value)

  if (!Number.isInteger(percent) || percent < 0 || percent > 100) {
    return DEFAULT_COUPON_PERCENT
  }

  return percent
}
