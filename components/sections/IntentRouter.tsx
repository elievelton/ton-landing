"use client"

import { useEffect, useState } from "react"
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
import {
  isPromotionActive,
} from "@/config/promotions"

type IntentId =
  | "buy_machine"
  | "compare_fees"
  | "choose_plan"
  | "choose_machine"
  | "resell"
  | "promotion"
  | "research"
  | "not_interested"

type InterestStrength =
  | "strong"
  | "medium"
  | "weak"
  | "none"

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

const intents: IntentOption[] = [
  {
    id: "buy_machine",
    title: "Já decidi que quero comprar a máquina Ton",
    description:
      "Quero só meu cupom de 20% para comprar mais barato.",
    strength: "strong",
    href: siteConfig.links.catalog,
    external: true,
    icon: <ShoppingCart className="size-5" />,
  },
  {
    id: "compare_fees",
    title: "Estou pesquisando as taxas das maquininhas Ton",
    description:
      "Quero simular quanto realmente recebo na minha conta em cada venda na Ton.",
    strength: "medium",
    href: "#calculadora",
    icon: <BarChart3 className="size-5" />,
  },
  {
    id: "choose_plan",
    title: "Quero entender melhor os planos da Ton",
    description: "Mega+ ou Black, qual o melhor?",
    strength: "medium",
    href: "#faq-planos",
    icon: <CircleHelp className="size-5" />,
  },
  {
    id: "choose_machine",
    title: "Quero escolher um modelo de maquininha da Ton",
    description:
      "Quero entender as diferenças dos modelos T1, T2, T3 ou T3 Smart?",
    strength: "medium",
    href: "#maquinas",
    icon: <CreditCard className="size-5" />,
  },
  {
    id: "resell",
    title: "Quero revender máquinas da Ton",
    description:
      "Quero saber como funciona para revender as maquininhas da Ton.",
    strength: "weak",
    href: siteConfig.links.resell,
    external: true,
    icon: <Users className="size-5" />,
  },
  {
    id: "promotion",
    title: "Promoção do mês",
    description:
      "Quero entender melhor a promoção do mês [maquininha de graça].",
    strength: "weak",
    href: "#promocao",
    icon: <Gift className="size-5" />,
  },
  {
    id: "research",
    title: "Estou apenas pesquisando",
    description:
      "Quero conhecer melhor a Ton para decidir se vou comprar.",
    strength: "weak",
    href: "#hero",
    icon: <Search className="size-5" />,
  },
  {
    id: "not_interested",
    title: "Não quero nada relacionado a máquinas de cartão",
    description:
      "Entrei por engano ou procuro outra coisa.",
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

  window.gtag?.(
    "event",
    "intent_final",
    eventData,
  )
}

function registerStrongIntentInCounter(
  intent: IntentOption,
) {
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
  const [promotionVisible, setPromotionVisible] =
    useState(false)

  useEffect(() => {
    function updatePromotionVisibility() {
      setPromotionVisible(isPromotionActive())
    }

    updatePromotionVisibility()

    const interval = window.setInterval(
      updatePromotionVisibility,
      1000,
    )

    return () => {
      window.clearInterval(interval)
    }
  }, [])

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
        @keyframes borderGlow {
          0%,
          100% {
            opacity: 0.45;
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }

          50% {
            opacity: 1;
            box-shadow:
              0 0 0 4px rgba(34, 197, 94, 0.12),
              0 0 22px rgba(34, 197, 94, 0.24);
          }
        }

        @keyframes borderGlowOuter {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.985);
          }

          50% {
            opacity: 0.75;
            transform: scale(1.015);
          }
        }

        @keyframes cartPulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }

          50% {
            transform: scale(1.09);
            box-shadow:
              0 0 0 7px rgba(34, 197, 94, 0.13),
              0 0 20px rgba(34, 197, 94, 0.24);
          }
        }

        @keyframes badgePulse {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.04);
          }
        }

        @keyframes borderSweep {
          0%,
          100% {
            opacity: 0;
            transform: translateX(-18%);
          }

          45% {
            opacity: 0.45;
          }

          75% {
            opacity: 0;
            transform: translateX(18%);
          }
        }
      `}</style>

      <div className="mx-auto mt-6 w-full max-w-xl px-4">
        <div className="overflow-hidden rounded-[1.75rem] border border-emerald-950/20 bg-[#052E2B] shadow-[0_20px_60px_rgba(5,46,43,0.22)]">
          {/* Cabeçalho */}
          <div className="border-b border-white/10 bg-gradient-to-br from-[#064E3B] via-[#052E2B] to-[#022C22] px-5 py-6">
            <div className="flex items-start gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white shadow-md ring-1 ring-white/15">
                <CircleHelp className="size-5" />
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-orange-400">
                  Navegação Rápida
                </p>

                <h2
                  id="intent-router-title"
                  className="mt-1 text-xl font-black tracking-tight text-white"
                >
                  O que você está procurando?
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">
                  Seu tempo é precioso. Criamos este menu para levar você direto ao que procura. Escolha uma opção abaixo e vá direto ao ponto.
                </p>
              </div>
            </div>
          </div>

          {/* Opções */}
          <div className="space-y-2.5 bg-[#0B3B35] p-3.5">
            {intents
              .filter(
                (intent) =>
                  intent.id !== "promotion" ||
                  promotionVisible,
              )
              .map((intent) => {
                const isStrong =
                  intent.id === "buy_machine"

                const iconStyles: Record<
                  IntentId,
                  string
                > = {
                  buy_machine:
                    "border-primary-200 bg-primary-50 text-primary-600 group-hover:bg-primary-100",
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
                    target={
                      intent.external
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      intent.external
                        ? "noopener noreferrer"
                        : undefined
                    }
                    onClick={(event) =>
                      handleClick(event, intent)
                    }
                    className={[
                      "group relative flex items-center gap-3 overflow-visible rounded-2xl border bg-white px-3.5 py-3.5",
                      "transition-all duration-300",
                      "hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
                      isStrong
                        ? "border-green-400 bg-white shadow-md shadow-green-500/10 hover:border-green-400 hover:shadow-green-500/15"
                        : "border-white/10 bg-white/[0.97] hover:border-white/25 hover:bg-white",
                    ].join(" ")}
                  >
                    {isStrong && (
                      <>
                        <span
                          className="pointer-events-none absolute inset-y-3 left-0 w-1 rounded-r-full bg-primary shadow-[0_0_12px_rgba(34,197,94,0.45)]"
                          aria-hidden="true"
                        />

                        <span
                          className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-primary opacity-80 animate-[borderGlow_2.4s_ease-in-out_infinite]"
                          aria-hidden="true"
                        />

                        <span
                          className="pointer-events-none absolute inset-[-3px] rounded-[19px] border border-orange-300/60 opacity-0 animate-[borderGlowOuter_2.4s_ease-in-out_infinite]"
                          aria-hidden="true"
                        />

                        <span
                          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-orange-200/25 to-transparent opacity-0 animate-[borderSweep_3.2s_ease-in-out_infinite]"
                          aria-hidden="true"
                        />
                      </>
                    )}

                    <div
                      className={[
                        "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300",
                        iconStyles[intent.id],
                        isStrong
                          ? "text-primary group-hover:scale-105"
                          : "group-hover:scale-105",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      <span
                        className={
                          isStrong
                            ? "animate-[cartPulse_2s_ease-in-out_infinite] rounded-lg"
                            : ""
                        }
                      >
                        {intent.icon}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-2">
                        <p className="relative z-10 text-sm font-extrabold leading-5 text-slate-900">
                          {intent.title}
                        </p>

                        {isStrong && (
                          <span
                            className="absolute -left-1.5 -top-3 z-30 animate-[badgePulse_2.4s_ease-in-out_infinite] rounded-full border-2 border-white bg-primary px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-white shadow-md shadow-primary/30"
                          >
                            🔥 Menu mais acessado
                          </span>
                        )}

                        {isStrong && (
                          <div className="relative z-10 mt-0.5 flex shrink-0 items-center">
                            <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white shadow-sm shadow-orange-500/20">
                              20% OFF
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="relative z-10 mt-1 text-xs leading-5 text-slate-500">
                        {intent.description}
                      </p>
                    </div>

                    <ChevronRight
                      className={[
                        "relative z-10 size-5 shrink-0 transition-all duration-300 group-hover:translate-x-1",
                        isStrong
                          ? "text-primary"
                          : "text-slate-400 group-hover:text-slate-700",
                      ].join(" ")}
                    />
                  </a>
                )
              })}
          </div>

          {/* Rodapé */}
          <div className="border-t border-white/10 bg-gradient-to-r from-[#022C22] via-[#052E2B] to-[#064E3B] px-5 py-3.5">
            <p className="text-center text-[11px] leading-5 text-white/75">
              Você escolhe o caminho. A ideia é facilitar sua decisão sem
              obrigar você a navegar por tudo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}