import Image from "next/image"
import { Check, Flame, Sparkles } from "lucide-react"

import { TrackedLink } from "@/components/shared/TrackedLink"
import { Button } from "@/components/ui/button"
import type { Machine } from "@/config/machines"
import { siteConfig } from "@/config/site"

type MachineCardProps = {
  machine: Machine
}

export function MachineCard({ machine }: MachineCardProps) {
  const isBestSeller = machine.bestSeller === true

  const machineLinks = {
    "t3-smart": siteConfig.links.machines.t3Smart,
    t3: siteConfig.links.machines.t3,
    t2: siteConfig.links.machines.t2,
    t1: siteConfig.links.machines.t1,
  }

  const machineUrl =
    machineLinks[machine.id as keyof typeof machineLinks]

  return (
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border bg-white p-6 transition-all duration-500",

        isBestSeller
          ? "border-orange-500 shadow-[0_20px_60px_rgba(34,197,94,0.18)] hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(34,197,94,0.28)]"
          : machine.featured
            ? "border-primary/30 shadow-premium hover:-translate-y-1"
            : "border-border shadow-sm hover:-translate-y-1 hover:shadow-lg",
      ].join(" ")}
    >
      {/* Glow especial da T3 Smart */}
      {isBestSeller && (
        <>
          <div
            className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-primary/20 blur-3xl transition-all duration-700 group-hover:bg-primary/30"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -bottom-24 -left-24 size-52 rounded-full bg-primary/10 blur-3xl"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent"
            aria-hidden="true"
          />
        </>
      )}

      {/* Badges */}
      <div className="relative z-10 mb-5 flex min-h-8 items-center justify-between gap-3">
        {isBestSeller ? (
          <>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-orange-500/20">
              <Flame className="size-3.5" />
              {machine.badge}
            </div>

            {machine.discount && (
              <div className="relative">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />

                <span className="relative inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-extrabold text-primary">
                  {machine.discount}
                </span>
              </div>
            )}
          </>
        ) : machine.featured ? (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            Destaque
          </div>
        ) : (
          <div />
        )}
      </div>

      {/* Imagem da máquina */}
      <div
        className={[
          "relative mb-6 flex min-h-[260px] items-center justify-center overflow-hidden rounded-[1.5rem] p-6 transition-colors duration-500",
          isBestSeller
            ? "bg-linear-to-br from-primary/10 via-primary/5 to-white"
            : "bg-primary/5",
        ].join(" ")}
      >
        <div
          className={[
            "absolute rounded-full blur-3xl transition-all duration-700",
            isBestSeller
              ? "size-56 bg-primary/20 group-hover:scale-125 group-hover:bg-primary/25"
              : "size-48 bg-primary/10",
          ].join(" ")}
          aria-hidden="true"
        />

        <Image
          src={machine.image}
          alt={`Maquininha ${machine.name}`}
          width={320}
          height={320}
          className={[
            "relative z-1 h-[220px] w-auto object-contain transition-all duration-500",
            isBestSeller
              ? "drop-shadow-xl group-hover:-translate-y-1 group-hover:scale-110"
              : "group-hover:scale-105",
          ].join(" ")}
        />
      </div>

      {/* Informações */}
      <div className="relative z-10 flex flex-1 flex-col">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              {machine.name}
            </h3>

            {isBestSeller && (
              <Sparkles
                className="size-5 text-primary"
                aria-hidden="true"
              />
            )}
          </div>

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
              <span
                className={[
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                  isBestSeller
                    ? "bg-primary text-white"
                    : "bg-primary/10",
                ].join(" ")}
              >
                <Check
                  className={[
                    "size-3",
                    isBestSeller ? "text-white" : "text-primary",
                  ].join(" ")}
                />
              </span>

              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto pt-8">
          <TrackedLink
            href={machineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            tracking={{
              event: "machine_click",
              location: "machines",
              destination: "checkout",
              label: isBestSeller
                ? "Ver oferta da T3 Smart"
                : `Ver opções da ${machine.name}`,
              product: machine.id,
            }}
          >
            <Button
              variant={machine.featured ? "default" : "outline"}
              size="lg"
              className={[
                "h-11 w-full transition-all duration-300",
                isBestSeller
                  ? "shadow-lg shadow-primary/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                  : "",
              ].join(" ")}
            >
              {isBestSeller
                ? "Ver oferta da T3 Smart"
                : `Ver opções da ${machine.name}`}
            </Button>
          </TrackedLink>

          {isBestSeller && (
            <p className="mt-3 text-center text-xs font-medium text-primary">
              Oferta em destaque
            </p>
          )}
        </div>
      </div>
    </article>
  )
}