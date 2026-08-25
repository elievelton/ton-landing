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
          <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#064E3B] via-[#052E2B] to-[#022C22] px-6 py-12 text-white shadow-[0_20px_60px_rgba(5,46,43,0.22)] sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            {/* Elementos decorativos */}
            <div
              className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-emerald-300/10 blur-3xl"
              aria-hidden="true"
            />

            <div
              className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-orange-400/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-400/10 px-4 py-2 text-sm font-semibold text-orange-300">
                <BadgePercent className="size-4" />
                Economize ainda mais com meu cupom
              </div>

              {/* Título */}
              <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                <span className="text-orange-500">
                  Fuja dos calotes.
                </span>{" "}
                Venda parcelado e{" "}
                <span className="text-orange-500">
                  receba à vista.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
                Aproveite as condições promocionais da Ton e, nas ofertas
                aplicáveis, tenha ainda{" "}
                <strong className="font-bold text-green-300">
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
              <div className="mx-auto mt-8 max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-black">
                  Clique abaixo para copiar seu cupom
                </p>

                <CouponCopy
                  variant="orange"
                  location="final_cta"
                />
              </div>

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
                    className="group h-12 w-full gap-2 bg-orange-500 px-6 text-base font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-xl hover:shadow-orange-500/30 sm:w-auto"
                  >
                    Ver máquinas com desconto
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
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
                    className="group h-12 w-full gap-2 border-0 bg-primary px-6 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 sm:w-auto"
                  >
                    Ver planos e taxas
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </TrackedLink>
              </div>

              {/* Segurança */}
              <p className="mx-auto mt-6 max-w-xl text-xs leading-5 text-white/60">
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
      className={[
        "flex items-center justify-center gap-2 rounded-xl border bg-white px-3 py-3 text-sm font-semibold text-slate-900 shadow-sm",
        highlight
          ? "border-orange-200"
          : "border-slate-200",
      ].join(" ")}
    >
      <span className={highlight ? "text-orange-500" : "text-primary"}>
        {icon}
      </span>

      {text}
    </div>
  )
}
