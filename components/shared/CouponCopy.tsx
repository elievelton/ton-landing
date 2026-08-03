"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { siteConfig } from "@/config/site"

type CouponCopyProps = {
  variant?: "default" | "orange" | "light"
  className?: string
  location?: string
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function CouponCopy({
  variant = "default",
  className = "",
  location = "unknown",
}: CouponCopyProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(siteConfig.coupon)

      

      window.dataLayer = window.dataLayer || []

      window.dataLayer.push({
        event: "coupon_copy",
        event_location: location,
        coupon: siteConfig.coupon,
      })

      

      setCopied(true)

      window.setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error("Erro ao copiar cupom:", error)
      setCopied(false)
    }
  }

  const variants = {
    default:
      "border-primary/20 bg-primary/5 text-primary hover:bg-primary/10",

    orange:
      "border-orange-500/30 bg-orange-500/5 text-orange-600 hover:bg-orange-500/10",

    light:
      "border-white/20 bg-white/10 text-white hover:bg-white/20",
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`group inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all duration-300 active:scale-95 ${variants[variant]} ${className}`}
      aria-label={`Copiar cupom ${siteConfig.coupon}`}
    >
      {copied ? (
        <>
          <Check className="size-4" />

          <span className="animate-in fade-in">
            Cupom copiado com sucesso!
          </span>
        </>
      ) : (
        <>
          <span className="tracking-wide">
            {siteConfig.coupon}
          </span>

          <Copy className="size-4 transition-transform duration-300 group-hover:scale-110" />
        </>
      )}
    </button>
  )
}