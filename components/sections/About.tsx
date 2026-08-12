import {
  Award,
  CheckCircle2,
  ExternalLink,
  Mail,
  MessageCircle,
  ShieldCheck,
  Star,
} from "lucide-react"

import { Container } from "@/components/shared/Container"
import { FadeIn } from "@/components/shared/FadeIn"
import { TrackedLink } from "@/components/shared/TrackedLink"
import { siteConfig } from "@/config/site"

export function About() {
  return (
    <section
      id="quem-somos"
      className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-28"
    >
      {/* Elementos decorativos */}
      <div
        className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 bottom-0 size-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        {/* Cabeçalho */}
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Sobre o parceiro
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Compre com quem entende de Ton
            </h2>

            <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
              Meu objetivo é ajudar você a encontrar a maquininha ideal,
              entender as condições e aproveitar o melhor desconto disponível.
            </p>
          </div>
        </FadeIn>

        {/* Conteúdo principal */}
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Texto */}
          <FadeIn>
            <div>
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Award className="size-6" />
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Experiência e confiança
                  </p>

                  <h3 className="text-2xl font-bold tracking-tight text-foreground">
                    Seu desconto começa aqui
                  </h3>
                </div>
              </div>

              <div className="mt-7 space-y-5 text-base leading-7 text-muted sm:text-lg">
                <p>
                  Como parceiro de indicação Ton, eu disponibilizo links e
                  cupons exclusivos para ajudar você a economizar na compra
                  da sua maquininha.
                </p>

                <p>
                  Você escolhe o modelo que melhor atende ao seu negócio,
                  utiliza meu cupom e é direcionado para o ambiente oficial
                  da Ton para concluir sua compra com segurança.
                </p>

                <p>
                  Meu trabalho é facilitar sua decisão, mostrar as opções e
                  garantir que você tenha acesso ao melhor desconto disponível
                  através da minha indicação.
                </p>
              </div>

              {/* Pontos de confiança */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />

                  <div>
                    <p className="font-bold text-foreground">
                      Compra segura
                    </p>

                    <p className="mt-1 text-sm leading-5 text-muted">
                      Sua compra é finalizada diretamente no site oficial da
                      Ton.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />

                  <div>
                    <p className="font-bold text-foreground">
                      Cupom exclusivo
                    </p>

                    <p className="mt-1 text-sm leading-5 text-muted">
                      Desconto adicional para aproveitar uma condição ainda
                      melhor.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />

                  <div>
                    <p className="font-bold text-foreground">
                      Ambiente oficial
                    </p>

                    <p className="mt-1 text-sm leading-5 text-muted">
                      Pagamento, entrega e garantia são tratados diretamente
                      pela Ton.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Star className="mt-0.5 size-5 shrink-0 text-primary" />

                  <div>
                    <p className="font-bold text-foreground">
                      Atendimento
                    </p>

                    <p className="mt-1 text-sm leading-5 text-muted">
                      Estou disponível para ajudar você a escolher a melhor
                      opção.
                    </p>
                  </div>
                </div>
              </div>

              {/* Links de contato */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tracking={{
                    event: "whatsapp_click",
                    location: "about",
                    destination: "whatsapp",
                    label: "Tirar dúvidas no WhatsApp",
                    conversionStrength: "weak",
                  }}
                >
                  <div className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl sm:w-auto">
                    <MessageCircle className="size-4" />
                    Tirar dúvidas no WhatsApp
                  </div>
                </TrackedLink>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 text-sm font-bold text-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary sm:w-auto"
                >
                  <Mail className="size-4" />
                  Entrar em contato por e-mail
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Card de confiança */}
          <FadeIn delay={0.15}>
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-primary/20 bg-white p-7 shadow-premium sm:p-9">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                      Por que comprar pelo meu link?
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                      Mais desconto, sem complicação
                    </h3>
                  </div>

                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <ShieldCheck className="size-6" />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3 rounded-2xl bg-primary/5 p-4">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />

                    <div>
                      <p className="font-bold text-foreground">
                        Desconto adicional
                      </p>

                      <p className="mt-1 text-sm leading-5 text-muted">
                        Seu cupom pode garantir mais 20% de desconto sobre as
                        condições promocionais aplicáveis.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl bg-zinc-50 p-4">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />

                    <div>
                      <p className="font-bold text-foreground">
                        Site oficial da Ton
                      </p>

                      <p className="mt-1 text-sm leading-5 text-muted">
                        Depois de escolher sua oferta, você é direcionado para
                        o ambiente oficial da Ton para finalizar a compra.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl bg-zinc-50 p-4">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />

                    <div>
                      <p className="font-bold text-foreground">
                        Pagamento direto com a Ton
                      </p>

                      <p className="mt-1 text-sm leading-5 text-muted">
                        Não realizamos pagamentos nem armazenamos dados
                        financeiros por aqui.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-border bg-white p-5">
                  <div className="flex items-start gap-3">
                    <ExternalLink className="mt-0.5 size-5 shrink-0 text-primary" />

                    <p className="text-sm leading-6 text-muted">
                      Ao clicar em uma oferta, você será direcionado para o
                      site oficial da Ton, onde poderá conferir as condições e
                      finalizar sua compra com segurança.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}