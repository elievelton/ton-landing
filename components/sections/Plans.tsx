import {
  ArrowRight,
  Check,
  Flame,
  Sparkles,
  Calculator,
} from "lucide-react";

import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { TrackedLink } from "@/components/shared/TrackedLink";
import { Button } from "@/components/ui/button";
import { plans } from "@/config/plans";
import { siteConfig } from "@/config/site";

export function Plans() {
  return (
    <section
      id="planos"
      className="relative overflow-hidden bg-zinc-50 py-20 sm:py-24"
    >
      {/* Elementos decorativos */}
      <div
        className="pointer-events-none absolute -left-32 top-20 size-80 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        {/* Cabeçalho */}
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Escolha seu plano
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Encontre o plano ideal para o seu negócio
            </h2>

            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
              Compare as principais opções da Ton e escolha as condições que
              fazem mais sentido para suas vendas.
            </p>
          </div>
        </FadeIn>

        {/* Cards */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
          {plans.map((plan, index) => (
            <FadeIn
              key={plan.id}
              delay={index * 0.1}
              direction={index === 0 ? "right" : "left"}
            >
              <article
                className={[
                  "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border bg-white p-7 transition-all duration-500 sm:p-8",

                  plan.recommended
                    ? "border-primary shadow-[0_20px_60px_rgba(34,197,94,0.15)] hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(34,197,94,0.22)]"
                    : "border-border shadow-sm hover:-translate-y-1 hover:shadow-lg",
                ].join(" ")}
              >
                {/* Glow Mega+ */}
                {plan.recommended && (
                  <>
                    <div
                      className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-primary/15 blur-3xl transition-all duration-700 group-hover:bg-primary/25"
                      aria-hidden="true"
                    />

                    <div
                      className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent"
                      aria-hidden="true"
                    />
                  </>
                )}

                {/* Badge */}
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div
                    className={[
                      "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold",

                      plan.recommended
                        ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                        : "bg-zinc-100 text-foreground",
                    ].join(" ")}
                  >
                    {plan.recommended ? (
                      <Flame className="size-3.5" />
                    ) : (
                      <Sparkles className="size-3.5" />
                    )}

                    {plan.badge}
                  </div>

                  {plan.recommended && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Nossa escolha
                    </span>
                  )}
                </div>

                {/* Plano */}
                <div className="relative z-10 mt-8">
                  <p className="text-sm font-semibold text-primary">
                    Plano Ton
                  </p>

                  <h3 className="mt-1 text-4xl font-bold tracking-tight text-foreground">
                    {plan.shortName}
                  </h3>

                  {plan.id === "ton-black" && (
                    <div className="mt-3">
                      <span
                        className="inline-flex items-center rounded-full bg-orange-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-orange-600"
                      >
                        Exclusivo para MEI / PJ
                      </span>

                      <p className="mt-2 text-xs font-semibold text-muted">
                        Disponível para empresas e MEIs.
                      </p>
                    </div>
                  )}

                  <p className="mt-4 min-h-[72px] text-sm leading-6 text-muted sm:text-base">
                    {plan.description}
                  </p>
                </div>

                {/* Taxas */}
                <div className="relative z-10 mt-7">
                  <div
                    className={[
                      "grid grid-cols-3 overflow-hidden rounded-2xl border",

                      plan.recommended
                        ? "border-primary/20 bg-primary/5"
                        : "border-border bg-zinc-50",
                    ].join(" ")}
                  >
                    {/* Débito */}
                    <div className="px-3 py-4 text-center">
                      <p
                        className={[
                          "text-2xl font-extrabold tracking-tight sm:text-3xl",

                          plan.recommended
                            ? "text-primary"
                            : "text-foreground",
                        ].join(" ")}
                      >
                        {plan.rates.debit}
                      </p>

                      <p className="mt-1 text-xs font-medium text-muted">
                        Débito
                      </p>
                    </div>

                    {/* Crédito */}
                    <div className="border-x border-border/70 px-3 py-4 text-center">
                      <p
                        className={[
                          "text-2xl font-extrabold tracking-tight sm:text-3xl",

                          plan.recommended
                            ? "text-primary"
                            : "text-foreground",
                        ].join(" ")}
                      >
                        {plan.rates.credit}
                      </p>

                      <p className="mt-1 text-xs font-medium text-muted">
                        Crédito
                      </p>
                    </div>

                    {/* Crédito 12x */}
                    <div className="px-3 py-4 text-center">
                      <p
                        className={[
                          "text-2xl font-extrabold tracking-tight sm:text-3xl",

                          plan.recommended
                            ? "text-primary"
                            : "text-foreground",
                        ].join(" ")}
                      >
                        {plan.rates.credit12x}
                      </p>

                      <p className="mt-1 text-xs font-medium text-muted">
                        Crédito 12x
                      </p>
                    </div>
                  </div>

                  {/* Destaque da taxa */}
                  {plan.rateHighlight && (
                    <div className="mt-3 flex justify-center">
                      <span className="rounded-full bg-orange-500/10 px-4 py-2 text-center text-xs font-bold text-orange-600">
                        🔥 {plan.rateHighlight}
                      </span>
                    </div>
                  )}

                  {/* Condições */}
                  {plan.rateNote && (
                    <p className="mx-auto mt-3 max-w-md text-center text-xs leading-5 text-muted">
                      * {plan.rateNote}
                    </p>
                  )}
                </div>

                {/* Benefícios */}
                <ul className="relative z-10 mt-7 space-y-4">
                  {plan.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-sm leading-6 text-foreground/80"
                    >
                      <span
                        className={[
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",

                          plan.recommended
                            ? "bg-primary text-white"
                            : "bg-primary/10 text-primary",
                        ].join(" ")}
                      >
                        <Check className="size-3" />
                      </span>

                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="relative z-10 mt-auto pt-8">
                  {/* Recomendação Mega+ */}
                  {plan.recommended && (
                    <p className="mb-3 text-center text-xs font-medium text-primary">
                      Plano que recomendamos para a maioria dos negócios
                    </p>
                  )}

                  {/* Botão principal */}
                  <TrackedLink
                    href={siteConfig.links.catalog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    tracking={{
                      event: "cta_click",
                      location: "plans",
                      destination: "catalog",
                      label: plan.recommended
                        ? "Garantir o Mega+ com Desconto"
                        : "Quero o Ton Black",
                      product: plan.id,
                      conversionStrength: "medium",
                    }}
                  >
                    <Button
                      variant={plan.recommended ? "default" : "outline"}
                      size="lg"
                      className={[
                        "h-12 w-full gap-2",

                        plan.recommended
                          ? "shadow-lg shadow-primary/20"
                          : "",
                      ].join(" ")}
                    >
                      {plan.recommended
                        ? "Garantir o Mega+ com Desconto"
                        : "Quero o Ton Black"}

                      <ArrowRight className="size-4" />
                    </Button>
                  </TrackedLink>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {/* ==========================================================
            CHAMADA PARA A CALCULADORA
           ========================================================== */}

        <FadeIn delay={0.2}>
          <div
            className="
              mx-auto mt-10 max-w-4xl
              rounded-[2rem]
              border border-primary/15
              bg-white
              p-6
              shadow-sm
              sm:mt-12 sm:p-8
            "
          >
            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
              <div
                className="
                  flex size-12 shrink-0
                  items-center justify-center
                  rounded-2xl
                  bg-primary/10
                  text-primary
                "
              >
                <Calculator className="size-6" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-foreground sm:text-xl">
                  Quer saber quanto realmente sobra para você?
                </h3>

                <p className="mt-1 text-sm leading-6 text-muted">
                  Simule uma venda, compare Pix, débito e parcelamento
                  e descubra quanto realmente entra na sua conta.
                </p>
              </div>

              <a
                href="#calculadora"
                className="
                  group
                  inline-flex
                  h-11
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border border-primary/20
                  bg-primary/5
                  px-5
                  text-sm
                  font-bold
                  text-primary
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-primary/30
                  hover:bg-primary/10
                  hover:shadow-sm
                "
              >
                Simular minhas taxas

                <ArrowRight
                  className="
                    size-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </a>
            </div>
            <a
  href="#faq-planos"
  className="
    group mt-5 flex w-full
    items-center justify-center
    gap-3 rounded-xl
    border border-primary/20
    bg-primary/5
    px-4 py-3.5
    text-left
    transition-all duration-300
    hover:-translate-y-0.5
    hover:border-primary/30
    hover:bg-primary/10
    hover:shadow-md
    hover:shadow-primary/10
  "
>
  <div className="min-w-0 flex-1">
    <p className="text-xs font-semibold text-muted">
      Ainda em dúvida qual plano escolher?
    </p>

    <p className="mt-0.5 text-sm font-extrabold text-primary">
      Mega+ ou Black?
    </p>
  </div>

  <ArrowRight className="size-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
</a>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}