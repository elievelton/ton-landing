"use client"

import type { MouseEvent, ReactNode } from "react"
import {
  BarChart3,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Gift,
  Search,
  ShoppingCart,
  Users,
  XCircle,
} from "lucide-react"

import { siteConfig } from "@/config/site"

type IntentId =
  | "buy_machine"
  | "compare_fees"
  | "choose_plan"
  | "choose_machine"
  | "resell"
  | "promotion"
  | "research"
  | "not_interested"

type InterestStrength = "strong" | "medium" | "weak" | "none"

type IntentOption = {
  id: IntentId
  title: string
  description: string
  strength: InterestStrength
  href: string
  external?: boolean
  icon: ReactNode
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    gtag?: (
      command: string,
      eventName: string,
      eventData?: Record<string, unknown>,
    ) => void
  }
}

const RESELL_URL =
  "https://www.ton.com.br/renda-ton/?utm_partner_id=0212b610-6211-4d59-9477-58d0662803b5&utm_source=indique_um_parceiro_nov22&utm_term=0212b610-6211-4d59-9477-58d0662803b5"

const intents: IntentOption[] = [
  {
    id: "buy_machine",
    title: "Já decidi que quero comprar a máquina Ton",
    description: "Quero só meu cupom de 20% para comprar mais barato.",
    strength: "strong",
    href: siteConfig.links.catalog,
    external: true,
    icon: <ShoppingCart className="size-5" />,
  },
  {
    id: "compare_fees",
    title: "Estou pesquisando taxas de maquininhas",
    description: "Quero saber quanto realmente recebo em cada venda.",
    strength: "medium",
    href: "#calculadora",
    icon: <BarChart3 className="size-5" />,
  },
  {
    id: "choose_plan",
    title: "Quero escolher um plano da Ton",
    description: "Mega+ ou Black?",
    strength: "medium",
    href: "#faq-planos",
    icon: <CircleHelp className="size-5" />,
  },
  {
    id: "choose_machine",
    title: "Quero escolher um modelo de maquininha da Ton",
    description: "T1, T2, T3 ou T3 Smart?",
    strength: "medium",
    href: "#maquinas",
    icon: <CreditCard className="size-5" />,
  },
  {
    id: "resell",
    title: "Quero revender máquinas da Ton",
    description: "Quero saber como funciona para revender.",
    strength: "weak",
    href: RESELL_URL,
    external: true,
    icon: <Users className="size-5" />,
  },
  {
    id: "promotion",
    title: "Promoção do mês",
    description: "Quero entender a promoção do mês.",
    strength: "weak",
    href: "#promocao",
    icon: <Gift className="size-5" />,
  },
  {
    id: "research",
    title: "Estou apenas pesquisando",
    description: "Quero conhecer melhor antes de decidir.",
    strength: "weak",
    href: "#hero",
    icon: <Search className="size-5" />,
  },
  {
    id: "not_interested",
    title: "Não quero nada relacionado a máquinas de cartão",
    description: "Entrei por engano ou procuro outra coisa.",
    strength: "none",
    href: "#hero",
    icon: <XCircle className="size-5" />,
  },
]

function rememberIntent(intent: IntentOption) {
  sessionStorage.setItem(
    "intent_context",
    JSON.stringify({
      intent: intent.id,
      interest_strength: intent.strength,
      label: intent.title,
      saved_at: new Date().toISOString(),
    }),
  )
}

function registerFinalIntent(intent: IntentOption) {
  if (intent.strength !== "strong") {
    return
  }

  const eventData = {
    intent: intent.id,
    interest_strength: intent.strength,
    event_location: "mobile_intent_router",
    event_destination: intent.href,
    event_label: intent.title,
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: "intent_final",
    ...eventData,
  })

  window.gtag?.("event", "intent_final", eventData)
}

function registerStrongIntentInCounter(intent: IntentOption) {
  if (
    intent.id !== "buy_machine" &&
    intent.id !== "resell"
  ) {
    return
  }

  window.dispatchEvent(
    new CustomEvent("social-proof", {
      detail: {
        message:
          intent.id === "buy_machine"
            ? "Um visitante decidiu aproveitar o desconto da Ton 💚"
            : "Um visitante decidiu conhecer a oportunidade de revender Ton 🤝",
      },
    }),
  )
}

