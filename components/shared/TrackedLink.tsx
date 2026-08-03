"use client"

import type {
  AnchorHTMLAttributes,
  MouseEvent,
  ReactNode,
} from "react"

type TrackingParams = {
  event: string
  location: string
  destination: string
  label?: string
  product?: string
}

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  tracking: TrackingParams
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
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
    // Tracking para Analytics / GTM / Google Ads
    window.dataLayer = window.dataLayer || []

    window.dataLayer.push({
      event: tracking.event,
      event_location: tracking.location,
      event_destination: tracking.destination,
      event_label: tracking.label,
      product: tracking.product,
    })

    // Notificação visual de atividade
    window.dispatchEvent(
      new CustomEvent("social-proof", {
        detail: {
          message: getSocialProofMessage(),
        },
      })
    )

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