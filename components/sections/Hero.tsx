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
import { OfferCountdown } from "@/components/shared/OfferCountdown"
import { TrackedLink } from "@/components/shared/TrackedLink"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Elementos decorativos de fundo */}
      <div
        className="pointer-events-none absolute -left-32 top-20 size-80 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-32 top-10 size-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <div className="grid min-h-[calc(100vh-4rem)] items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
          {/* Coluna 1: Conteúdo Principal */}
          <FadeIn direction="right">
            <div className="relative z-10">
              {/* Badge principal */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
                <BadgeCheck className="size-4 shrink-0" />

                <span>🔥 +20% OFF com meu cupom exclusivo</span>
              </div>

              {/* Título */}
              <h1 className="max-w-3xl break-words text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-6xl hyphens-auto">
                Maquininha Ton com{" "}
                <span className="gradient-text inline-block">
                  +20% de desconto
                </span>{" "}
                sobre o preço promocional
              </h1>

              {/* Destaque comercial */}
              <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed sm:text-lg lg:text-xl">
                <strong className="font-bold text-orange-500">
                  Não pague mais caro pela sua Ton:
                </strong>{" "}
                <span className="text-foreground">
                  primeiro, a Ton aplica o desconto promocional disponível.
                </span>{" "}
                <span className="font-semibold text-primary">
                  Depois, você economiza mais 20% sobre esse valor usando
                  meu cupom exclusivo.
                </span>
              </p>

              {/* Explicação de apoio */}
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Compare os modelos,{" "}
                <strong className="font-semibold text-foreground">
                  simule suas taxas
                </strong>{" "}
                e descubra quanto realmente entra na sua conta antes de
                escolher sua maquininha.
              </p>

              {/* Botões de Ação (CTAs) */}
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
                {/* CTA principal */}
                <TrackedLink
                  href={siteConfig.links.catalog}
                  target="_blank"
                  rel="noopener noreferrer"
                  tracking={{
                    event: "cta_click",
                    location: "hero",
                    destination: "catalog",
                    label: "Ativar 20% de desconto e ver modelos",
                    conversionStrength: "medium",
                  }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="h-13 w-full gap-2 px-6 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 sm:w-auto"
                  >
                    Ativar +20% OFF e ver modelos

                    <ArrowRight className="size-5" />
                  </Button>
                </TrackedLink>

                {/* CTA calculadora */}
                <TrackedLink
                  href="#calculadora"
                  tracking={{
                    event: "calculator_click",
                    location: "hero",
                    destination: "tax_calculator",
                    label: "Simular quanto vou receber",
                    conversionStrength: "weak",
                  }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="
                      h-12
                      w-full
                      gap-2
                      border-primary/20
                      bg-white
                      px-6
                      text-base
                      font-bold
                      text-foreground
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-primary/40
                      hover:bg-primary/5
                      hover:text-primary
                      sm:w-auto
                    "
                  >
                    Simular Taxas da Ton

                    <CreditCard className="size-4" />
                  </Button>
                </TrackedLink>
              </div>

              {/* Aviso de segurança e garantia */}
              <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />

                <span>
                  Ambiente seguro. Você será redirecionado para o site oficial
                  da{" "}
                  <strong className="font-semibold text-foreground">
                    Ton (Grupo Stone)
                  </strong>{" "}
                  para finalizar a compra com garantia de fábrica e frete
                  grátis.
                </span>
              </div>

              {/* Benefícios rápidos */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-muted-foreground sm:text-sm">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary" />

                  Compra 100% Segura
                </div>

                <div className="flex items-center gap-2">
                  <CreditCard className="size-4 text-primary" />

                  Diversos Modelos
                </div>

                <div className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-primary" />

                  +20% OFF Automático
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Coluna 2: Card de Oferta em Destaque (T3 Smart) */}
          <FadeIn direction="left" delay={0.15}>
            <div className="relative flex items-center justify-center">
              {/* Glow externo */}
              <div
                className="pointer-events-none absolute size-[280px] rounded-full bg-primary/15 blur-3xl sm:size-[360px]"
                aria-hidden="true"
              />

              {/* Card T3 Smart */}
              <div className="group relative w-full max-w-sm overflow-hidden rounded-[2.2rem] border border-orange-500/40 bg-white/90 p-5 shadow-[0_20px_60px_rgba(34,197,94,0.12)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(34,197,94,0.20)] sm:p-6">
                {/* Glows internos */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-primary/15 blur-3xl transition-all duration-700 group-hover:bg-primary/25"
                  aria-hidden="true"
                />

                {/* Badges de destaque */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-md shadow-orange-500/20">
                    🔥 IMPRIME COMPROVANTE!
                  </div>

                  <div className="relative">
                    <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />

                    <span className="relative inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] font-extrabold text-primary">
                      Até 77% OFF
                    </span>
                  </div>
                </div>

                {/* Imagem da Máquina */}
                <div className="relative mt-2 flex min-h-[170px] items-center justify-center">
                  <div
                    className="pointer-events-none absolute size-40 rounded-full bg-primary/10 blur-2xl transition-transform duration-700 group-hover:scale-125"
                    aria-hidden="true"
                  />

                  <Image
                    src="/images/machines/t3-smart.webp"
                    alt="Maquininha Ton T3 Smart"
                    width={320}
                    height={320}
                    priority
                    className="relative z-10 h-[160px] w-auto object-contain drop-shadow-2xl transition-all duration-700 group-hover:-translate-y-1 group-hover:scale-105 sm:h-[180px]"
                  />
                </div>

                {/* Informações da Oferta */}
                <div className="relative z-10 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                    T3 Smart
                  </p>

                  <h2 className="mt-1 text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
                    T3 Smart com +20% OFF usando meu cupom
                  </h2>

                  {/* Ancoragem Visual de Preço */}
                  <div className="my-2.5 rounded-xl border border-primary/15 bg-primary/5 px-3 py-2">
                    <span className="block text-xs text-muted-foreground line-through">
                      De R$ 671,43
                    </span>

                    <span className="text-sm font-extrabold text-foreground">
                      Por apenas{" "}
                      <span className="text-base text-primary">
                        R$ 153,50
                      </span>
                    </span>
                  </div>

                  <p className="mx-auto text-xs leading-relaxed text-muted-foreground">
                    Desconto promocional da Ton +{" "}
                    <strong className="font-bold text-primary">
                      20% extra
                    </strong>{" "}
                    aplicado no valor promocional final.
                  </p>

                  {/* Contador de Oferta */}
                  <div className="mt-3">
                    <OfferCountdown />
                  </div>

                  {/* Campo do Cupom */}
                  <div className="mt-3 flex flex-col items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Clique para copiar o cupom
                    </span>

                    <CouponCopy location="hero" />
                  </div>

                  {/* CTA da T3 Smart */}
                  <TrackedLink
                    href={siteConfig.links.machines.t3Smart}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block"
                    tracking={{
                      event: "machine_click",
                      location: "hero",
                      destination: "checkout",
                      label: "Adicionar T3 Smart ao carrinho com 20% OFF",
                      product: "t3_smart",
                      conversionStrength: "strong",
                    }}
                  >
                    <Button
                      size="lg"
                      className="h-12 w-full gap-2 text-sm font-bold shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                    >
                      Adicionar ao carrinho com +20% OFF

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