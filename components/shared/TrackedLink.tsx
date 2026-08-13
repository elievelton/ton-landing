"use client"

import type {
  AnchorHTMLAttributes,
  MouseEvent,
  ReactNode,
} from "react"

import confetti from "canvas-confetti"

/*
 * Nível de intenção comercial do clique:
 *
 * weak   → Conversão fraca:
 *          cliques informativos, como planos, taxas,
 *          TapTon e outras informações do site.
 *
 * medium → Conversão média:
 *          cliques que levam ao catálogo de maquininhas,
 *          demonstrando interesse em conhecer as ofertas.
 *
 * strong → Conversão forte:
 *          cliques que levam diretamente ao carrinho/checkout
 *          de uma maquininha específica, indicando alta
 *          intenção de compra.
 */

type ConversionStrength = "weak" | "medium" | "strong"

type TrackingParams = {
  event: string
  location: string
  destination: string
  label?: string
  product?: string
  conversionStrength?: ConversionStrength
}

type TrackedLinkProps =
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode
    tracking: TrackingParams
    celebration?: boolean
  }

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]

    gtag?: (
      command: string,
      eventName: string,
      eventData?: Record<string, unknown>
    ) => void

    uetq?: {
      push: (...args: unknown[]) => void
    }
  }
}

const socialProofMessages = [
  "Um visitante decidiu pagar menos taxas 💚",
  "Alguém acabou de conferir as ofertas da Ton 🔥",
  "Um visitante está comparando as maquininhas Ton 💳",
  "Mais um empreendedor está conhecendo uma nova forma de vender 🚀",
]

function getSocialProofMessage() {
  return socialProofMessages[
    Math.floor(Math.random() * socialProofMessages.length)
  ]
}

export function TrackedLink({
  children,
  tracking,
  celebration = false,
  onClick,
  href,
  target,
  rel,
  ...props
}: TrackedLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const eventData = {
      event_location: tracking.location,
      event_destination: tracking.destination,
      event_label: tracking.label,
      product: tracking.product,
      conversion_strength: tracking.conversionStrength,
    }

    /*
     * ============================================================
     * DATA LAYER / GTM
     * ============================================================
     */

    window.dataLayer = window.dataLayer || []

    window.dataLayer.push({
      event: tracking.event,
      ...eventData,
    })

    /*
     * ============================================================
     * GOOGLE ANALYTICS 4
     * ============================================================
     */

    window.gtag?.(
      "event",
      tracking.event,
      eventData
    )

    /*
     * ============================================================
     * MICROSOFT UET
     * ============================================================
     *
     * Só envia o evento se a UET estiver carregada.
     *
     * strong → add_to_cart_intent
     * promotion_click → promotion_click
     * whatsapp_click → whatsapp_click
     */

    if (window.uetq) {
      /*
       * Conversão forte:
       * intenção de compra da maquininha
       */

      if (
        tracking.conversionStrength === "strong"
      ) {
        window.uetq.push(
          "event",
          "add_to_cart_intent",
          {
            event_category: "conversion",
            event_label:
              tracking.product ??
              tracking.label ??
              "maquininha_ton",
          }
        )
      }

      /*
       * Clique na promoção
       */

      if (
        tracking.event === "promotion_click"
      ) {
        window.uetq.push(
          "event",
          "promotion_click",
          {
            event_category: "conversion",
            event_label:
              tracking.label ??
              "promotion_click",
          }
        )
      }

      /*
       * Clique no WhatsApp
       */

      if (
        tracking.event === "whatsapp_click"
      ) {
        window.uetq.push(
          "event",
          "whatsapp_click",
          {
            event_category: "conversion",
            event_label:
              tracking.label ??
              "whatsapp_click",
          }
        )
      }
    }

    /*
     * ============================================================
     * PROVA SOCIAL
     * ============================================================
     */

    window.dispatchEvent(
      new CustomEvent("social-proof", {
        detail: {
          message: getSocialProofMessage(),
        },
      })
    )

    /*
     * Mantém o onClick original.
     */

    onClick?.(event)

    /*
     * ============================================================
     * CELEBRAÇÃO
     * ============================================================
     */

    if (celebration && href) {
      event.preventDefault()

      const rect =
        event.currentTarget.getBoundingClientRect()

      const originX =
        (rect.left + rect.width / 2) /
        window.innerWidth

      const originY =
        (rect.top + rect.height / 2) /
        window.innerHeight

      confetti({
        particleCount: 35,
        spread: 55,
        startVelocity: 28,
        origin: {
          x: originX,
          y: originY,
        },
        colors: [
          "#00C853",
          "#22C55E",
          "#DCFCE7",
          "#FFFFFF",
        ],
      })

      setTimeout(() => {
        if (target === "_blank") {
          window.open(
            href.toString(),
            "_blank",
            "noopener,noreferrer"
          )
        } else {
          window.location.href =
            href.toString()
        }
      }, 2700)

      return
    }
  }

  return (
    <a
      {...props}
      href={href}
      target={target}
      rel={rel}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}