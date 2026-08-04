"use client"

import type {
  AnchorHTMLAttributes,
  MouseEvent,
  ReactNode,
} from "react"

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
 *
 * Importante:
 * "strong" representa intenção de compra e não significa
 * que a venda foi efetivamente concluída.
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

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  tracking: TrackingParams
}

const socialProofMessages = [
  "Um visitante decidiu pagar menos taxas 💚",
  "Alguém acabou de conferir as ofertas da Ton 🔥",
  "Um visitante está comparando as maquininhas Ton 💳",
  "Mais um empreendedor está conhecendo uma nova forma de vender 🚀",
]

function getSocialProofMessage() {
  const randomIndex = Math.floor(
    Math.random() * socialProofMessages.length
  )

  return socialProofMessages[randomIndex]
}

export function TrackedLink({
  children,
  tracking,
  onClick,
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
     * Mantém o evento disponível no dataLayer
     * para futura integração com GTM / Google Ads.
     */
    window.dataLayer = window.dataLayer || []

    window.dataLayer.push({
      event: tracking.event,
      ...eventData,
    })

    /*
     * Envia o evento diretamente para o GA4.
     */
    window.gtag?.(
      "event",
      tracking.event,
      eventData
    )

    /*
     * Dispara a prova social.
     */
    window.dispatchEvent(
      new CustomEvent("social-proof", {
        detail: {
          message: getSocialProofMessage(),
        },
      })
    )

    /*
     * Preserva qualquer onClick recebido
     * pelo componente.
     */
    onClick?.(event)
  }

  return (
    <a
      {...props}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}