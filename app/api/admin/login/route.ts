import { createHash } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"

const SESSION_COOKIE =
  "ton_admin_session"

function createSessionValue(
  user: string,
  password: string
) {
  return createHash("sha256")
    .update(`${user}:${password}`)
    .digest("hex")
}

export async function POST(
  request: NextRequest
) {
  try {
    const configuredUser =
      process.env.LOG_ADMIN_USER

    const configuredPassword =
      process.env.LOG_ADMIN_PASSWORD

    if (
      !configuredUser ||
      !configuredPassword
    ) {
      return NextResponse.json(
        {
          error:
            "Autenticação administrativa não configurada.",
        },
        {
          status: 503,
        }
      )
    }

    const body = await request.json()

    const user =
      typeof body?.user === "string"
        ? body.user
        : ""

    const password =
      typeof body?.password === "string"
        ? body.password
        : ""

    if (
      user !== configuredUser ||
      password !== configuredPassword
    ) {
      return NextResponse.json(
        {
          error: "Credenciais inválidas.",
        },
        {
          status: 401,
        }
      )
    }

    const sessionValue =
      createSessionValue(
        configuredUser,
        configuredPassword
      )

    const response =
      NextResponse.json({
        success: true,
      })

    response.cookies.set({
      name: SESSION_COOKIE,
      value: sessionValue,
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/admin",
      maxAge: 60 * 60 * 8,
    })

    return response
  } catch {
    return NextResponse.json(
      {
        error: "Requisição inválida.",
      },
      {
        status: 400,
      }
    )
  }
}