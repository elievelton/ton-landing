import Image from "next/image"

import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  ShieldCheck,
} from "lucide-react"

import { Container } from "@/components/shared/Container"
import { CouponCopy } from "@/components/shared/CouponCopy"
import { FadeIn } from "@/components/shared/FadeIn"
import { TrackedLink } from "@/components/shared/TrackedLink"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { OfferCountdown } from "@/components/shared/OfferCountdown"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Elementos decorativos */}
      <div
        className="pointer-events-none absolute -left-32 top-20 size-80 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-32 top-10 size-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <div className="grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          {/* Conteúdo */}
          <FadeIn direction="right">
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                <BadgeCheck className="size-4" />

                {siteConfig.partner}
              </div>

              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
                Maquininha Ton para{" "}
                <span className="gradient-text">
                  vender mais pagando menos taxas
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-lg font-semibold leading-7 sm:text-xl">
                <span className="text-orange-500">
                  Fuja hoje mesmo dos calotes,
                </span>{" "}
                <span className="text-primary">
                  venda parcelado, mas receba à vista.
                </span>
              </p>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                Escolha a máquina Ton ideal para o seu negócio e aproveite
                condições especiais utilizando meu cupom exclusivo.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  href={siteConfig.links.catalog}
                  target="_blank"
                  rel="noopener noreferrer"
                  tracking={{
                    event: "cta_click",
                    location: "hero",
                    destination: "catalog",
                    label: "Ver máquinas com desconto",
                  }}
                >
                  <Button
                    size="lg"
                    className="h-12 w-full gap-2 px-6 text-base sm:w-auto"
                  >
                    Ver máquinas com desconto

                    <ArrowRight className="size-4" />
                  </Button>
                </TrackedLink>

                <a href="#maquinas">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 w-full px-6 text-base sm:w-auto"
                  >
                    Comparar modelos
                  </Button>
                </a>
              </div>

              {/* Benefícios rápidos */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary" />
                  Compra segura
                </div>

                <div className="flex items-center gap-2">
                  <CreditCard className="size-4 text-primary" />
                  Diversos modelos
                </div>

                <div className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-primary" />
                  Cupom exclusivo
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Área visual */}
          <FadeIn direction="left" delay={0.15}>
            <div className="relative flex min-h-[380px] items-center justify-center lg:min-h-[480px]">
              {/* Glow externo */}
              <div
                className="pointer-events-none absolute size-[300px] rounded-full bg-primary/15 blur-3xl sm:size-[360px]"
                aria-hidden="true"
              />

              {/* Card T3 Smart */}
              <div className="group relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-orange-500/50 bg-white/80 p-5 shadow-[0_25px_70px_rgba(34,197,94,0.15)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(34,197,94,0.22)] sm:p-6">
                {/* Glows internos */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-primary/15 blur-3xl transition-all duration-700 group-hover:bg-primary/25"
                  aria-hidden="true"
                />

                <div
                  className="pointer-events-none absolute -bottom-20 -left-20 size-44 rounded-full bg-orange-500/10 blur-3xl"
                  aria-hidden="true"
                />

                {/* Badges */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg shadow-orange-500/20">
                    🔥 Mais vendida
                  </div>

                  <div className="relative">
                    <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />

                    <span className="relative inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] font-extrabold text-primary">
                      Até 77% OFF
                    </span>
                  </div>
                </div>

                {/* Máquina */}
                <div className="relative mt-3 flex min-h-[180px] items-center justify-center">
                  <div
                    className="pointer-events-none absolute size-44 rounded-full bg-primary/15 blur-3xl transition-transform duration-700 group-hover:scale-125"
                    aria-hidden="true"
                  />

                  <Image
                    src="/images/machines/t3-smart.webp"
                    alt="Maquininha Ton T3 Smart"
                    width={320}
                    height={320}
                    priority
                    className="relative z-10 h-[165px] w-auto object-contain drop-shadow-2xl transition-all duration-700 group-hover:-translate-y-1 group-hover:scale-105 sm:h-[190px]"
                  />
                </div>

                {/* Oferta */}
                <div className="relative z-10 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    T3 Smart
                  </p>

                  <h2 className="mt-1.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    A máquina completa para o seu negócio com 20% de Desconto
                  </h2>

                  <p className="mx-auto mt-2 max-w-xs text-sm leading-5 text-muted">
  Até <strong className="text-foreground">71% OFF na Ton</strong>
  {" "}+{" "}
  <strong className="text-primary">
    20% de desconto extra
  </strong>{" "}
  com meu cupom exclusivo.
</p>
                  <OfferCountdown />

                  {/* Cupom */}
                  <div className="mt-4 flex flex-col items-center gap-2">
                    <span className="text-[11px] font-medium uppercase tracking-wide text-muted">
                      Clique para copiar o cupom
                    </span>

                    <CouponCopy location="hero" />
                  </div>

                  {/* CTA específico da T3 Smart */}
                  <TrackedLink
                    href={siteConfig.links.machines.t3Smart}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block"
                    tracking={{
                      event: "machine_click",
                      location: "hero",
                      destination: "checkout",
                      label: "Ver oferta da T3 Smart",
                      product: "t3_smart",
                    }}
                  >
                    <Button
                      size="lg"
                      className="h-11 w-full gap-2 text-sm shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                    >
                      Quero meu desconto de 20%

                      <ArrowRight className="size-4" />
                    </Button>
                  </TrackedLink>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}