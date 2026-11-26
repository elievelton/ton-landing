import { Container } from "@/components/shared/Container"
import { FadeIn } from "@/components/shared/FadeIn"
import { MachineCard } from "@/components/shared/MachineCard"
import { machines } from "@/config/machines"

import { ShieldCheck, Sparkles } from "lucide-react"

export function Machines({ couponPercent }: { couponPercent: number }) {
  const megaMachines = machines.filter((machine) => machine.plan === "mega")
  const topMachines = machines.filter((machine) => machine.plan === "top")
  const couponPercent = getCouponPercentLabel()

  return (
    <section id="maquinas" className="relative bg-background py-20 sm:py-24 lg:py-28">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-500">Escolha sua maquininha</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Uma Ton para cada tipo de negócio
            </h2>
            <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
              Compare os modelos e encontre a maquininha que combina melhor com a sua rotina de vendas.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold text-orange-600">
              <Sparkles className="size-3.5 text-orange-500" />
              <span>Use meu cupom e ganhe mais {couponPercent}% de desconto nas ofertas aplicáveis.</span>
            </div>
          </div>
        </FadeIn>

        <div className="mt-14">
          <FadeIn>
            <div className="mb-7">
              <h3 className="text-2xl font-extrabold text-foreground sm:text-3xl">Plano Ton Mega+</h3>
              <p className="mt-2 text-sm text-muted">Opções para diferentes necessidades e volumes de venda.</p>
            </div>
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {megaMachines.map((machine, index) => (
              <FadeIn key={machine.id} delay={index * 0.06} className="h-full">
                <MachineCard machine={machine} couponPercent={couponPercent} />
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <FadeIn>
            <div className="mb-7">
              <h3 className="text-2xl font-extrabold text-foreground sm:text-3xl">Plano Ton Top</h3>
              <p className="mt-2 text-sm text-muted">
                Plano exclusivo para CNPJ. Consulte as condições de elegibilidade no catálogo oficial da Ton.
              </p>
            </div>
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
            {topMachines.map((machine, index) => (
              <FadeIn key={machine.id} delay={index * 0.06} className="h-full">
                <MachineCard machine={machine} />
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted">
          <ShieldCheck className="size-4 shrink-0 text-orange-500" />
          <span>
            Ambiente 100% seguro. Você será direcionado ao catálogo oficial da <strong className="text-foreground">Ton (Grupo Stone)</strong> para escolher o plano e finalizar a compra.
          </span>
        </div>

        <FadeIn delay={0.2}>
          <div className="mx-auto mt-12 max-w-2xl text-center">
            <p className="text-sm leading-6 text-muted">
              Não sabe qual escolher? Continue na página e veja as diferenças entre os planos e as opções disponíveis para o seu negócio.
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
