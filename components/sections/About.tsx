import {
  ArrowRight,

  BadgePercent,
  BriefcaseBusiness,
  Code2,
  Mail,
  MessageCircle,
  ShieldCheck,
} from "lucide-react"

import Image from "next/image"

import { Container } from "@/components/shared/Container"
import { FadeIn } from "@/components/shared/FadeIn"
import { TrackedLink } from "@/components/shared/TrackedLink"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function About() {
  return (
    <section
      id="quem-somos"
      className="relative overflow-hidden bg-white py-16 sm:py-24"
    >
      {/* Background Decorativo */}
      <div
        className="pointer-events-none absolute -left-32 bottom-0 size-80 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-32 top-10 size-96 rounded-full bg-orange-500/5 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        {/* PARTE 1: SOBRE O CONSULTOR */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Foto + credenciais */}
          <FadeIn direction="right">
            <div className="mx-auto w-full max-w-md">
              <div className="relative mx-auto max-w-[400px]">
                <div
                  className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-primary/10"
                  aria-hidden="true"
                />

                <div
                  className="absolute -inset-1 -rotate-2 rounded-[2.5rem] border border-orange-500/20"
                  aria-hidden="true"
                />

                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-zinc-100 shadow-xl">
                  <Image
                    src="/images/about/consultor.jpg"
                    alt="Elievelto, Consultor Parceiro Ton"
                    width={2736}
                    height={4104}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 420px, 440px"
                    className="h-auto w-full object-cover"
                    quality={90}
                    priority
                  />

                  <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/20 bg-black/75 p-4 text-white shadow-lg backdrop-blur-md">
                    <p className="text-lg font-extrabold text-white">
                      Parceiro Ton
                    </p>

                    <p className="mt-0.5 text-xs font-medium text-zinc-200">
                      Elievelto • Consultor &amp; Dev
                    </p>
                  </div>
                </div>
              </div>

              {/* Cards Credenciais */}
              <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <BriefcaseBusiness className="size-5" />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Mercado de pagamentos
                      </p>

                      <p className="mt-0.5 font-extrabold text-foreground">
                        Desde 2016
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20">
                      <BadgePercent className="size-5" />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Experiência prática
                      </p>

                      <p className="mt-0.5 font-extrabold text-orange-600">
                        +5.000 vendas
                      </p>

                      <p className="text-[11px] font-medium text-muted-foreground">
                        realizadas por indicação
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-primary/15 bg-primary/5 px-5 py-3.5 text-center">
                <p className="text-xs font-bold leading-relaxed text-foreground sm:text-sm">
                  Anos acompanhando de perto a evolução do mercado de{" "}
                  <span className="text-primary">
                    meios de pagamento.
                  </span>
                </p>
              </div>
            </div>
          </FadeIn>

          {/* História e Proposta */}
          <FadeIn direction="left" delay={0.15}>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
                Quem está por trás desta página?
              </span>

              <h2 className="mt-2 max-w-2xl text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Experiência para ajudar você a{" "}
                <span className="text-primary">
                  vender melhor
                </span>
              </h2>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Meu nome é{" "}
                <strong className="font-bold text-foreground">
                  Elievelto
                </strong>
                , trabalho com empresas de máquinas de cartão desde{" "}
                <strong className="font-bold text-foreground">
                  2016
                </strong>
                . Ao longo dessa trajetória, conheci e atuei com diferentes
                soluções do mercado, passando por empresas como SumUp, iZettle,
                Mercado Pago e PagSeguro. Nesse período, acumulei experiência
                prática ajudando milhares de clientes e ultrapassei a marca de{" "}
                <strong className="font-bold text-primary">
                  5.000 vendas realizadas por indicação.
                </strong>
              </p>

              <div className="my-6 rounded-2xl border-l-4 border-orange-500 bg-orange-500/5 px-5 py-4">
                <p className="text-sm font-semibold leading-relaxed text-foreground sm:text-base">
                  E se hoje estou na Ton, não é porque gosto de ficar mudando
                  de empresa. É justamente o contrário:{" "}
                  <span className="font-bold text-orange-600">
                    eu busco estar onde acredito que estão as melhores
                    condições para os empreendedores, afinal, eu também sou um
                    empreendedor.
                  </span>
                </p>
              </div>

              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                O mercado muda, as taxas mudam e novas soluções aparecem.
                Por isso, meu compromisso sempre foi analisar as opções
                disponíveis e indicar aquilo que considero mais vantajoso para
                quem precisa vender.
              </p>

              <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Hoje, essa escolha é a{" "}
                <strong className="font-bold text-primary">
                  Ton
                </strong>
                . Além das maquininhas e das taxas competitivas, encontramos
                um ecossistema de soluções para facilitar o dia a dia de quem
                vende.
              </p>

              <div className="mt-6 flex items-start gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20">
                  <Code2 className="size-5" />
                </div>

                <div>
                  <p className="font-bold text-foreground">
                    Tecnologia também faz parte da minha história
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Como desenvolvedor de software, procuro olhar além da
                    maquininha: analiso também os recursos, ferramentas e
                    soluções que podem facilitar o dia a dia do seu negócio.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3">
                <ShieldCheck className="mt-1 size-5 shrink-0 text-primary" />

                <p className="text-base font-semibold leading-relaxed text-foreground">
                  Estou aqui para usar essa experiência e ajudar você a
                  escolher a maquininha e o plano mais adequados para o seu
                  negócio.
                </p>
              </div>

              <p className="mt-5 text-xl font-black tracking-tight text-foreground sm:text-2xl">
                Porque vender mais é importante.{" "}
                <span className="text-primary">
                  Vender melhor faz toda a diferença.
                </span>
              </p>

              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <TrackedLink
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                  tracking={{
                    event: "whatsapp_click",
                    location: "about",
                    destination: "whatsapp",
                    label: "Tirar dúvidas no WhatsApp",
                    conversionStrength: "weak",
                  }}
                >
                  <Button
                    size="lg"
                    className="h-12 w-full gap-2 bg-emerald-600 px-6 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 sm:w-auto"
                  >
                    <MessageCircle className="size-5" />
                    Tirar dúvidas no WhatsApp
                    <ArrowRight className="size-4" />
                  </Button>
                </TrackedLink>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 text-primary" />
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

      </Container>
    </section>
  )
}