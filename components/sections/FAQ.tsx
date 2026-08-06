"use client"

import { useState } from "react"
import Image from "next/image"
import {
  BadgeCheck,
  BadgePercent,
  ChevronDown,
  CircleHelp,
} from "lucide-react"

import { Container } from "@/components/shared/Container"
import { FadeIn } from "@/components/shared/FadeIn"
import { siteConfig } from "@/config/site"
import { CouponCopy } from "@/components/shared/CouponCopy"

const faqs = [
  {
    question: "É seguro comprar nesse site?",
    answer: "Sim, é 100% seguro. Este site é uma página oficial de indicação de um Parceiro Autorizado Ton.\nFunciona assim: nós apenas distribuímos cupons com 20% de desconto extra para a sua compra sair bem mais barata. Nada relacionado a pagamentos acontece neste site, e nós não solicitamos nem armazenamos seus dados financeiros.\nAo clicar em qualquer botão com desconto deste site, você será redirecionado automaticamente para o site oficial da Ton. O cupom de desconto é aplicado de forma automática, e toda a parte de pagamento, emissão de nota fiscal, garantia de fábrica e envio é feita diretamente pela Ton (do Grupo Stone).\nVocê garante o seu desconto exclusivo aqui, mas conclui a sua compra com total segurança dentro do ambiente oficial da Ton!",
  },
  {
    question: "Preciso ter CNPJ para comprar uma maquininha Ton?",
    answer:
      "Não. Existem opções para quem vende como pessoa física e também para quem possui CNPJ. Algumas bandeiras e benefícios específicos podem depender do tipo de cadastro.",
  },
  {
    question: "Estou com nome sujo posso comprar uma maquininha?",
    answer:
      "Sim, a empresa Ton não faz consulta para saber o estado do seu nome, pode comprar com tranquilidade "
    },
    {
    question: "Preciso ter conta para comprar uma maquininha?",
    answer:"Não. Ao adquirir uma maquininha Ton, você recebe automaticamente uma conta digital no aplicativo Ton. Suas vendas caem diretamente nela, sem a necessidade de vincular outro banco. Pelo app, você pode transferir dinheiro, investir e aproveitar todo o ecossistema completo da Ton."
    },
  {
    question: "As maquininhas Ton têm mensalidade?",
    answer:
      "Não, as maquininhas Ton são sem mensalidades, você só vai pagar quando ultilizar ela e pequenas taxas de acordo com o plano que escolheu no ato da compra",
  },
  {
    question: "Como funciona o desconto adicional de 20%?",
    answer: `Primeiro é aplicado o preço promocional disponibilizado pela Ton. Depois, nas condições aplicáveis, você ainda pode utilizar meu cupom ${siteConfig.coupon} para obter 20% de desconto adicional. Ou seja: o segundo desconto é aplicado sobre o valor que já está com a promoção da Ton.`,
  },
  {
    question: "Como saber se meu cupom de 20% foi aplicado?",
    answer: "",
    type: "coupon",
  },
  {
    question: "A garantia das maquininhas é vitalícia?",
    answer:
      "A Ton oferece garantia vitalícia para as maquininhas elegíveis, conforme as regras e condições da empresa. Isso significa mais tranquilidade para quem pretende utilizar a máquina por bastante tempo.",
  },
  {
    question: "O frete é grátis?",
    answer:
      "A Ton oferece frete grátis nas condições divulgadas para a aquisição das maquininhas. As condições finais de entrega e disponibilidade podem ser consultadas no momento da compra.",
  },
  {
    question: "Quando recebo o dinheiro das minhas vendas?",
    answer:
      "Vai depender do plano que você escolher no ato da compra, mas em regra você recebe seus pagamento com 1 dia útil, mesmo que você parcele em 12x o dinheiro cai em sua conta em 1 dia útil",
  },
  {
    question: "Qual maquininha Ton é melhor para o meu negócio?",
    answer:
      "Depende do seu volume de vendas e da forma como você trabalha. A T1 é uma opção mais simples e compacta, enquanto T2, T3 e T3 Smart oferecem recursos adicionais. A T3 Smart é a opção mais completa para quem busca uma experiência mais robusta no ponto de venda.",
  },
  {
    question: "O que é o TapTon?",
    answer:
      "O TapTon permite utilizar um celular compatível para receber pagamentos por aproximação, transformando o próprio smartphone em uma solução de pagamento. É uma alternativa interessante para quem quer começar a vender sem depender imediatamente de uma maquininha física.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  function toggleFAQ(index: number) {
    setOpenIndex((current) => (current === index ? null : index))
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
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
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
                        ) : (
                          <p className="text-sm leading-7 text-muted sm:text-base">
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

        {/* Destaque do cupom */}
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
                  Utilize meu cupom nas condições aplicáveis.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 sm:items-end">
  <span className="text-xs font-semibold text-muted">
    Clique para copiar
  </span>

  <CouponCopy
  variant="orange"
  location="faq_coupon"
/>
</div>
          </div>
        </FadeIn>
      </Container>
    </section>
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