import {
  ArrowRight,
  Award,
  BadgePercent,
  BriefcaseBusiness,
  Code2,
  Mail,
  MessageCircle,
  Quote,
  ShieldCheck,
  Star,
} from "lucide-react"

import Image from "next/image"

import { Container } from "@/components/shared/Container"
import { FadeIn } from "@/components/shared/FadeIn"
import { TrackedLink } from "@/components/shared/TrackedLink"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

// Notas oficiais de reputação
const RATING_METRICS = [
  {
    score: "9.4",
    max: "/10",
    label: "Reclame Aqui",
    badge: "Selo RA1000",
    description: "Excelente reputação no atendimento",
  },
  {
    score: "4.8",
    max: "/5",
    label: "Google Play",
    badge: "+1M downloads",
    description: "Avaliação do app Android",
  },
  {
    score: "4.9",
    max: "/5",
    label: "App Store",
    badge: "Top Avaliado",
    description: "Avaliação do app iOS",
  },
]

// Depoimentos dos clientes (6 itens para simetria perfeita no grid)
const TESTIMONIALS = [
  {
    quote:
      "Em uma venda que precisei fazer de emergência, onde minha maquininha estava sem bateria, fiz a instalação do TapTon e na hora já consegui efetuar a venda, que maravilha.",
    author: "Diego Belleboni",
    role: "Vendeu com o TapTon",
    rating: 5,
  },
  {
    quote:
      "A máquina é muito boa, todas as vezes que precisei em relação a algum problema com ela, os funcionários me atenderam com a maior satisfação. Na minha opinião isso só acontece pelo jeito como a empresa trata os funcionários.",
    author: "Andréia",
    role: "Vendeu com a Maquininha Ton",
    rating: 5,
  },
  {
    quote:
      "Encantados! É assim que nos sentimos. Mais do que o fornecimento de serviços competente e eficiente. O suporte no dia a dia, o atendimento cuidadoso e carinhoso, o respeito ao cliente, faz com que tenhamos a certeza que essa é uma parceria de verdade!",
    author: "Simone Viana",
    role: "Utilizou o suporte do Ton",
    rating: 5,
  },
  {
    quote: "Muito seguro, recomendo e as taxas são as melhores.",
    author: "Ana Paula Pereira Alves",
    role: "Vendeu com o TapTon",
    rating: 5,
  },
  {
    quote:
      "No início não aceitava cartões e cheguei até a perder alguns clientes mas com a aceitação de cartão consegui resgatá-los e também conquistar novos clientes. Tudo transparente e suporte ao cliente resolve tudo com facilidade.",
    author: "Everton",
    role: "Vendeu com a Maquininha Ton",
    rating: 5,
  },
  {
    quote:
      "Desde o início o serviço me surpreendeu pela rapidez no atendimento e por notar que as pessoas que me atendiam sabiam o que estavam fazendo! E o principal! Nada mudou com o decorrer dos meses, continuo muito satisfeita.",
    author: "Maria Lígia",
    role: "Utilizou o suporte do Ton",
    rating: 5,
  },
]

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

        {/* PARTE 2: PROVA SOCIAL E REPUTAÇÃO TON */}
        <div className="mt-20 border-t border-border/80 pt-16 sm:mt-24 sm:pt-20">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold text-primary sm:text-sm">
                <Award className="size-4 shrink-0" />
                <span>PROVA SOCIAL E REPUTAÇÃO</span>
              </div>

              <h3 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                Por que nossos clientes amam o Ton?
              </h3>

              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Veja as notas de reputação nos principais canais e os
                depoimentos de quem usa no dia a dia.
              </p>
            </div>
          </FadeIn>

          {/* Métricas Reclame Aqui e App Stores */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {RATING_METRICS.map((metric, index) => (
              <FadeIn key={metric.label} delay={index * 0.1}>
                <div className="relative flex flex-col items-center justify-center rounded-2xl border border-primary/15 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                  <div className="inline-block rounded-full bg-orange-500/10 px-3 py-0.5 text-[10px] font-bold text-orange-600">
                    {metric.badge}
                  </div>

                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                      {metric.score}
                    </span>

                    <span className="text-xs font-bold text-muted-foreground">
                      {metric.max}
                    </span>
                  </div>

                  <h4 className="mt-1 text-sm font-bold text-foreground">
                    {metric.label}
                  </h4>

                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {metric.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Grid de Depoimentos (6 Cards - Simétrico) */}
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((item, index) => (
              <FadeIn key={index} delay={index * 0.08}>
                <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                  <div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="size-3.5 fill-amber-400"
                        />
                      ))}
                    </div>

                    <div className="relative mt-3">
                      <Quote className="absolute -left-2 -top-2 size-6 text-primary/10 transition-colors group-hover:text-primary/20" />

                      <p className="relative z-10 text-xs leading-relaxed text-foreground/90 italic">
                        &quot;{item.quote}&quot;
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-extrabold text-primary">
                      {item.author.charAt(0)}
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-foreground">
                        {item.author}
                      </h5>

                      <p className="text-[11px] font-medium text-primary">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}