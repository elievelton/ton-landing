"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  ArrowRight,
  BadgeCheck,
  BadgePercent,
  BatteryCharging,
  ChevronDown,
  CircleHelp,
  CreditCard,
  Printer,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react"

import { Container } from "@/components/shared/Container"
import { FadeIn } from "@/components/shared/FadeIn"
import { siteConfig } from "@/config/site"
import { CouponCopy } from "@/components/shared/CouponCopy"
import { TrackedLink } from "@/components/shared/TrackedLink"

const faqs = [
  {
    question: "É seguro comprar nesse site?",
    id: "faq-seguranca",
    answer:
      "Sim, é 100% seguro. Este site é um canal parceiro de indicação e divulgação de ofertas da Ton. Disponibilizamos cupons de desconto exclusivos para ajudar você a economizar na compra da sua maquininha.\nFunciona assim: nós apenas disponibilizamos o cupom e direcionamos você para a oferta. Nada relacionado a pagamentos acontece neste site, e nós não solicitamos nem armazenamos seus dados financeiros.\nAo clicar em qualquer botão de desconto deste site, você será redirecionado para o site oficial da Ton. O desconto normalmente é aplicado automaticamente ao acessar a compra pelos nossos links. Antes de finalizar, confira o resumo do pedido para confirmar o desconto. Caso ele não apareça, você poderá inserir o cupom manualmente.\nA compra, o pagamento, a emissão da nota fiscal, a entrega, a garantia de fábrica e o atendimento são realizados diretamente pela Ton (Grupo Stone), dentro do ambiente oficial da empresa.\nVocê encontra seu cupom de desconto aqui, mas conclui sua compra diretamente no site oficial da Ton, com toda a segurança do ambiente oficial da empresa!",
  },
  {
    question: "Preciso ter CNPJ para comprar uma maquininha Ton?",
    id: "faq-cnpj",
    answer:
      "Não. Existem opções para quem vende como pessoa física e também para quem possui CNPJ. Algumas bandeiras e benefícios específicos podem depender do tipo de cadastro.",
  },
  {
    question: "Estou com nome sujo posso comprar uma maquininha?",
    id: "faq-nome-sujo",
    answer:
      "Sim, a empresa Ton não faz consulta para saber o estado do seu nome, pode comprar com tranquilidade ",
  },
  {
    question: "Preciso ter conta para comprar uma maquininha?",
    id: "faq-conta",
    answer:
      "Não. Ao adquirir uma maquininha Ton, você recebe automaticamente uma conta digital no aplicativo Ton. Suas vendas caem diretamente nela, sem a necessidade de vincular outro banco. Pelo app, você pode transferir dinheiro, investir e aproveitar todo o ecossistema completo da Ton.",
  },
  {
    question: "As maquininhas Ton têm mensalidade?",
    id: "faq-mensalidade",
    answer:
      "Não, as maquininhas Ton são sem mensalidades, você só vai pagar quando ultilizar ela e pequenas taxas de acordo com o plano que escolheu no ato da compra",
  },
  {
    question: "Como funciona o desconto adicional de 20%?",
    id: "faq-desconto-20",
    answer: `Primeiro é aplicado o preço promocional disponibilizado pela Ton. Depois, nas condições aplicáveis, você ainda pode utilizar meu cupom ${siteConfig.coupon} para obter 20% de desconto adicional. Ou seja: o segundo desconto é aplicado sobre o valor que já está com a promoção da Ton.`,
  },
  {
    question: "Como saber se meu cupom de 20% foi aplicado?",
    id: "faq-cupom-aplicado",
    answer: "",
    type: "coupon",
  },
  {
    question: "A garantia das maquininhas é vitalícia?",
    id: "faq-garantia",
    answer:
      "A Ton oferece garantia vitalícia para as maquininhas elegíveis, conforme as regras e condições da empresa. Isso significa mais tranquilidade para quem pretende utilizar a máquina por bastante tempo. Resumindo, quebrou a Ton troca por outra nova, pois o que matém o sucesso da Ton é o seu sucesso!",
  },
  {
    question: "O frete é grátis?",
    id: "faq-frete",
    answer:
      "A Ton oferece frete grátis nas condições divulgadas para a aquisição das maquininhas. As condições finais de entrega e disponibilidade podem ser consultadas no momento da compra.",
  },
  {
    question: "Quando recebo o dinheiro das minhas vendas?",
    id: "faq-recebimento",
    answer:
      "Vai depender do plano que você escolher no ato da compra, mas em regra você recebe seus pagamento com 1 dia útil, mesmo que você parcele em 12x o dinheiro cai em sua conta em 1 dia útil",
  },
  {
    question:
      "Já tenho uma máquina de cartão de outra empresa. Vale a pena comprar outra da Ton?",
    id: "faq-segunda-maquininha",
    answer:
      "Pode valer muito a pena, principalmente se a sua máquina atual é importante para o funcionamento do seu negócio. Pense no seguinte cenário: você precisa fazer suas vendas, mas a empresa da sua máquina fica temporariamente indisponível. Se esse problema durar duas ou três horas, quantas vendas você pode deixar de realizar?\n\nTer uma segunda maquininha, de outra empresa, funciona como uma forma de redundância: se uma solução apresentar instabilidade, você ainda pode ter outra opção para continuar recebendo pagamentos. Quanto menos você depender de uma única empresa, menor fica o risco de uma indisponibilidade interromper completamente as suas vendas.\n\nIsso pode ser especialmente interessante para negócios que precisam vender por muitas horas do dia ou que funcionam em horários de menor movimento. Manutenções e atualizações podem acontecer fora dos horários de pico, mas não existe um horário fixo ou garantia de que uma empresa ficará indisponível em determinado período.\n\nNo fim, você não está necessariamente comprando uma segunda máquina para substituir a primeira. Está criando uma alternativa para manter o seu negócio disponível quando mais precisar.",
    type: "second-machine",
  },
  {
    question: "Qual é o melhor plano da Ton: Mega+ ou Black?",
    id: "faq-planos",
    answer:
      "O melhor plano depende do seu volume de vendas, mas a comparação das taxas mostra alguns padrões interessantes.\n\nAté cerca de R$ 6 mil por mês, o Ton Black pode ter vantagem em algumas situações, principalmente dependendo da forma de pagamento escolhida.\n\nEntre R$ 6 mil e R$ 10 mil, existe uma faixa de transição: em algumas modalidades o Mega+ passa a oferecer taxas melhores, enquanto em outras o Black continua competitivo.\n\nDe R$ 10 mil até menos de R$ 20 mil por mês, o Ton Mega+ tende a levar vantagem, especialmente nas condições de recebimento em 1 dia útil.\n\nAcima de R$ 20 mil por mês, o Ton Black passa a ser muito mais competitivo e, em várias das principais condições, apresenta taxas menores que o Mega+.\n\nO Black possui ainda faixas específicas para vendas acima de R$ 20 mil, R$ 40 mil e R$ 80 mil, enquanto o Mega+ possui suas próprias faixas de crescimento.\n\nMas não existe uma resposta única: a melhor opção também depende da bandeira do cartão, do número de parcelas e de quando você quer receber.",
    type: "plan-comparison",
  },  {
    question: "Qual maquininha Ton é melhor para o meu negócio?",
    id: "faq-maquininhas",
    answer: "",
    type: "machines",
  },
  {
    question: "O que é o TapTon?",
    id: "faq-tapton",
    answer:
      "O TapTon permite utilizar um celular compatível para receber pagamentos por aproximação, transformando o próprio smartphone em uma solução de pagamento. É uma alternativa interessante para quem quer começar a vender sem depender imediatamente de uma maquininha física.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    function openFAQFromHash(smooth = true) {
      const hash = window.location.hash

      if (!hash) return

      const index = faqs.findIndex(
        (faq) => `#${faq.id}` === hash,
      )

      if (index === -1) return

      setOpenIndex(index)

      window.setTimeout(() => {
        const element = document.getElementById(
          faqs[index].id,
        )

        if (!element) return

        const headerOffset = 96
        const elementTop =
          element.getBoundingClientRect().top +
          window.scrollY

        window.scrollTo({
          top: Math.max(0, elementTop - headerOffset),
          behavior: smooth ? "smooth" : "auto",
        })
      }, 320)
    }

    function handleHashChange() {
      openFAQFromHash(true)
    }

    openFAQFromHash(false)

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  function toggleFAQ(index: number) {
    setOpenIndex((current) => {
      const next = current === index ? null : index

      if (next === null) return null

      window.setTimeout(() => {
        const element = document.getElementById(faqs[next].id)

        if (!element) return

        const headerOffset = 96
        const elementTop =
          element.getBoundingClientRect().top +
          window.scrollY

        window.scrollTo({
          top: Math.max(0, elementTop - headerOffset),
          behavior: "smooth",
        })
      }, 320)

      return next
    })
  }

  return (
    <section
      id="duvidas"
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
        {/* Cabeçalho */}
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              <CircleHelp className="size-4" />
              Tire suas dúvidas
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Perguntas{" "}
              <span className="text-primary">
                frequentes
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Reuni aqui algumas das principais dúvidas sobre as maquininhas,
              descontos e soluções da Ton.
            </p>
          </div>
        </FadeIn>

        {/* Perguntas */}
        <FadeIn delay={0.15}>
          <div className="mx-auto mt-12 max-w-3xl space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index

              return (
                <div
                  id={faq.id}
                  key={faq.question}
                  className={`scroll-mt-28 overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-primary/30 shadow-lg shadow-primary/5"
                      : "border-border shadow-sm hover:border-primary/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`hidden size-9 shrink-0 items-center justify-center rounded-xl transition-colors sm:flex ${
                          isOpen
                            ? "bg-primary text-white"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <span className="text-sm font-extrabold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </span>

                      <span className="font-semibold leading-6 text-foreground sm:text-lg">
                        {faq.question}
                      </span>
                    </span>

                    <ChevronDown
                      className={`size-5 shrink-0 text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-border px-5 py-5 sm:ml-[68px] sm:px-6">
                        {faq.type === "coupon" ? (
                          <CouponTutorial />
                        ) : faq.type === "plan-comparison" ? (
                          <>
                            <p className="whitespace-pre-line text-sm leading-7 text-muted sm:text-base">
                              {faq.answer}
                            </p>

                            <PlanComparisonCTA />
                          </>
                        ) : faq.type === "machines" ? (
                          <MachineComparison />
                        ) : faq.type === "second-machine" ? (
                          <>
                            <p className="whitespace-pre-line text-sm leading-7 text-muted sm:text-base">
                              {faq.answer}
                            </p>

                            <SecondMachineCTA />
                          </>
                        ) : (
                          <p className="whitespace-pre-line text-sm leading-7 text-muted sm:text-base">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </FadeIn>

        {/* CTA final do catálogo */}
        <FadeIn delay={0.2}>
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20">
                <BadgePercent className="size-5" />
              </div>

              <div>
                <p className="font-bold text-foreground">
                  Não esqueça do seu desconto
                </p>

                <p className="mt-1 text-sm text-muted">
                  Veja as maquininhas disponíveis e aproveite meu cupom de 20% OFF.
                </p>
              </div>
            </div>

            <TrackedLink
              href={siteConfig.links.catalog}
              target="_blank"
              rel="noopener noreferrer"
              celebration
              tracking={{
                event: "cta_click",
                location: "faq_coupon",
                destination: "catalog",
                label: "Ver maquininhas com 20% de desconto",
                conversionStrength: "medium",
              }}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/30 sm:w-auto"
            >
              20% OFF Aqui

              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </TrackedLink>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

function SecondMachineCTA() {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.04] p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20">
          <BadgeCheck className="size-5" />
        </div>

        <div>
          <p className="text-sm font-black text-foreground">
            Garanta uma segunda opção para o seu negócio
          </p>

          <p className="mt-1 text-sm leading-6 text-muted">
            Aproveite meu desconto e tenha uma máquina Ton como alternativa
            para continuar vendendo quando precisar.
          </p>
        </div>
      </div>

      <TrackedLink
        href={siteConfig.links.catalog}
        target="_blank"
        rel="noopener noreferrer"
        celebration
        tracking={{
          event: "machine_click",
          location: "faq_redundancy",
          destination: "catalog",
          label: "Quero uma segunda máquina Ton com 20% de desconto",
          product: "ton",
          conversionStrength: "strong",
        }}
        className="
          group relative mt-4 flex w-full
          items-center justify-center
          gap-2 overflow-hidden rounded-xl
          bg-primary px-4 py-3.5
          text-sm font-extrabold text-white
          shadow-lg shadow-primary/20
          transition-all duration-300
          hover:-translate-y-0.5
          hover:bg-primary-dark
          hover:shadow-xl hover:shadow-primary/30
          active:translate-y-0
        "
      >
        <span
          className="
            pointer-events-none absolute inset-y-0
            -left-1/3 w-1/3
            -skew-x-12
            bg-white/15
            transition-transform duration-700
            group-hover:translate-x-[430%]
          "
          aria-hidden="true"
        />

        <span className="relative z-10">
          Quero minha segunda máquina com 20% OFF
        </span>

        <ArrowRight
          className="
            relative z-10 size-4
            transition-transform duration-300
            group-hover:translate-x-1
          "
        />
      </TrackedLink>
    </div>
  )
}

function MachineComparison() {
  const machines = [
    {
      name: "T1",
      title: "Para quem está começando",
      description:
        "Compacta, simples e acessível. É a opção mais básica da linha e funciona conectada ao celular por Bluetooth.",
      idealFor:
        "Ideal para baixo volume de vendas, vendas sazonais e quem quer uma maquininha pequena para começar.",
      features: [
        { icon: Smartphone, text: "Conecta ao celular por Bluetooth" },
        { icon: BatteryCharging, text: "Bateria de até 4 horas" },
        { icon: Zap, text: "Pagamento por aproximação (NFC)" },
        { icon: CreditCard, text: "Parcelamento em até 12x" },
      ],
      product: "t1",
      href: siteConfig.links.machines.t1,
    },
    {
      name: "T2",
      title: "Mobilidade sem depender do celular",
      description:
        "Compacta, mas já funciona de forma independente com chip e Wi-Fi, ideal para quem vende em movimento.",
      idealFor:
        "Boa escolha para delivery, autônomos, feirantes, taxistas e quem precisa levar a maquininha para qualquer lugar.",
      features: [
        { icon: Wifi, text: "Chip 3G + Wi-Fi" },
        { icon: BatteryCharging, text: "Bateria de até 6 horas" },
        { icon: Zap, text: "NFC e Pix na própria máquina" },
        { icon: CreditCard, text: "Parcelamento em até 12x" },
      ],
      product: "t2",
      href: siteConfig.links.machines.t2,
    },
    {
      name: "T3",
      title: "Para quem precisa imprimir comprovante",
      description:
        "Mais robusta e com bobina integrada, combina conexão própria com a praticidade do comprovante impresso.",
      idealFor:
        "Excelente para lojas e negócios que já têm um volume maior de vendas e querem entregar o comprovante impresso.",
      features: [
        { icon: Wifi, text: "Chip 3G + Wi-Fi" },
        { icon: Printer, text: "Comprovante impresso ou SMS" },
        { icon: Zap, text: "NFC e Pix na própria máquina" },
        { icon: CreditCard, text: "Parcelamento em até 21x" },
      ],
      product: "t3",
      href: siteConfig.links.machines.t3,
    },
    {
      name: "T3 Smart",
      title: "A mais completa da linha",
      description:
        "É a opção mais avançada: Android, tela touchscreen, conexão 4G + Wi-Fi e bateria de longa duração.",
      idealFor:
        "Indicada para lojas e negócios com fluxo maior, que querem mais agilidade, autonomia e uma experiência mais completa.",
      features: [
        { icon: Smartphone, text: "Android com tela touchscreen" },
        { icon: Wifi, text: "Chip 4G + Wi-Fi" },
        { icon: BatteryCharging, text: "Bateria de longa duração, até 12h" },
        { icon: CreditCard, text: "Parcelamento em até 21x" },
      ],
      product: "t3_smart",
      href: siteConfig.links.machines.t3Smart,
    },
  ]

  return (
    <div>
      <p className="text-sm leading-7 text-muted sm:text-base">
        Não existe uma única maquininha melhor para todo mundo. A escolha
        depende do seu volume de vendas, de onde você trabalha e dos recursos
        que realmente fazem diferença no seu dia a dia.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {machines.map((machine) => (
          <div
            key={machine.name}
            className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
          >
            <div className="border-b border-border bg-zinc-50 px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                    Ton {machine.name}
                  </p>
                  <h4 className="mt-1 text-base font-black text-foreground">
                    {machine.title}
                  </h4>
                </div>

                {machine.name === "T3 Smart" && (
                  <span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-white">
                    Mais completa
                  </span>
                )}
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm leading-6 text-muted">
                {machine.description}
              </p>

              <div className="mt-4 grid gap-2">
                {machine.features.map(({ icon: Icon, text: feature }) => (
                  <div
                    key={feature}
                    className="flex items-start gap-2.5 rounded-xl bg-zinc-50 px-3 py-2.5"
                  >
                    <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-xs font-semibold leading-5 text-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-primary/15 bg-primary/5 px-3 py-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Para quem faz sentido
                </p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  {machine.idealFor}
                </p>
              </div>

              <TrackedLink
                href={machine.href}
                target="_blank"
                rel="noopener noreferrer"
                tracking={{
                  event: "machine_click",
                  location: "faq_machines",
                  destination: "checkout",
                  label: `Pedir ${machine.name}`,
                  product: machine.product,
                  conversionStrength: "strong",
                }}
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
              >
                Pedir {machine.name}

                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </TrackedLink>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4">
        <p className="text-sm font-bold text-foreground">
          Ainda está em dúvida?
        </p>

        <p className="mt-1 text-sm leading-6 text-muted">
          A T3 Smart é a opção mais completa, mas isso não significa que seja
          a melhor compra para todo negócio. Compare o equipamento com o seu
          volume de vendas e escolha pelo que você realmente precisa.
        </p>

        <a
          href="#calculadora"
          className="group mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-primary"
        >
          Comparar taxas na calculadora
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  )
}

function PlanComparisonCTA() {
  return (
    <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/5 p-4">
      <p className="text-sm font-bold text-foreground">
        Quer descobrir qual plano fica melhor para o seu negócio?
      </p>

      <p className="mt-1 text-sm leading-6 text-muted">
        Compare os dois na nossa calculadora e veja quanto realmente entra na sua conta.
      </p>

      <a
        href="#calculadora"
        className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 sm:w-auto"
      >
        Comparar Mega+ e Black na calculadora

        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </div>
  )
}

function CouponTutorial() {
  return (
    <div>
      {/* Introdução */}
      <p className="text-sm leading-7 text-muted sm:text-base">
        É muito simples verificar se o seu desconto foi aplicado. Antes de
        finalizar a compra, confira o resumo do pedido seguindo os passos
        abaixo.
      </p>

      {/* Passo 1 */}
      <div className="mt-6">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-extrabold text-white">
            1
          </div>

          <div>
            <h4 className="font-bold text-foreground">
              Confira se o desconto está aplicado
            </h4>

            <p className="mt-1 text-sm leading-6 text-muted">
              Ao acessar a página de compra pelos meus links, confira o resumo
              do pedido. O desconto deverá aparecer sinalizado no lado direito
              da página.
            </p>
          </div>
        </div>

        {/* Print 1 */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-zinc-50 p-2 shadow-sm">
          <Image
            src="/images/faq/cupom-aplicado.jpg"
            alt="Exemplo mostrando o desconto aplicado na página de compra da Ton"
            width={1400}
            height={900}
            className="h-auto w-full rounded-xl object-contain"
          />
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
          <BadgeCheck className="size-5 shrink-0 text-primary" />

          <p className="text-sm font-semibold text-foreground">
            Se o desconto estiver aparecendo no resumo, ele já foi aplicado.
          </p>
        </div>
      </div>

      {/* Separador */}
      <div className="my-7 border-t border-dashed border-border" />

      {/* Passo 2 */}
      <div>
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-sm font-extrabold text-white">
            2
          </div>

          <div>
            <h4 className="font-bold text-foreground">
              O desconto não apareceu?
            </h4>

            <p className="mt-1 text-sm leading-6 text-muted">
              Sem problema. Você pode inserir o meu cupom manualmente no campo
              destinado ao cupom de desconto e clicar em{" "}
              <strong className="text-foreground">
                Ativar
              </strong>
              .
            </p>
          </div>
        </div>

        {/* Cupom */}
        <div className="mt-4 rounded-2xl border border-orange-500/30 bg-orange-500/5 p-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Não apareceu? Copie meu cupom
              </p>

              <p className="mt-1 text-sm text-muted">
                Clique no cupom e depois cole no checkout.
              </p>
            </div>

            <CouponCopy
              variant="orange"
              location="faq_activation"
            />
          </div>
        </div>

        {/* Print 2 */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-zinc-50 p-2 shadow-sm">
          <Image
            src="/images/faq/cupom-ativar.jpg"
            alt="Exemplo mostrando onde inserir e ativar o cupom na página da Ton"
            width={1400}
            height={900}
            className="h-auto w-full rounded-xl object-contain"
          />
        </div>

        {/* Confirmação final */}
        <div className="mt-4 rounded-2xl bg-zinc-50 p-4">
          <p className="text-sm font-semibold leading-6 text-foreground">
            Depois de clicar em{" "}
            <span className="text-primary">
              Ativar
            </span>
            , confira novamente o resumo do pedido e o valor final antes de
            concluir a compra.
          </p>
        </div>
      </div>
    </div>
  )
}