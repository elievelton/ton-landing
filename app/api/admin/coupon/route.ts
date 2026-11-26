import { Redis } from "@upstash/redis"
import { NextRequest, NextResponse } from "next/server"
import { COUPON_SETTINGS_KEY, DEFAULT_COUPON_PERCENT } from "@/lib/coupon-settings"
import { isValidAdminSession, ADMIN_SESSION_COOKIE } from "@/lib/admin-auth"

export const dynamic = "force-dynamic"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

function unauthorized() {
  return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
}

export async function GET(request: NextRequest) {
  if (!isValidAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return unauthorized()
  }

  try {
    const stored = await redis.get<number | string>(COUPON_SETTINGS_KEY)
    const percent = Number(stored)
    return NextResponse.json({
      percent: Number.isInteger(percent) && percent >= 0 && percent <= 100
        ? percent
        : DEFAULT_COUPON_PERCENT,
    }, { headers: { "Cache-Control": "no-store, max-age=0" } })
  } catch (error) {
    console.error("Erro ao consultar configuração do cupom:", error)
    return NextResponse.json({ error: "Não foi possível carregar a configuração." }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!isValidAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return unauthorized()
  }

  try {
    const body: unknown = await request.json()
    if (
      typeof body !== "object" || body === null ||
      !("percent" in body) ||
      typeof body.percent !== "number" ||
      !Number.isInteger(body.percent) ||
      body.percent < 0 || body.percent > 100
    ) {
      return NextResponse.json({ error: "Informe um percentual inteiro entre 0 e 100." }, { status: 400 })
    }

    await redis.set(COUPON_SETTINGS_KEY, body.percent)
    return NextResponse.json({ success: true, percent: body.percent })
  } catch (error) {
    console.error("Erro ao salvar configuração do cupom:", error)
    return NextResponse.json({ error: "Não foi possível salvar a configuração." }, { status: 500 })
  }
}
