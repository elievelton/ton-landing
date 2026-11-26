"use client"

import { useEffect, useState } from "react"
import { DEFAULT_COUPON_PERCENT } from "@/config/coupon-defaults"


export function useCouponPercent() {
  const [couponPercent, setCouponPercent] = useState(DEFAULT_COUPON_PERCENT)

  useEffect(() => {
    let active = true

    async function loadCouponPercent() {
      try {
        const response = await fetch("/api/coupon", { cache: "no-store" })
        if (!response.ok) return

        const data: { percent?: unknown } = await response.json()
        const percent = Number(data.percent)

        if (
          active &&
          Number.isInteger(percent) &&
          percent >= 0 &&
          percent <= 100
        ) {
          setCouponPercent(percent)
        }
      } catch (error) {
        console.error("Erro ao carregar percentual do cupom:", error)
      }
    }

    loadCouponPercent()

    return () => {
      active = false
    }
  }, [])

  return couponPercent
}