export function IntentRouter() {
  function handleClick(
    event: MouseEvent<HTMLAnchorElement>,
    intent: IntentOption,
  ) {
    rememberIntent(intent)

    if (intent.external) {
      registerFinalIntent(intent)
      registerStrongIntentInCounter(intent)
      return
    }

    const target = document.getElementById(
      intent.href.replace("#", ""),
    )

    if (!target) {
      return
    }

    event.preventDefault()

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })

    window.history.replaceState(
      null,
      "",
      intent.href,
    )
  }

  return (
    <section
      aria-labelledby="intent-router-title"
      className="lg:hidden"
    >
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-140%);
            opacity: 0;
          }
          18% {
            opacity: 0.9;
          }
          45% {
            transform: translateX(420%);
            opacity: 0.35;
          }
          100% {
            transform: translateX(420%);
            opacity: 0;
          }
        }
      `}</style>
      <div className="mx-auto mt-6 w-full max-w-xl px-4">
        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
          {/* Cabeçalho */}
          <div className="border-b border-slate-200 bg-white px-5 py-6">
            <div className="flex items-start gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
                <CircleHelp className="size-5" />
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                  Encontre seu caminho
                </p>

                <h2
                  id="intent-router-title"
                  className="mt-1 text-xl font-black tracking-tight text-slate-900"
                >
                  O que você está procurando?
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
                  Me diga o que trouxe você até aqui e eu te mostro o caminho
                  mais rápido.
                </p>
              </div>
            </div>
          </div>

          {/* Opções */}
          <div className="space-y-2 p-3.5">
            {intents.map((intent) => {
              const isStrong = intent.id === "buy_machine"

              const iconStyles: Record<IntentId, string> = {
                buy_machine:
                  "border-orange-200 bg-orange-50 text-orange-600 group-hover:bg-orange-100",
                compare_fees:
                  "border-blue-200 bg-blue-50 text-blue-600 group-hover:bg-blue-100",
                choose_plan:
                  "border-violet-200 bg-violet-50 text-violet-600 group-hover:bg-violet-100",
                choose_machine:
                  "border-teal-200 bg-teal-50 text-teal-600 group-hover:bg-teal-100",
                resell:
                  "border-indigo-200 bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100",
                promotion:
                  "border-amber-200 bg-amber-50 text-amber-600 group-hover:bg-amber-100",
                research:
                  "border-slate-200 bg-slate-100 text-slate-600 group-hover:bg-slate-200",
                not_interested:
                  "border-red-200 bg-red-50 text-red-500 group-hover:bg-red-100",
              }

              return (
                <a
                  key={intent.id}
                  href={intent.href}
                  target={intent.external ? "_blank" : undefined}
                  rel={
                    intent.external
                      ? "noopener noreferrer"
                      : undefined
                  }
                  onClick={(event) =>
                    handleClick(event, intent)
                  }
                  className={[
                    "group relative flex items-center gap-3 overflow-hidden rounded-2xl border bg-white px-3.5 py-3.5",
                    "transition-all duration-300",
                    "hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
                    isStrong
                      ? "border-orange-300 bg-orange-50/80 shadow-lg shadow-orange-500/10 ring-1 ring-orange-200/70 animate-[pulse_2.8s_ease-in-out_infinite] hover:border-orange-400 hover:shadow-orange-500/20"
                      : "border-slate-200 hover:border-slate-300",
                  ].join(" ")}
                >
                  {isStrong && (
                    <>
                      <span
                        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/75 to-transparent animate-[shine_2.8s_ease-in-out_infinite]"
                        aria-hidden="true"
                      />

                      <span
                        className="pointer-events-none absolute -right-10 -top-10 size-24 rounded-full bg-orange-300/25 blur-2xl animate-pulse"
                        aria-hidden="true"
                      />

                      <span
                        className="pointer-events-none absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-orange-300/80 to-transparent opacity-70 animate-pulse"
                        aria-hidden="true"
                      />
                    </>
                  )}

                  <div
                    className={[
                      "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300",
                      iconStyles[intent.id],
                      isStrong
                        ? "animate-[bounce_2.6s_ease-in-out_infinite] group-hover:scale-110"
                        : "group-hover:scale-105",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {intent.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                      <p className="relative z-10 text-sm font-extrabold leading-5 text-slate-900">
                        {intent.title}
                      </p>

                      {isStrong && (
                        <span className="relative z-10 mt-0.5 shrink-0 rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white shadow-sm shadow-orange-500/20">
                          20% OFF
                        </span>
                      )}
                    </div>

                    <p className="relative z-10 mt-1 text-xs leading-5 text-slate-500">
                      {intent.description}
                    </p>
                  </div>

                  <ChevronRight className="relative z-10 size-5 shrink-0 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-slate-700" />
                </a>
              )
            })}
          </div>

          {/* Rodapé */}
          <div className="border-t border-slate-200 bg-white px-5 py-3.5">
            <p className="text-center text-[11px] leading-5 text-slate-500">
              Você escolhe o caminho. A ideia é facilitar sua decisão sem
              obrigar você a navegar por tudo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
