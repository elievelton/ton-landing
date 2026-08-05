"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  AlertCircle,
  ArrowLeft,
  TicketPercent,
  CheckCircle2,
  Loader2,
} from "lucide-react"

import { TrackedLink } from "@/components/shared/TrackedLink"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"



export default function NotFound() {
  const [redirecting, setRedirecting] = useState(false)
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 py-20">

      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#22c55e08,transparent_55%)]" />

      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-14 lg:flex-row">

        {/* Imagem */}

        <motion.div
          initial={{
            opacity: 0,
            scale: .8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0],
          }}
          transition={{
            duration: .8,
            y: {
              duration: 3,
              repeat: Infinity,
            },
          }}
          className="order-1 relative lg:order-2"
          
        >
            {/* Marca d'água 404 */}

<div
  className="
    pointer-events-none
    absolute
    inset-0
    flex
    items-center
    justify-center
    select-none
    z-0
  "
>
  <span
    className="
      text-[10rem]
      font-black
      leading-none
      tracking-tight
      text-primary/5
      lg:text-[22rem]
    "
  >
    404
  </span>
</div>
          {/* Selo */}

          <div className="absolute -right-8 -top-8 z-20 rotate-12 rounded-full bg-primary px-7 py-5 text-center shadow-2xl animate-pulse">

            <p className="text-xs font-semibold tracking-widest text-white">
              ATÉ
            </p>

            <p className="text-4xl font-black text-white">
              72%
            </p>

            <p className="text-xs font-semibold tracking-widest text-white">
              OFF
            </p>

          </div>

          <Image
            src="/images/machines/t3-smart.webp"
            alt="Maquininha Ton T3 Smart"
            width={470}
            height={470}
            priority
            className="relative z-10 drop-shadow-[0_30px_45px_rgba(0,0,0,.18)]"
          />
        </motion.div>

        {/* Conteúdo */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: .6,
          }}
          className="order-2 max-w-xl lg:order-1"
        >

          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-red-600">

            <AlertCircle className="size-5" />

            <span className="font-semibold">
              Erro 404
            </span>

          </div>
                    <h1 className="text-5xl font-black leading-tight tracking-tight text-gray-900 sm:text-6xl">
  Oops!

  <br />

  Você não encontrou a página...

  <br />

  <span className="text-primary">
    Mas encontrou o melhor desconto da Ton. 💚
  </span>
</h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            A página que você procurava não existe.

            <br />

            Mas seus descontos exclusivos continuam disponíveis e
            podem economizar até <strong>72%</strong> na compra da sua
            próxima maquininha.
          </p>

          {/* Card de Oferta */}

          <div className="mt-10 rounded-3xl border border-primary/20 bg-primary/5 p-7">

            <div className="mb-5 flex items-center gap-3">

              <TicketPercent className="size-8 text-primary" />

              <div>

                <h2 className="text-2xl font-bold text-primary">
                  Aproveite enquanto a oferta está disponível
                </h2>

                <p className="text-sm text-muted-foreground">
                  Descontos exclusivos para novos clientes Ton.
                </p>

              </div>

            </div>

            <ul className="space-y-4">

              <li className="flex items-center gap-3">

                <CheckCircle2 className="size-5 text-primary" />

                <span className="font-medium">
                  Até <strong>72% OFF</strong> nas maquininhas
                </span>

              </li>

              <li className="flex items-center gap-3">

                <CheckCircle2 className="size-5 text-primary" />

                <span className="font-medium">
                  Frete Grátis para todo o Brasil
                </span>

              </li>

              <li className="flex items-center gap-3">

                <CheckCircle2 className="size-5 text-primary" />

                <span className="font-medium">
                  Internet Grátis
                </span>

              </li>

              <li className="flex items-center gap-3">

                <CheckCircle2 className="size-5 text-primary" />

                <span className="font-medium">
                  Garantia Vitalícia. Quebrou? A Ton troca.
                </span>

              </li>

            </ul>

          </div>
                    {/* Botões */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <TrackedLink
  href={siteConfig.links.catalog}
  target="_blank"
  rel="noopener noreferrer"
  celebration
  onClick={() => setRedirecting(true)}
  tracking={{
    event: "404_discount_click",
    location: "404",
    destination: "catalog",
    label: "404_hero_cta",
    conversionStrength: "medium",
  }}
>
              <Button
  size="lg"
  disabled={redirecting}
  className="h-12 w-full px-8 text-base shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-100 sm:w-auto"
>
  {redirecting ? (
    <>
      <Loader2 className="mr-2 size-4 animate-spin" />
      🎉 Abrindo seu desconto...
    </>
  ) : (
    <>🎟️ PEGAR MEU CUPOM</>
  )}
</Button>
            </TrackedLink>

            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8"
              >
                <ArrowLeft className="mr-2 size-4" />
                Ir para a página inicial
              </Button>
            </Link>

          </div>

          <p className="mt-8 text-sm leading-6 text-muted-foreground">

            A página que você procurava não existe.

            <br />

            <span className="font-semibold text-primary">
              Mas seu desconto continua esperando por você. 💚
            </span>

          </p>

        </motion.div>
              </div>

    </main>
  )
}