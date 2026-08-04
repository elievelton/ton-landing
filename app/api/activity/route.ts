import { Redis } from "@upstash/redis"
import { NextResponse } from "next/server"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const ACTIVITY_KEY = "ton:activity:count"

export async function GET() {
  try {
    const count = (await redis.get<number>(ACTIVITY_KEY)) ?? 0

    return NextResponse.json({
      count,
    })
  } catch (error) {
    console.error("Erro ao consultar contador:", error)

    return NextResponse.json(
      {
        error: "Não foi possível consultar o contador.",
      },
      {
        status: 500,
      }
    )
  }
}

export async function POST() {
  try {
    const count = await redis.incr(ACTIVITY_KEY)

    return NextResponse.json({
      count,
    })
  } catch (error) {
    console.error("Erro ao incrementar contador:", error)

    return NextResponse.json(
      {
        error: "Não foi possível incrementar o contador.",
      },
      {
        status: 500,
      }
    )
  }
}