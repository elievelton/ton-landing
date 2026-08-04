import {
  ArrowRight,
  Check,
  CreditCard,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react"

import { Container } from "@/components/shared/Container"
import { FadeIn } from "@/components/shared/FadeIn"
import { TrackedLink } from "@/components/shared/TrackedLink"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function TapTon() {
  return (
    <section
      id="tapton"
      className="relative overflow-hidden bg-white py-20 sm:py-24"
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
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-zinc-50 shadow-premium">
            <div className="grid items-center gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
              {/* Conteúdo */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                  <Smartphone className="size-4" />
                  TapTon
                </div>

                <h2 className="mt-6 max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Transforme seu celular em uma{" "}
                  <span className="text-primary">
                    maquininha de cartão
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
                  Comece a aceitar pagamentos por aproximação usando um celular
                  compatível, sem precisar de uma maquininha física.
                </p>

                {/* Benefícios */}
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-4" />
                    </span>

                    <span className="text-sm font-medium text-foreground">
                      Zero mensalidade
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-4" />
                    </span>

                    <span className="text-sm font-medium text-foreground">
                      Zero adesão
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-4" />
                    </span>

                    <span className="text-sm font-medium text-foreground">
                      Débito e crédito
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-4" />
                    </span>

                    <span className="text-sm font-medium text-foreground">
                      Crédito em até 12x
                    </span>
                  </div>
                </div>

                {/* CTA */}
{/* CTA */}
<TrackedLink
  href={siteConfig.links.tapTon}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-8 inline-block"
  tracking={{
    event: "tapton_click",
    location: "tapton",
    destination: "tapton",
    label: "Quero vender pelo celular",
    product: "tapton",
    conversionStrength: "weak",
  }}
>
  <Button
    size="lg"
    className="h-12 gap-2 px-6 text-base shadow-lg shadow-primary/20"
  >
    Quero vender pelo celular

    <ArrowRight className="size-4" />
  </Button>
</TrackedLink>

                <p className="mt-3 text-xs leading-5 text-muted">
                  Disponibilidade sujeita à compatibilidade do aparelho com a
                  tecnologia necessária para pagamentos por aproximação.
                </p>
              </div>

              {/* Área visual */}
              <div className="relative flex min-h-[360px] items-center justify-center">
                <div
                  className="pointer-events-none absolute size-72 rounded-full bg-primary/15 blur-3xl"
                  aria-hidden="true"
                />

                {/* Celular */}
                <div className="group relative">
                  <div className="relative flex h-[340px] w-[180px] rotate-3 flex-col overflow-hidden rounded-[2.5rem] border-[7px] border-zinc-900 bg-white shadow-2xl transition-all duration-500 hover:rotate-0 hover:scale-105">
                    {/* Alto-falante */}
                    <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-zinc-900" />

                    {/* Tela */}
                    <div className="flex flex-1 flex-col items-center justify-center bg-linear-to-b from-primary/5 to-primary/15 px-5 text-center">
                      <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
                        <Wifi className="size-9 rotate-90" />
                      </div>

                      <p className="mt-5 text-lg font-bold text-foreground">
                        Aproxime para pagar
                      </p>

                      <p className="mt-2 text-xs leading-5 text-muted">
                        Seu celular virou uma maquininha.
                      </p>

                      <div className="mt-6 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-primary shadow-sm">
                        <Zap className="size-3.5" />
                        TapTon
                      </div>
                    </div>
                  </div>

                  {/* Card flutuante */}
                  <div className="absolute -left-24 bottom-14 hidden rounded-2xl border border-border bg-white p-4 shadow-xl sm:block">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <CreditCard className="size-5" />
                      </div>

                      <div>
                        <p className="text-xs text-muted">
                          Pagamento
                        </p>

                        <p className="text-sm font-bold text-foreground">
                          Aprovado ✓
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}