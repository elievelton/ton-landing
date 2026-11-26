import { AcceptedBrands } from "@/components/sections/AcceptedBrands"
import { Hero } from "@/components/sections/Hero"
import { Machines } from "@/components/sections/Machines"
import { Plans } from "@/components/sections/Plans"
import { Benefits } from "@/components/sections/Benefits"
import { TapTon } from "@/components/sections/TapTon"
import { Consultant } from "@/components/sections/Consultant"
import { About } from "@/components/sections/About"
import { FAQ } from "@/components/sections/FAQ"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { PromotionBanner } from "@/components/sections/PromotionBanner"
import TaxCalculator from "@/components/sections/tax-calculator"
import { IntentRouter } from "@/components/sections/IntentRouter"
import { getCouponPercent } from "@/lib/coupon-settings"

export const dynamic = "force-dynamic"

export default async function Home() {
  const couponPercent = await getCouponPercent()

  return (
    <>
    <IntentRouter />
      <Hero couponPercent={couponPercent} />
      <PromotionBanner couponPercent={couponPercent} />
      <Benefits />
      <Machines />
      <AcceptedBrands />
      <Plans />
      <TaxCalculator />
      <TapTon />
      <Consultant />
      <About />
      <FAQ />
      <FinalCTA couponPercent={couponPercent} />
    </>
  )
}