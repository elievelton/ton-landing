import { Container } from "@/components/shared/Container"
import { FadeIn } from "@/components/shared/FadeIn"
import { MachineCard } from "@/components/shared/MachineCard"
import { machines } from "@/config/machines"
import {
  ShieldCheck,
  Sparkles,
} from "lucide-react"

export function Machines() {
  return (
    <section
      id="maquinas"
      className="relative bg-background py-20 sm:py-24 lg:py-28"
    >
      <Container>
        {/* Cabeçalho da seção */}
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-500">
              Escolha sua maquininha
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Uma Ton para cada tipo de negócio
            </h2>

            <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
              Compare os modelos e encontre a maquininha que combina melhor
              com a sua rotina de vendas.
            </p>

            {/* Dica de reforço do cupom em tom alaranjado */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold text-orange-600">
              <Sparkles className="size-3.5 text-orange-500" />
              <span>O cupom de 20% de desconto extra é aplicado automaticamente ao clicar nos botões de adicionar no carrinho.</span>
            </div>
          </div>
        </FadeIn>

        {/* Máquinas */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {machines.map((machine, index) => (
            <FadeIn
              key={machine.id}
              delay={index * 0.08}
              className="h-full"
            >
              <MachineCard machine={machine} />
            </FadeIn>
          ))}
        </div>

        {/* Aviso de Segurança e Direcionamento Oficial */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted">
          <ShieldCheck className="size-4 text-orange-500 shrink-0" />
          <span>
            Ambiente 100% seguro. Você será redirecionado para o site oficial da{" "}
            <strong className="text-foreground">Ton (Grupo Stone)</strong> para finalizar a compra com garantia de fábrica e frete grátis.
          </span>
        </div>

        {/* Orientação */}
        <FadeIn delay={0.2}>
          <div className="mx-auto mt-12 max-w-2xl text-center">
            <p className="text-sm leading-6 text-muted">
              Não sabe qual escolher? Continue na página e veja as diferenças
              entre os planos e as opções disponíveis para o seu negócio.
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}