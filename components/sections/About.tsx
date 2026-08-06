import {
  ArrowRight,
  BadgePercent,
  BriefcaseBusiness,
  Code2,
  Mail,
  ShieldCheck,
} from "lucide-react"
import Image from "next/image"

import { Container } from "@/components/shared/Container"
import { FadeIn } from "@/components/shared/FadeIn"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function About() {
  return (
    <section
      id="quem-somos"
      className="relative overflow-hidden bg-white py-20 sm:py-24"
    >
      {/* Elementos decorativos */}
      <div
        className="pointer-events-none absolute -left-32 bottom-0 size-80 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-32 top-10 size-96 rounded-full bg-orange-500/5 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Foto + credenciais */}
          <FadeIn direction="right">
            <div className="mx-auto w-full max-w-md">
              {/* Foto */}
              <div className="relative mx-auto max-w-[400px]">
                {/* Fundos decorativos */}
                <div
                  className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-primary/10"
                  aria-hidden="true"
                />

                <div
                  className="absolute -inset-1 -rotate-2 rounded-[2.5rem] border border-orange-500/20"
                  aria-hidden="true"
                />

                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-zinc-100 shadow-premium">
                  <Image
                    src="/images/about/consultor.jpg"
                    alt="Elievelto, Parceiro Ton"
                    width={2736}
                    height={4104}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 420px, 440px"
                    className="h-auto w-full object-cover"
                    quality={90}
                  />

                  {/* Identificação */}
                  <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/20 bg-black/65 p-4 text-white shadow-lg backdrop-blur-md">
                    <p className="text-lg font-bold">
                      Parceiro Ton
                    </p>

                    <p className="mt-1 text-sm text-white/80">
                      Consultor & Desenvolvedor de Software
                    </p>
                  </div>
                </div>
              </div>

              {/* Credenciais */}
              <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
                {/* Desde 2016 */}
                <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <BriefcaseBusiness className="size-5" />
                    </div>

                    <div>
                      <p className="text-xs text-muted">
                        Mercado de pagamentos
                      </p>

                      <p className="mt-0.5 font-bold text-foreground">
                        Desde 2016
                      </p>
                    </div>
                  </div>
                </div>

                {/* +5.000 vendas */}
                <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20">
                      <BadgePercent className="size-5" />
                    </div>

                    <div>
                      <p className="text-xs text-muted">
                        Experiência prática
                      </p>

                      <p className="mt-0.5 font-bold text-orange-600">
                        +5.000 vendas
                      </p>

                      <p className="text-[11px] text-muted">
                        realizadas por indicação
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Frase complementar */}
              <div className="mt-4 rounded-2xl border border-primary/10 bg-primary/5 px-5 py-4 text-center">
                <p className="text-sm font-semibold leading-6 text-foreground">
                  Anos acompanhando de perto a evolução do mercado de{" "}
                  <span className="text-primary">
                    meios de pagamento.
                  </span>
                </p>
              </div>
            </div>
          </FadeIn>

          {/* História */}
          <FadeIn direction="left" delay={0.15}>
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Quem está por trás desta página?
              </span>

              <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Experiência para ajudar você a{" "}
                <span className="text-primary">
                  vender melhor
                </span>
              </h2>

              <p className="mt-6 text-base leading-7 text-muted sm:text-lg">
                Meu nome é <strong className="text-foreground">Elievelto</strong>, trabalho com empresas de máquinas de cartão desde{" "}
                <strong className="text-foreground">2016</strong>. Ao longo dessa
                trajetória, conheci e atuei com diferentes soluções do mercado,
                passando por empresas como SumUp, iZettle, Mercado Pago e PagSeguro.
                Nesse período, acumulei experiência prática ajudando milhares de
                clientes e ultrapassei a marca de{" "}
                <strong className="text-primary">
                  5.000 vendas realizadas por indicação.
                </strong>
              </p>

              {/* Destaque */}
              <div className="my-6 rounded-2xl border-l-4 border-orange-500 bg-orange-500/5 px-5 py-4">
                <p className="font-semibold leading-7 text-foreground">
                  E se hoje estou na Ton, não é porque gosto de ficar mudando
                  de empresa. É justamente o contrário:{" "}
                  <span className="text-orange-600">
                    eu busco estar onde acredito que estão as melhores
                    condições para os empreendedores, afinal, eu também sou um empreendedor.
                  </span>
                </p>
              </div>

              <p className="text-base leading-7 text-muted sm:text-lg">
                O mercado muda, as taxas mudam e novas soluções aparecem.
                Por isso, meu compromisso sempre foi analisar as opções
                disponíveis e indicar aquilo que considero mais vantajoso para
                quem precisa vender.
              </p>

              <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
                Hoje, essa escolha é a{" "}
                <strong className="text-primary">
                  Ton
                </strong>
                . Além das maquininhas e das taxas competitivas, encontramos
                um ecossistema de soluções para facilitar o dia a dia de quem
                vende.
              </p>

              {/* Tecnologia */}
              <div className="mt-6 flex items-start gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                  <Code2 className="size-5" />
                </div>

                <div>
                  <p className="font-bold text-foreground">
                    Tecnologia também faz parte da minha história
                  </p>

                  <p className="mt-1 text-sm leading-6 text-muted">
                    Como desenvolvedor de software, procuro olhar além da
                    maquininha: analiso também os recursos, ferramentas e
                    soluções que podem facilitar o dia a dia do seu negócio.
                  </p>
                </div>
              </div>

              {/* Fechamento */}
              <div className="mt-6 flex items-start gap-3">
                <ShieldCheck className="mt-1 size-5 shrink-0 text-primary" />

                <p className="text-base font-semibold leading-7 text-foreground">
                  Estou aqui para usar essa experiência e ajudar você a
                  escolher a maquininha e o plano mais adequados para o seu
                  negócio.
                </p>
              </div>

              <p className="mt-6 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                Porque vender mais é importante.{" "}
                <span className="text-primary">
                  Vender melhor faz toda a diferença.
                </span>
              </p>

              {/* Contato */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={`mailto:${siteConfig.email}`}>
                  <Button
                    size="lg"
                    className="h-12 w-full gap-2 px-6 text-base shadow-lg shadow-primary/20 sm:w-auto"
                  >
                    <Mail className="size-4" />

                    Falar com o consultor

                    <ArrowRight className="size-4" />
                  </Button>
                </a>

                <span className="text-sm text-muted">
                  {siteConfig.email}
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}