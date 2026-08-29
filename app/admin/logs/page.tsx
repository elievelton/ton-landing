import { createHash } from "node:crypto"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const LOG_KEY = "ton:logs:recent"
const MAX_LOGS = 100

const SESSION_COOKIE =
  "ton_admin_session"

type LogType =
  | "affiliate_click"
  | "csp_violation"
  | "api_error"
  | "rate_limit"

type LogEntry = {
  id: string
  type: LogType
  message?: string
  path?: string
  timestamp: number
}

const LOG_TYPES: Record<
  LogType,
  {
    label: string
    icon: string
    className: string
  }
> = {
  affiliate_click: {
    label: "Afiliado",
    icon: "🟢",
    className:
      "border-emerald-900/40 bg-emerald-950/20 text-emerald-300",
  },

  csp_violation: {
    label: "Segurança",
    icon: "🟡",
    className:
      "border-yellow-900/40 bg-yellow-950/20 text-yellow-300",
  },

  api_error: {
    label: "Erro",
    icon: "🔴",
    className:
      "border-red-900/40 bg-red-950/20 text-red-300",
  },

  rate_limit: {
    label: "Rate limit",
    icon: "🟠",
    className:
      "border-orange-900/40 bg-orange-950/20 text-orange-300",
  },
}

function createSessionValue(
  user: string,
  password: string
) {
  return createHash("sha256")
    .update(`${user}:${password}`)
    .digest("hex")
}

async function isAuthenticated() {
  const configuredUser =
    process.env.LOG_ADMIN_USER

  const configuredPassword =
    process.env.LOG_ADMIN_PASSWORD

  if (
    !configuredUser ||
    !configuredPassword
  ) {
    return false
  }

  const cookieStore = await cookies()

  const session =
    cookieStore.get(
      SESSION_COOKIE
    )?.value

  if (!session) {
    return false
  }

  const expected =
    createSessionValue(
      configuredUser,
      configuredPassword
    )

  return session === expected
}

async function getLogs(): Promise<
  LogEntry[]
> {
  return redis.lrange<LogEntry>(
    LOG_KEY,
    0,
    MAX_LOGS - 1
  )
}

function formatDate(
  timestamp: number
) {
  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      timeZone:
        "America/Sao_Paulo",
      dateStyle: "short",
      timeStyle: "medium",
    }
  ).format(new Date(timestamp))
}

export default async function AdminLogsPage() {
  const authenticated =
    await isAuthenticated()

  if (!authenticated) {
    redirect("/admin/login")
  }

  const logs = await getLogs()

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-400">
              Maquininha com Cupom
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Logs do site
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Últimos eventos registrados pelo sistema.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm">
            <span className="text-slate-400">
              Eventos:
            </span>{" "}
            <strong>{logs.length}</strong>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          {logs.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-lg font-medium">
                Nenhum log encontrado.
              </p>

              <p className="mt-2 text-sm text-slate-400">
                O sistema ainda não registrou eventos.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {logs.map((log) => {
                const type =
                  LOG_TYPES[log.type]

                return (
                  <div
                    key={log.id}
                    className="px-5 py-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm">
                            {type?.icon ?? "⚪"}
                          </span>

                          <span
                            className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${
                              type?.className ??
                              "border-slate-700 bg-slate-800 text-slate-300"
                            }`}
                          >
                            {type?.label ??
                              log.type}
                          </span>

                          {log.path && (
                            <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-xs text-slate-300">
                              {log.path}
                            </span>
                          )}
                        </div>

                        {log.message && (
                          <p className="mt-2 break-words text-sm text-slate-300">
                            {log.message}
                          </p>
                        )}
                      </div>

                      <time
                        dateTime={new Date(
                          log.timestamp
                        ).toISOString()}
                        className="shrink-0 text-xs text-slate-500"
                      >
                        {formatDate(
                          log.timestamp
                        )}
                      </time>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}