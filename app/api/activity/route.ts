import { Redis } from "@upstash/redis"
import { NextRequest, NextResponse } from "next/server"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const ACTIVITY_COUNT_KEY = "ton:activity:count"
const ACTIVITY_LATEST_KEY = "ton:activity:latest"

type LatestActivity = {
  id: string
  message: string
  createdAt: number
}

export async function GET() {
  try {
    const [count, latestActivity] = await Promise.all([
      redis.get<number>(ACTIVITY_COUNT_KEY),
      redis.get<LatestActivity>(ACTIVITY_LATEST_KEY),
    ])

    return NextResponse.json({
      count: count ?? 0,
      latestActivity: latestActivity ?? null,
    })
  } catch (error) {
    console.error("Erro ao consultar atividades:", error)

    return NextResponse.json(
      {
        error: "Não foi possível consultar as atividades.",
      },
      {
        status: 500,
      }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : ""

    if (!message) {
      return NextResponse.json(
        {
          error: "Mensagem da atividade é obrigatória.",
        },
        {
          status: 400,
        }
      )
    }

    const count = await redis.incr(ACTIVITY_COUNT_KEY)

    const latestActivity: LatestActivity = {
      id: crypto.randomUUID(),
      message,
      createdAt: Date.now(),
    }

    await redis.set(
      ACTIVITY_LATEST_KEY,
      latestActivity,
      {
        ex: 60 * 5,
      }
    )

    return NextResponse.json({
      count,
      latestActivity,
    })
  } catch (error) {
    console.error("Erro ao registrar atividade:", error)

    return NextResponse.json(
      {
        error: "Não foi possível registrar a atividade.",
      },
      {
        status: 500,
      }
    )
  }
}