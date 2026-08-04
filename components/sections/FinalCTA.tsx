import {
  ArrowRight,
  BadgePercent,
  Check,
  ShieldCheck,
  Truck,
} from "lucide-react"

import { Container } from "@/components/shared/Container"
import { CouponCopy } from "@/components/shared/CouponCopy"
import { FadeIn } from "@/components/shared/FadeIn"
import { TrackedLink } from "@/components/shared/TrackedLink"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#063d2c] px-6 py-12 text-white shadow-2xl sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            {/* Elementos decorativos */}
            <div
              className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-primary/20 blur-3xl"
              aria-hidden="true"
            />

            <div
              className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-orange-500/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-semibold text-orange-300">
                <BadgePercent className="size-4" />
                Economize ainda mais com meu cupom
              </div>

              {/* Título */}
              <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                <span className="text-orange-400">
                  Fuja dos calotes.
                </span>{" "}
                Venda parcelado e{" "}
                <span className="text-primary">
                  receba à vista.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
                Aproveite as condições promocionais da Ton e, nas ofertas
                aplicáveis, tenha ainda{" "}
                <strong className="font-bold text-white">
                  20% de desconto adicional
                </strong>{" "}
                utilizando meu cupom.
              </p>

              {/* Benefícios */}
              <div className="mx-auto mt-9 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Benefit
                  icon={<ShieldCheck className="size-4" />}
                  text="Garantia vitalícia"
                />

                <Benefit
                  icon={<Truck className="size-4" />}
                  text="Frete grátis"
                />

                <Benefit
                  icon={<Check className="size-4" />}
                  text="Taxas competitivas"
                />

                <Benefit
                  icon={<BadgePercent className="size-4" />}
                  text="+20% com cupom"
                  highlight
                />
              </div>

              {/* Cupom */}
              <div className="mx-auto mt-8 max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                  Clique abaixo para copiar seu cupom
                </p>

                <CouponCopy
  variant="light"
  location="final_cta"
/>
              </div>

              {/* Botões */}
              {/* Botões */}
<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
  <TrackedLink
    href={siteConfig.links.catalog}
    target="_blank"
    rel="noopener noreferrer"
    tracking={{
      event: "cta_click",
      location: "final_cta",
      destination: "catalog",
      label: "Ver máquinas com desconto",
      conversionStrength: "medium",
    }}
  >
    <Button
      size="lg"
      className="h-12 w-full gap-2 px-6 text-base font-bold shadow-lg shadow-primary/20 sm:w-auto"
    >
      Ver máquinas com desconto

      <ArrowRight className="size-4" />
    </Button>
  </TrackedLink>

  <TrackedLink
    href={siteConfig.links.plansAndRates}
    target="_blank"
    rel="noopener noreferrer"
    tracking={{
      event: "rates_click",
      location: "final_cta",
      destination: "plans_and_rates",
      label: "Ver planos e taxas",
      conversionStrength: "weak",
    }}
  >
    <Button
      variant="outline"
      size="lg"
      className="h-12 w-full border-white/20 bg-white/5 px-6 text-base text-white hover:border-white/30 hover:bg-white/10 hover:text-white sm:w-auto"
    >
      Ver planos e taxas
    </Button>
  </TrackedLink>
</div>

              {/* Segurança */}
              <p className="mx-auto mt-6 max-w-xl text-xs leading-5 text-white/50">
                Você será direcionado para o site oficial da Ton para consultar
                as condições e finalizar sua compra.
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

function Benefit({
  icon,
  text,
  highlight = false,
}: {
  icon: React.ReactNode
  text: string
  highlight?: boolean
}) {
  return (
    <div
      className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold ${
        highlight
          ? "border-orange-400/30 bg-orange-400/10 text-orange-200"
          : "border-white/10 bg-white/[0.06] text-zinc-200"
      }`}
    >
      <span className={highlight ? "text-orange-400" : "text-primary"}>
        {icon}
      </span>

      {text}
    </div>
  )
}