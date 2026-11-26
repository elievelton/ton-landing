import { NextResponse } from "next/server"
import { getCouponPercent } from "@/lib/coupon-settings"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    return NextResponse.json({ percent: await getCouponPercent() }, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    })
  } catch (error) {
    console.error("Erro ao consultar percentual do cupom:", error)
    return NextResponse.json({ percent: 30 }, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    })
  }
}
