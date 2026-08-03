import {
  ArrowRight,
  BadgePercent,
  Check,
  Handshake,
  MessageCircle,
  Sparkles,
} from "lucide-react"

import { Container } from "@/components/shared/Container"
import { FadeIn } from "@/components/shared/FadeIn"
import { TrackedLink } from "@/components/shared/TrackedLink"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { CouponCopy } from "@/components/shared/CouponCopy"

export function Consultant() {
  return (
    <section
      id="consultor"
      className="relative overflow-hidden bg-zinc-50 py-20 sm:py-24"
    >
      {/* Elementos decorativos */}
      <div
        className="pointer-events-none absolute -left-32 top-20 size-80 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-orange-500/5 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Conteúdo */}
          <FadeIn direction="right">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                <Handshake className="size-4" />
                Vantagem de comprar comigo
              </div>

              <h2 className="mt-6 max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Por que comprar com um{" "}
                <span className="text-primary">
                  consultor Ton?
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
                A Ton já oferece excelentes descontos em suas maquininhas, que
                podem chegar a cerca de{" "}
                <strong className="text-primary">
                  72%
                </strong>
                . Mas comprando pelos meus links você pode economizar ainda
                mais.
              </p>

              <p className="mt-4 max-w-xl text-base leading-7 text-muted sm:text-lg">
                Além da promoção da Ton, você ainda pode receber{" "}
                <strong className="text-orange-500">
                  20% de desconto adicional
                </strong>{" "}
                com meu cupom, nas condições aplicáveis.
              </p>

              {/* Frase de destaque */}
              <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <p className="text-base font-bold leading-7 text-foreground sm:text-lg">
                  Primeiro entra o desconto da Ton.{" "}
                  <span className="text-primary">
                    Depois, aplicamos mais 20% de desconto.
                  </span>
                </p>
              </div>

              {/* Benefícios */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-4" />
                  </span>

                  <div>
                    <p className="font-semibold text-foreground">
                      Você mantém a promoção da Ton
                    </p>

                    <p className="mt-1 text-sm leading-6 text-muted">
                      Comprar pelo consultor não significa abrir mão das
                      condições promocionais disponíveis.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600">
                    <BadgePercent className="size-4" />
                  </span>

                  <div>
  <p className="font-semibold text-foreground">
    Mais 20% de desconto
  </p>

  <p className="mt-1 text-sm leading-6 text-muted">
    Utilize meu cupom para obter o desconto adicional nas
    condições aplicáveis.
  </p>

  <div className="mt-3">
    <CouponCopy location="consultant" />
  </div>
</div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MessageCircle className="size-4" />
                  </span>

                  <div>
                    <p className="font-semibold text-foreground">
                      E ainda tem atendimento
                    </p>

                    <p className="mt-1 text-sm leading-6 text-muted">
                      Você pode contar comigo para ajudar a escolher a
                      maquininha e o plano mais adequados para o seu negócio.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
<div className="mt-8 flex flex-col gap-3 sm:flex-row">
  <TrackedLink
    href={siteConfig.links.catalog}
    target="_blank"
    rel="noopener noreferrer"
    tracking={{
      event: "cta_click",
      location: "consultant",
      destination: "catalog",
      label: "Quero aproveitar os descontos",
    }}
  >
    <Button
      size="lg"
      className="h-12 w-full gap-2 px-6 text-base shadow-lg shadow-primary/20 sm:w-auto"
    >
      Quero aproveitar os descontos

      <ArrowRight className="size-4" />
    </Button>
  </TrackedLink>

  <TrackedLink
    href={siteConfig.links.plansAndRates}
    target="_blank"
    rel="noopener noreferrer"
    tracking={{
      event: "rates_click",
      location: "consultant",
      destination: "plans_and_rates",
      label: "Ver planos e taxas",
    }}
  >
    <Button
      variant="outline"
      size="lg"
      className="h-12 w-full gap-2 px-6 text-base sm:w-auto"
    >
      Ver planos e taxas

      <ArrowRight className="size-4" />
    </Button>
  </TrackedLink>
</div>
<div className="mt-8 flex flex-col gap-3 sm:flex-row">
  <a
    href={siteConfig.links.catalog}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button
      size="lg"
      className="h-12 w-full gap-2 px-6 text-base shadow-lg shadow-primary/20 sm:w-auto"
    >
      Quero aproveitar os descontos

      <ArrowRight className="size-4" />
    </Button>
  </a>

  <a
    href={siteConfig.links.plansAndRates}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button
      variant="outline"
      size="lg"
      className="h-12 w-full gap-2 px-6 text-base sm:w-auto"
    >
      Ver planos e taxas

      <ArrowRight className="size-4" />
    </Button>
  </a>
</div>
            </div>
          </FadeIn>

          {/* Exemplo visual */}
<FadeIn direction="left" delay={0.15}>
  <div className="relative">
    <div className="rounded-[2rem] border border-primary/20 bg-white p-6 shadow-premium sm:p-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-sm font-semibold text-primary">
            Veja como funciona
          </span>

          <h3 className="mt-1 text-2xl font-bold text-foreground">
            Exemplo com a T3 Smart
          </h3>
        </div>

        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
          <Sparkles className="size-6" />
        </div>
      </div>

      {/* Preço original */}
      <div className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-zinc-50 px-5 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Preço original
          </p>

          <p className="mt-1 text-2xl font-extrabold tracking-tight text-foreground">
            R$ 671,43
          </p>
        </div>

        <ArrowRight className="size-5 text-muted" />
      </div>

      {/* Descontos */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/* Ton */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Desconto Ton
            </p>

            <BadgePercent className="size-5 text-primary" />
          </div>

          <p className="mt-2 text-3xl font-extrabold text-primary">
            -71%
          </p>

          <div className="mt-3 border-t border-primary/10 pt-3">
            <p className="text-xs text-muted">
              Valor após o desconto
            </p>

            <p className="mt-1 text-xl font-bold text-foreground">
              R$ 194,71
            </p>
          </div>
        </div>

        {/* Consultor */}
        <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Meu cupom
            </p>

            <BadgePercent className="size-5 text-orange-500" />
          </div>

          <p className="mt-2 text-3xl font-extrabold text-orange-500">
            -20%
          </p>

          <div className="mt-3 border-t border-orange-500/10 pt-3">
            <p className="text-xs text-muted">
              Sobre R$ 194,71
            </p>

            <p className="mt-1 text-xl font-bold text-orange-600">
              - R$ 38,94
            </p>
          </div>
        </div>
      </div>

      {/* Resultado */}
      {/* Resultado */}
<div className="mt-4 space-y-4">
  {/* Preço final */}
  <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-center text-white">
    <div
      className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-white/10 blur-2xl"
      aria-hidden="true"
    />

    <p className="relative text-sm font-medium text-white/80">
      Você pagaria no exemplo
    </p>

    <p className="relative mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
      R$ 155,77
    </p>

    <p className="relative mt-2 text-xs font-medium text-white/80">
      Promoção Ton + desconto adicional do consultor
    </p>
  </div>

  {/* Economia total */}
  <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5 text-center">
    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
      Economia total neste exemplo
    </p>

    <p className="mt-2 text-3xl font-extrabold text-orange-600">
      R$ 515,66
    </p>

    <p className="mt-2 text-xs leading-5 text-muted">
      De R$ 671,43 por apenas R$ 155,77 no exemplo apresentado.
    </p>
  </div>
</div>

      {/* Explicação */}
      <div className="mt-5 rounded-xl bg-zinc-50 px-4 py-3 text-center">
        <p className="text-sm font-semibold text-foreground">
          Primeiro a Ton dá o desconto.{" "}
          <span className="text-primary">
            Depois você economiza mais 20%.
          </span>
        </p>
      </div>

      {/* Aviso */}
      <p className="mt-3 text-center text-[10px] leading-4 text-muted">
        * Exemplo ilustrativo considerando desconto promocional de 71% e,
        em seguida, desconto adicional de 20%. Preços, percentuais e condições
        promocionais podem sofrer alterações.
      </p>
    </div>
  </div>
</FadeIn>
        </div>
      </Container>
    </section>
  )
}