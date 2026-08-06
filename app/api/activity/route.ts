import { Redis } from "@upstash/redis"
import { NextRequest, NextResponse } from "next/server"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

/*
 * Contador histórico.
 *
 * Essa chave já existe no projeto e NÃO deve ser apagada.
 * Ela passa a representar o total global de atividades
 * registradas desde o início.
 */
const ACTIVITY_TOTAL_KEY = "ton:activity:count"

const ACTIVITY_LATEST_KEY = "ton:activity:latest"

/*
 * Retorna a data atual considerando o horário de Brasília.
 *
 * Exemplo:
 * 2026-08-05
 */
function getBrazilDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date())
}

/*
 * Cada dia possui sua própria chave no Redis.
 *
 * Exemplo:
 * ton:activity:daily:2026-08-05
 *
 * No dia seguinte:
 * ton:activity:daily:2026-08-06
 *
 * Assim não precisamos executar nenhum processo
 * à meia-noite para zerar o contador.
 */
function getDailyActivityKey() {
  return `ton:activity:daily:${getBrazilDate()}`
}

type LatestActivity = {
  id: string
  message: string
  createdAt: number
}

export async function GET() {
  try {
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
    const body = await request.json()

    const message =
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

    const dailyActivityKey = getDailyActivityKey()

    /*
     * Incrementamos os dois contadores:
     *
     * 1. Histórico/global
     * 2. Somente o dia atual
     */
    const [
      totalCount,
      todayCount,
    ] = await Promise.all([
      redis.incr(ACTIVITY_TOTAL_KEY),
      redis.incr(dailyActivityKey),
    ])

    /*
     * Mantemos a chave diária por 48 horas.
     *
     * Isso evita acumular milhares de chaves antigas
     * desnecessariamente no Redis.
     */
    await redis.expire(
      dailyActivityKey,
      60 * 60 * 48
    )

    const latestActivity: LatestActivity = {
      id: crypto.randomUUID(),
      message,
      createdAt: Date.now(),
    }

    /*
     * Mantemos exatamente o funcionamento atual
     * da última atividade.
     */
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