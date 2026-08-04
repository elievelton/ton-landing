"use client"

import { useEffect, useState } from "react"
import { Clock3 } from "lucide-react"

/*
 * CONFIGURAÇÃO DO CONTADOR
 *
 * "daily" = termina à meia-noite e reinicia automaticamente.
 * "fixed" = termina em uma data/hora específica.
 */
const COUNTDOWN_MODE: "daily" | "fixed" = "daily"

/*
 * Usado somente quando COUNTDOWN_MODE = "fixed".
const PROMOTION_END_DATE = "2026-08-10T23:59:59-03:00" Usar esse modelo quando tiver oferta especial
 *
 * Exemplo:
 * "2026-08-10T23:59:59-03:00"
 */
const PROMOTION_END_DATE = "2026-08-10T23:59:59-03:00"

type TimeLeft = {
  hours: number
  minutes: number
  seconds: number
}

function getDailyTimeLeft(): TimeLeft {
  const now = new Date()

  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)

  const difference = Math.max(
    0,
    midnight.getTime() - now.getTime()
  )

  return convertMilliseconds(difference)
}

function getFixedTimeLeft(): TimeLeft {
  const now = new Date()
  const end = new Date(PROMOTION_END_DATE)

  const difference = Math.max(
    0,
    end.getTime() - now.getTime()
  )

  return convertMilliseconds(difference)
}

function convertMilliseconds(milliseconds: number): TimeLeft {
  const totalSeconds = Math.floor(milliseconds / 1000)

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {
    hours,
    minutes,
    seconds,
  }
}

function getTimeLeft(): TimeLeft {
  if (COUNTDOWN_MODE === "fixed") {
    return getFixedTimeLeft()
  }

  return getDailyTimeLeft()
}

function formatTime(value: number) {
  return String(value).padStart(2, "0")
}

export function OfferCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    function updateCountdown() {
      setTimeLeft(getTimeLeft())
    }

    updateCountdown()

    const interval = window.setInterval(
      updateCountdown,
      1000
    )

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  if (!timeLeft) {
    return null
  }

  return (
    <div className="mt-4 rounded-2xl border border-orange-500/20 bg-orange-50/70 p-3">
      <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange-600">
        <Clock3 className="size-3.5" />

        Oferta por tempo limitado
      </div>

      <div className="mt-2 flex items-center justify-center gap-2">
        <TimeBlock
          value={timeLeft.hours}
          label="Horas"
        />

        <Separator />

        <TimeBlock
          value={timeLeft.minutes}
          label="Min"
        />

        <Separator />

        <TimeBlock
          value={timeLeft.seconds}
          label="Seg"
        />
      </div>
    </div>
  )
}

function TimeBlock({
  value,
  label,
}: {
  value: number
  label: string
}) {
  return (
    <div className="min-w-[54px] rounded-xl bg-white px-2 py-2 shadow-sm">
      <div className="font-[family-name:var(--font-manrope)] text-xl font-extrabold tabular-nums text-foreground">
        {formatTime(value)}
      </div>

      <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
        {label}
      </div>
    </div>
  )
}

function Separator() {
  return (
    <span
      className="mb-4 text-lg font-black text-orange-500"
      aria-hidden="true"
    >
      :
    </span>
  )
}