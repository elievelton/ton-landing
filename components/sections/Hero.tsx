import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  ShieldCheck,
} from "lucide-react"

import { Container } from "@/components/shared/Container"
import { FadeIn } from "@/components/shared/FadeIn"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

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
                Venda mais pagando{" "}
                <span className="gradient-text">
                  menos taxas
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                Escolha a máquina Ton ideal para o seu negócio e aproveite
                condições especiais utilizando meu cupom exclusivo.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={siteConfig.links.catalog}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="h-12 w-full gap-2 px-6 text-base sm:w-auto"
                  >
                    Ver máquinas com desconto

                    <ArrowRight className="size-4" />
                  </Button>
                </a>

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
            <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-[560px]">
              <div className="absolute size-[360px] rounded-full bg-primary/10 blur-3xl sm:size-[460px]" />

              <div className="relative w-full max-w-lg rounded-[2rem] border border-border bg-white/70 p-8 shadow-premium backdrop-blur-xl">
                <div className="flex min-h-[380px] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-primary/30 bg-primary/5 p-8 text-center">
                  <CreditCard className="mb-6 size-16 text-primary" />

                  <p className="text-lg font-semibold text-foreground">
                    Máquinas Ton
                  </p>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
                    Aqui entraremos com a composição visual das máquinas quando
                    adicionarmos os assets oficiais.
                  </p>

                  <div className="mt-6 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
                    Cupom: {siteConfig.coupon}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}