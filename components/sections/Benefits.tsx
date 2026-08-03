import {
  BadgePercent,
  Infinity,
  PackageCheck,
  WalletCards,
} from "lucide-react"

import { Container } from "@/components/shared/Container"
import { FadeIn } from "@/components/shared/FadeIn"

const benefits = [
  {
    title: "Garantia vitalícia",
    description: "Trocas e manutenção grátis para você vender com tranquilidade.",
    icon: Infinity,
    featured: true,
  },
  {
    title: "Frete grátis",
    description: "Receba sua maquininha sem custo de entrega em todo o Brasil.",
    icon: PackageCheck,
    featured: true,
  },
  {
    title: "Sem aluguel",
    description: "Sua maquininha sem mensalidade de aluguel.",
    icon: WalletCards,
    featured: false,
  },
  {
    title: "Cupom exclusivo",
    description: "Desconto adicional comprando pelo consultor.",
    icon: BadgePercent,
    featured: false,
  },
]

export function Benefits() {
  return (
    <section className="border-y border-border bg-white">
      <Container>
        <FadeIn>
          <div className="grid divide-y divide-border py-3 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon

              return (
                <div
                  key={benefit.title}
                  className="group flex items-center gap-4 px-4 py-6 sm:px-6 lg:px-5"
                >
                  <div
  className={[
    "flex shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:-translate-y-1",
    benefit.featured
      ? "size-12 bg-primary text-white shadow-lg shadow-primary/20"
      : "size-11 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
  ].join(" ")}
>
  <Icon className={benefit.featured ? "size-6" : "size-5"} />
</div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
  <h3
    className={[
      "font-bold",
      benefit.featured
        ? "text-base text-primary sm:text-lg"
        : "text-sm text-foreground sm:text-base",
    ].join(" ")}
  >
    {benefit.title}
  </h3>

  {benefit.featured && (
    <span className="shrink-0 rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-600">
      Destaque
    </span>
  )}
</div>

                    <p className="mt-1 text-xs leading-5 text-muted">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}