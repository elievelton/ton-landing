import { Container } from "@/components/shared/Container"
import { FadeIn } from "@/components/shared/FadeIn"
import { MachineCard } from "@/components/shared/MachineCard"
import { machines } from "@/config/machines"

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
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Escolha sua maquininha
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Uma Ton para cada tipo de negócio
            </h2>

            <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
              Compare os modelos e encontre a maquininha que combina melhor
              com a sua rotina de vendas.
            </p>
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