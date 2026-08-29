import { createHash } from "node:crypto"
import { Redis } from "@upstash/redis"
import { NextRequest, NextResponse } from "next/server"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const LOG_KEY = "ton:logs:recent"
const MAX_LOGS = 100

const MAX_MESSAGE_LENGTH = 1000
const RATE_LIMIT_WINDOW_SECONDS = 60
const RATE_LIMIT_MAX_REQUESTS = 30

const ALLOWED_LOG_TYPES = [
  "affiliate_click",
  "csp_violation",
  "api_error",
  "rate_limit",
] as const

type LogType = (typeof ALLOWED_LOG_TYPES)[number]

type LogEntry = {
  id: string
  type: LogType
  message?: string
  path?: string
  timestamp: number
}

function getClientIp(request: NextRequest) {
  const forwardedFor =
    request.headers.get("x-forwarded-for")

  if (forwardedFor) {
    return (
      forwardedFor.split(",")[0]?.trim() ||
      "unknown"
    )
  }

  return (
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  )
}

function getRateLimitKey(request: NextRequest) {
  const ip = getClientIp(request)

  const ipHash = createHash("sha256")
    .update(ip)
    .digest("hex")

  return `ton:logs:ratelimit:${ipHash}`
}

async function checkRateLimit(
  request: NextRequest
) {
  const key = getRateLimitKey(request)

  const count = await redis.incr(key)

  if (count === 1) {
    await redis.expire(
      key,
      RATE_LIMIT_WINDOW_SECONDS
    )
  }

  return count <= RATE_LIMIT_MAX_REQUESTS
}

function isAdminAuthorized(
  request: NextRequest
) {
  const configuredToken =
    process.env.LOG_ADMIN_TOKEN

  if (!configuredToken) {
    return false
  }

  const authorization =
    request.headers.get("authorization")

  if (!authorization) {
    return false
  }

  const [scheme, token] =
    authorization.split(" ")

  return (
    scheme === "Bearer" &&
    token === configuredToken
  )
}

export async function GET(
  request: NextRequest
) {
  try {
    if (!isAdminAuthorized(request)) {
      return NextResponse.json(
        {
          error: "Não autorizado.",
        },
        {
          status: 401,
        }
      )
    }

    const logs = await redis.lrange<LogEntry>(
      LOG_KEY,
      0,
      MAX_LOGS - 1
    )

    return NextResponse.json({
      logs,
    })
  } catch (error) {
    console.error(
      "Erro ao consultar logs:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Não foi possível consultar os logs.",
      },
      {
        status: 500,
      }
    )
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const allowed =
      await checkRateLimit(request)

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

    const contentType =
      request.headers.get("content-type") ?? ""

    if (
      !contentType
        .toLowerCase()
        .includes("application/json")
    ) {
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

    const type =
      "type" in body &&
      typeof body.type === "string"
        ? body.type
        : ""

    if (
      !ALLOWED_LOG_TYPES.includes(
        type as LogType
      )
    ) {
      return NextResponse.json(
        {
          error: "Tipo de log inválido.",
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

    if (
      message &&
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json(
        {
          error: "Mensagem de log muito longa.",
        },
        {
          status: 400,
        }
      )
    }

    const path =
      "path" in body &&
      typeof body.path === "string"
        ? body.path.trim().slice(0, 500)
        : undefined

    const log: LogEntry = {
      id: crypto.randomUUID(),
      type: type as LogType,
      ...(message
        ? { message }
        : {}),
      ...(path
        ? { path }
        : {}),
      timestamp: Date.now(),
    }

    await redis.lpush(
      LOG_KEY,
      JSON.stringify(log)
    )

    await redis.ltrim(
      LOG_KEY,
      0,
      MAX_LOGS - 1
    )

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    console.error(
      "Erro ao registrar log:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Não foi possível registrar o log.",
      },
      {
        status: 500,
      }
    )
  }
}

export async function DELETE(
  request: NextRequest
) {
  try {
    if (!isAdminAuthorized(request)) {
      return NextResponse.json(
        {
          error: "Não autorizado.",
        },
        {
          status: 401,
        }
      )
    }

    await redis.del(LOG_KEY)

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(
      "Erro ao limpar logs:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Não foi possível limpar os logs.",
      },
      {
        status: 500,
      }
    )
  }
}