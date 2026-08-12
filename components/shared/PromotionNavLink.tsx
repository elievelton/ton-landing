"use client"

import { useEffect, useState } from "react"
import { Flame } from "lucide-react"

import {
  activePromotion,
  PROMOTION_END,
} from "@/config/promotions"

export function PromotionNavLink() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function updateVisibility() {
      setVisible(
        activePromotion.enabled &&
          Date.now() < PROMOTION_END
      )
    }

    updateVisibility()

    const interval = window.setInterval(
      updateVisibility,
      1000
    )

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  if (!visible) {
    return null
  }

  return (
    <a
      href="#promocao"
      className="group inline-flex items-center gap-1.5 font-semibold text-primary transition-colors hover:text-primary/80"
    >
      <Flame className="size-4 fill-current transition-transform duration-300 group-hover:scale-110" />

      <span>Promoção</span>

      <span className="rounded-full bg-orange-500 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white">
        Extra
      </span>
    </a>
  )
}