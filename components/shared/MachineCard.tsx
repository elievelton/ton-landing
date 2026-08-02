import {
  Check,
  CreditCard,
  Sparkles,
} from "lucide-react"

import type { Machine } from "@/config/machines"

import { Button } from "@/components/ui/button"

type MachineCardProps = {
  machine: Machine
}

export function MachineCard({
  machine,
}: MachineCardProps) {
  return (
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border bg-white p-6 transition-all duration-300",
        machine.featured
          ? "border-primary/30 shadow-premium"
          : "border-border shadow-sm hover:-translate-y-1 hover:shadow-lg",
      ].join(" ")}
    >
      {/* Destaque */}
      {machine.featured && (
        <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white">
          <Sparkles className="size-3.5" />
          Destaque
        </div>
      )}

      {/* Área da imagem */}
      <div className="relative mb-6 flex min-h-[260px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-primary/5">
        <div
          className="absolute size-40 rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col items-center text-center">
          <CreditCard className="size-16 text-primary" />

          <span className="mt-4 text-sm font-medium text-muted">
            Imagem da {machine.name}
          </span>
        </div>
      </div>

      {/* Informações */}
      <div className="flex flex-1 flex-col">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            {machine.name}
          </h3>

          <p className="mt-3 min-h-[72px] text-sm leading-6 text-muted">
            {machine.description}
          </p>
        </div>

        {/* Características */}
        <ul className="mt-6 space-y-3">
          {machine.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-foreground/80"
            >
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Check className="size-3 text-primary" />
              </span>

              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto pt-8">
          <Button
            variant={machine.featured ? "default" : "outline"}
            size="lg"
            className="h-11 w-full"
          >
            Ver opções da {machine.name}
          </Button>
        </div>
      </div>
    </article>
  )
}