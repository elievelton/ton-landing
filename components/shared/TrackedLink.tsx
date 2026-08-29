"use client"

import type {
  AnchorHTMLAttributes,
  MouseEvent,
  ReactNode,
} from "react"

import confetti from "canvas-confetti"

type ConversionStrength = "weak" | "medium" | "strong"

type TrackingParams = {
  event: string
  location: string
  destination: string
  label?: string
  product?: string
  conversionStrength?: ConversionStrength
}

type IntentContext = {
  intent: string
  interest_strength: ConversionStrength | "none"
  label?: string
  saved_at?: string
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

function readIntentContext(): IntentContext | null {
  try {
    const raw = window.sessionStorage.getItem("intent_context")

    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw) as Partial<IntentContext>

    if (
      typeof parsed.intent !== "string" ||
      typeof parsed.interest_strength !== "string"
    ) {
      return null
    }

    return {
      intent: parsed.intent,
      interest_strength:
        parsed.interest_strength as IntentContext["interest_strength"],
      label:
        typeof parsed.label === "string"
          ? parsed.label
          : undefined,
      saved_at:
        typeof parsed.saved_at === "string"
          ? parsed.saved_at
          : undefined,
    }
  } catch {
    return null
  }
}

function isTonAffiliateLink(href?: string | URL) {
  if (!href) return false

  try {
    const url = new URL(href.toString())

    return (
      url.protocol === "https:" &&
      url.hostname === "www.ton.com.br"
    )
  } catch {
    return false
  }
}

function logAffiliateClick(href?: string | URL) {
  if (!isTonAffiliateLink(href)) {
    return
  }

  void fetch("/api/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "affiliate_click",
      message: "Clique em link de afiliado Ton",
      path: window.location.pathname,
    }),
    keepalive: true,
  }).catch(() => {
    // Logging is non-critical and must never affect navigation.
  })
}

function registerFinalIntent(
  context: IntentContext | null,
) {
  if (!context) {
    return
  }

  const alreadyRegistered =
    window.sessionStorage.getItem(
      "final_intent_registered",
    )

  if (alreadyRegistered === "true") {
    return
  }

  const eventData = {
    intent: context.intent,
    interest_strength: context.interest_strength,
    origin_label: context.label,
    event_location: "tracked_link",
    event_destination: "checkout",
  }

  window.dataLayer = window.dataLayer || []

  window.dataLayer.push({
    event: "intent_final",
    ...eventData,
  })

  window.gtag?.("event", "intent_final", eventData)

  window.sessionStorage.setItem(
    "final_intent_registered",
    "true",
  )
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
  function handleClick(
    event: MouseEvent<HTMLAnchorElement>,
  ) {
    logAffiliateClick(href)

    const intentContext =
      tracking.conversionStrength === "strong"
        ? readIntentContext()
        : null

    const eventData = {
      event_location: tracking.location,
      event_destination: tracking.destination,
      event_label: tracking.label,
      product: tracking.product,
      conversion_strength:
        tracking.conversionStrength,
      origin_intent:
        tracking.conversionStrength === "strong"
          ? intentContext?.intent
          : undefined,
      origin_intent_strength:
        tracking.conversionStrength === "strong"
          ? intentContext?.interest_strength
          : undefined,
    }

    window.dataLayer = window.dataLayer || []

    window.dataLayer.push({
      event: tracking.event,
      ...eventData,
    })

    window.gtag?.(
      "event",
      tracking.event,
      eventData,
    )

    if (window.uetq) {
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
          },
        )
      }

      if (
        tracking.event === "commercial_interest"
      ) {
        window.uetq.push(
          "event",
          "commercial_interest",
          {
            event_category: "engagement",
            event_label:
              tracking.label ??
              "commercial_interest",
          },
        )
      }

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
          },
        )
      }

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
          },
        )
      }
    }

    if (
      tracking.conversionStrength === "strong"
    ) {
      registerFinalIntent(intentContext)

      window.sessionStorage.removeItem(
        "intent_context",
      )
    }

    window.dispatchEvent(
      new CustomEvent("social-proof", {
        detail: {
          message: getSocialProofMessage(),
        },
      }),
    )

    onClick?.(event)

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
            "noopener,noreferrer",
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
