import { getCouponPercent } from "@/lib/coupon-settings"
import { NotFoundContent } from "@/components/sections/NotFoundContent"

export const dynamic = "force-dynamic"

export default async function NotFound() {
  const couponPercent = await getCouponPercent()
  return <NotFoundContent couponPercent={couponPercent} />
}
