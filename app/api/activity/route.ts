import { createHash } from "node:crypto"
import { Redis } from "@upstash/redis"
import { NextRequest, NextResponse } from "next/server"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const ACTIVITY_TOTAL_KEY = "ton:activity:count"
const ACTIVITY_LATEST_KEY = "ton:activity:latest"

const MAX_MESSAGE_LENGTH = 200
const RATE_LIMIT_WINDOW_SECONDS = 60
const POST_RATE_LIMIT_MAX_REQUESTS = 15
const GET_RATE_LIMIT_MAX_REQUESTS = 50

function getBrazilDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date())
}

function getDailyActivityKey() {
  return `ton:activity:daily:${getBrazilDate()}`
}

type LatestActivity = {
  id: string
  message: string
  createdAt: number
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown"
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown"
}

function getRateLimitKey(
  request: NextRequest,
  scope: "get" | "post"
) {
  const ip = getClientIp(request)

  const ipHash = createHash("sha256")
    .update(ip)
    .digest("hex")

  return `ton:activity:ratelimit:${scope}:${ipHash}`
}

async function checkRateLimit(
  request: NextRequest,
  scope: "get" | "post",
  maxRequests: number
) {
  const key = getRateLimitKey(request, scope)

  const count = await redis.incr(key)

  if (count === 1) {
    await redis.expire(key, RATE_LIMIT_WINDOW_SECONDS)
  }

  return count <= maxRequests
}

export async function GET(request: NextRequest) {
  try {
    const allowed = await checkRateLimit(
      request,
      "get",
      GET_RATE_LIMIT_MAX_REQUESTS
    )

    if (!allowed) {
      return NextResponse.json(
        {
          error:
            "Muitas solicitações. Tente novamente em instantes.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              RATE_LIMIT_WINDOW_SECONDS
            ),
          },
        }
      )
    }
    const dailyActivityKey = getDailyActivityKey()

    const [
      totalCount,
      todayCount,
      latestActivity,
    ] = await Promise.all([
      redis.get<number>(ACTIVITY_TOTAL_KEY),
      redis.get<number>(dailyActivityKey),
      redis.get<LatestActivity>(ACTIVITY_LATEST_KEY),
    ])

    return NextResponse.json({
      totalCount: totalCount ?? 0,
      todayCount: todayCount ?? 0,
      latestActivity: latestActivity ?? null,
    })
  } catch (error) {
    console.error(
      "Erro ao consultar atividades:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Não foi possível consultar as atividades.",
      },
      {
        status: 500,
      }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const allowed = await checkRateLimit(
      request,
      "post",
      POST_RATE_LIMIT_MAX_REQUESTS
    )

    if (!allowed) {
      return NextResponse.json(
        {
          error:
            "Muitas solicitações. Tente novamente em instantes.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              RATE_LIMIT_WINDOW_SECONDS
            ),
          },
        }
      )
    }

    const contentType = request.headers.get("content-type") ?? ""

    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        {
          error:
            "O conteúdo da solicitação deve ser JSON.",
        },
        {
          status: 415,
        }
      )
    }

    let body: unknown

    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        {
          error: "JSON inválido.",
        },
        {
          status: 400,
        }
      )
    }

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          error: "Formato de dados inválido.",
        },
        {
          status: 400,
        }
      )
    }

    const message =
      "message" in body &&
      typeof body.message === "string"
        ? body.message.trim()
        : ""

    if (!message) {
      return NextResponse.json(
        {
          error:
            "Mensagem da atividade é obrigatória.",
        },
        {
          status: 400,
        }
      )
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        {
          error:
            "Mensagem da atividade é muito longa.",
        },
        {
          status: 400,
        }
      )
    }

    const dailyActivityKey = getDailyActivityKey()

    const [
      totalCount,
      todayCount,
    ] = await Promise.all([
      redis.incr(ACTIVITY_TOTAL_KEY),
      redis.incr(dailyActivityKey),
    ])

    await redis.expire(
      dailyActivityKey,
      60 * 60 * 48
    )

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
      totalCount,
      todayCount,
      latestActivity,
    })
  } catch (error) {
    console.error(
      "Erro ao registrar atividade:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Não foi possível registrar a atividade.",
      },
      {
        status: 500,
      }
    )
  }
}
