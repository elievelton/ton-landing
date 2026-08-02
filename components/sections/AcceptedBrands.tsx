"use client"

import { motion } from "framer-motion"

import { Container } from "@/components/shared/Container"
import { FadeIn } from "@/components/shared/FadeIn"
import { acceptedBrands } from "@/config/brands"
import Image from "next/image"

const carouselBrands = [
  ...acceptedBrands,
  ...acceptedBrands,
]

export function AcceptedBrands() {
  return (
    <section className="overflow-hidden border-y border-border bg-white py-16 sm:py-20">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Mais possibilidades para vender
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Aceite mais de 50 bandeiras
            </h2>

            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
              Receba pagamentos no débito, crédito e vouchers com as
              maquininhas T2, T3 e T3 Smart.
            </p>
          </div>
        </FadeIn>
      </Container>

      {/* Esteira de bandeiras */}
      <FadeIn delay={0.15}>
        <div className="relative mt-12">
          {/* Degradês laterais */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-white to-transparent sm:w-40"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-white to-transparent sm:w-40"
            aria-hidden="true"
          />

          <motion.div
            className="flex w-max gap-4"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {carouselBrands.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="flex h-20 w-40 shrink-0 items-center justify-center rounded-2xl border border-border bg-white px-5 shadow-sm"
              >
                <Image
  src={brand.image}
  alt={`Bandeira ${brand.name}`}
  width={100}
  height={48}
  className="h-10 w-auto object-contain"
/>
              </div>
            ))}
          </motion.div>
        </div>
      </FadeIn>

      {/* Observação */}
      <Container>
        <FadeIn delay={0.2}>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-muted">
            * Alelo, Pluxee, Ticket, Up Brasil e VR são aceitas somente em
            cadastros com CNPJ.
          </p>
        </FadeIn>
      </Container>
    </section>
  )
}