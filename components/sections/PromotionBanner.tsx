"use client"

import { useEffect, useState } from "react"
import {
  ArrowRight,
  BadgePercent,
  Check,
  Clock3,
  Flame,
  ShieldCheck,
  Zap,
} from "lucide-react"

import { Container } from "@/components/shared/Container"
import { FadeIn } from "@/components/shared/FadeIn"
import { TrackedLink } from "@/components/shared/TrackedLink"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import {
  activePromotion,
  PROMOTION_END,
} from "@/config/promotions"

type Countdown = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getCountdown(): Countdown {
  const remaining = Math.max(
    0,
    PROMOTION_END - Date.now()
  )

  const totalSeconds = Math.floor(remaining / 1000)

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

function pad(value: number) {
  return value.toString().padStart(2, "0")
}

export function PromotionBanner() {
  const [countdown, setCountdown] = useState<Countdown | null>(null)

  useEffect(() => {
    setCountdown(getCountdown())

    const interval = window.setInterval(() => {
      setCountdown(getCountdown())
    }, 1000)

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  if (!activePromotion.enabled) {
    return null
  }

  const expired =
    countdown !== null &&
    countdown.days === 0 &&
    countdown.hours === 0 &&
    countdown.minutes === 0 &&
    countdown.seconds === 0

  if (expired) {
    return null
  }

  return (
    <section
      id="promocao"
      aria-label="Oferta especial Ton"
      className="relative overflow-hidden border-y border-primary/20 bg-[#063d2c] text-white"
    >
      {/* Glow esquerdo */}
      <div
        className="pointer-events-none absolute -left-40 top-1/2 size-96 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Glow direito */}
      <div
        className="pointer-events-none absolute -right-40 bottom-0 size-[28rem] rounded-full bg-emerald-400/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Linha de brilho */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent"
        aria-hidden="true"
      />

      <Container>
        <FadeIn>
          <div className="relative py-8 sm:py-10 lg:py-12">

            {/* ========================================================= */}
            {/* CABEÇALHO */}
            {/* ========================================================= */}

            <div className="mx-auto max-w-4xl text-center">

              {/* Benefício extra */}
              <div className="inline-flex animate-pulse items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-wider text-orange-300">
                <Flame className="size-3.5 fill-orange-400 text-orange-400" />

                Promoção do Mês
              </div>

              {/* Reforço dos descontos */}
              <div className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-white/70 sm:text-sm">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Check className="size-3" />
                </span>

                <span>
                  Além dos descontos promocionais e do meu cupom de 20% OFF
                </span>
              </div>

              {/* Título */}
              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                Como fazer sua{" "}
                <span className="text-primary">
                  maquininha sair de graça?
                </span>
              </h2>

              {/* Oferta principal */}
              <div className="mx-auto mt-5 max-w-3xl">

                <p className="text-lg font-extrabold leading-7 text-white sm:text-xl">
                  Venda {activePromotion.salesTarget} e receba de volta o valor
                  pago pela sua Ton.
                </p>

                <p className="mt-3 text-sm leading-6 text-white/65 sm:text-base">
                  Adquira sua primeira maquininha Ton até{" "}
                  <strong className="font-bold text-white">
                    30/08/2026
                  </strong>{" "}
                  e, após receber a máquina, tenha{" "}
                  <strong className="font-bold text-white">
                    30 dias para atingir R$ 10.000 em vendas
                  </strong>
                  .
                </p>

                {/* Como participar */}
                <p className="mt-4 text-sm font-bold leading-6 text-white sm:text-base">
                  O que preciso fazer para participar dessa oferta?
                </p>

                <p className="mt-1 text-sm leading-6 text-white/65 sm:text-base">
                  É simples: compre sua primeira maquininha usando nosso link
                  e cupom de desconto até dia 30/08/2026, ative sua máquina e venda 10.000 em 30 dias após a ativação. Veja os passos abaixo!
                </p>

              </div>
            </div>

            {/* ========================================================= */}
            {/* PASSOS */}
            {/* ========================================================= */}

            <div className="mx-auto mt-8 max-w-5xl">
              <div className="grid gap-3 sm:grid-cols-3">

                <Step
                  number="1"
                  title="Pegue seu desconto"
                  description="Clique em qualquer botão de desconto e acesse a oferta da Ton pelo nosso link e cupom."
                />

                <Step
                  number="2"
                  title="Compre e ative"
                  description="Finalize sua compra no site oficial da Ton e ative sua maquininha quando ela chegar."
                />

                <Step
                  number="3"
                  title="Venda R$ 10 mil"
                  description="Depois de receber a máquina, alcance R$ 10.000 em vendas dentro dos 30 dias."
                />

              </div>
            </div>

            {/* ========================================================= */}
            {/* RESULTADO + CONTADOR */}
            {/* ========================================================= */}

            <div className="mx-auto mt-8 grid max-w-4xl gap-5 lg:grid-cols-[1fr_auto] lg:items-center">

              {/* Resultado */}
              <div className="rounded-2xl border border-primary/20 bg-primary/10 p-5">

                <div className="flex items-start gap-3">

                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                    <BadgePercent className="size-5" />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-white">
                      Cumpriu a meta?
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-white/65">
                      Cumprindo as condições da promoção, você recebe na sua
                      Conta Ton o valor efetivamente pago pela maquininha.
                    </p>
                  </div>

                </div>
              </div>

              {/* ======================================================= */}
              {/* CONTADOR */}
              {/* ======================================================= */}

              <div className="rounded-2xl border border-orange-400/30 bg-white p-4 shadow-2xl shadow-black/10 sm:p-5 lg:min-w-[360px]">

                <div className="flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-wider text-orange-600">

                  <Clock3 className="size-4 text-red-500" />

                  Oferta relâmpago termina em

                </div>

                {countdown && (
                  <div className="mt-4 grid grid-cols-4 gap-2">

                    <CountdownBox
                      value={countdown.days}
                      label="dias"
                    />

                    <CountdownBox
                      value={countdown.hours}
                      label="horas"
                    />

                    <CountdownBox
                      value={countdown.minutes}
                      label="min"
                    />

                    <CountdownBox
                      value={countdown.seconds}
                      label="seg"
                      pulse
                    />

                  </div>
                )}

                {!countdown && (
                  <div className="mt-4 h-[72px] animate-pulse rounded-xl bg-orange-50" />
                )}

                {/* CTA */}
                <TrackedLink
                  href={siteConfig.links.catalog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block"
                  tracking={{
                    event: "promotion_click",
                    location: "promotion_banner",
                    destination: "catalog",
                    label: "Pegar meu desconto",
                    conversionStrength: "medium",
                  }}
                >
                  <Button
                    size="lg"
                    className="group relative h-12 w-full gap-2 overflow-hidden bg-primary px-6 text-sm font-extrabold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
                  >

                    {/* Brilho animado */}
                    <span
                      className="pointer-events-none absolute inset-y-0 -left-20 w-12 rotate-12 bg-white/20 blur-md transition-all duration-700 group-hover:left-[110%]"
                      aria-hidden="true"
                    />

                    <Zap className="relative size-4 fill-current" />

                    <span className="relative">
                      Pegar meu desconto
                    </span>

                    <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" />

                  </Button>
                </TrackedLink>

              </div>
            </div>

            {/* ========================================================= */}
            {/* AVISO / REGULAMENTO */}
            {/* ========================================================= */}

            <div className="mx-auto mt-6 flex max-w-3xl items-start justify-center gap-2 text-center text-[10px] leading-5 text-white/40 sm:text-[11px]">

              <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-primary/70" />

              <p>
                {activePromotion.disclaimer}
              </p>

            </div>

          </div>
        </FadeIn>
      </Container>
    </section>
  )
}


/* ============================================================= */
/* PASSO */
/* ============================================================= */

function Step({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white/[0.08] sm:p-5">

      <div className="flex items-start gap-3">

        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary font-black text-white shadow-lg shadow-primary/20">
          {number}
        </div>

        <div>

          <h3 className="text-sm font-extrabold text-white sm:text-base">
            {title}
          </h3>

          <p className="mt-1.5 text-xs leading-5 text-white/55">
            {description}
          </p>

        </div>

      </div>

    </div>
  )
}


/* ============================================================= */
/* CONTADOR */
/* ============================================================= */

function CountdownBox({
  value,
  label,
  pulse = false,
}: {
  value: number
  label: string
  pulse?: boolean
}) {
  return (
    <div
      className={[
        "rounded-xl border border-orange-200 bg-orange-50 px-2 py-2.5 text-center",
        "shadow-sm transition-all duration-300",
        pulse
          ? "animate-[pulse_1s_ease-in-out_infinite] border-red-200 bg-red-50"
          : "",
      ].join(" ")}
    >

      <div
        className={[
          "text-xl font-black tabular-nums sm:text-2xl",
          pulse
            ? "text-red-600"
            : "text-orange-600",
        ].join(" ")}
      >
        {pad(value)}
      </div>

      <div
        className={[
          "mt-0.5 text-[9px] font-black uppercase tracking-wider",
          pulse
            ? "text-red-400"
            : "text-orange-500",
        ].join(" ")}
      >
        {label}
      </div>

    </div>
  )
}