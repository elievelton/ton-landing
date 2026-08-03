"use client"

import { useEffect, useState } from "react"
import { BadgeCheck, Flame, X } from "lucide-react"

type SocialProofDetail = {
  message: string
}

const STORAGE_KEY = "ton_activity_count"

export function SocialProofToast() {
  const [message, setMessage] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const storedCount = Number(
      window.localStorage.getItem(STORAGE_KEY) ?? "0"
    )

    if (Number.isFinite(storedCount)) {
      setCount(storedCount)
    }

    let hideTimer: ReturnType<typeof setTimeout> | undefined
    let removeTimer: ReturnType<typeof setTimeout> | undefined

    function handleSocialProof(event: Event) {
      const customEvent = event as CustomEvent<SocialProofDetail>

      if (!customEvent.detail?.message) {
        return
      }

      if (hideTimer) {
        clearTimeout(hideTimer)
      }

      if (removeTimer) {
        clearTimeout(removeTimer)
      }

      setCount((currentCount) => {
        const newCount = currentCount + 1

        window.localStorage.setItem(
          STORAGE_KEY,
          String(newCount)
        )

        return newCount
      })

      setMessage(customEvent.detail.message)
      setVisible(true)

      hideTimer = setTimeout(() => {
        setVisible(false)

        removeTimer = setTimeout(() => {
          setMessage(null)
        }, 400)
      }, 4500)
    }

    window.addEventListener("social-proof", handleSocialProof)

    return () => {
      window.removeEventListener("social-proof", handleSocialProof)

      if (hideTimer) {
        clearTimeout(hideTimer)
      }

      if (removeTimer) {
        clearTimeout(removeTimer)
      }
    }
  }, [])

  if (!message) {
    return null
  }

  return (
    <div
      className={[
        "fixed bottom-5 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 transition-all duration-300 sm:bottom-6 sm:left-6 sm:translate-x-0",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-5 opacity-0",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-white/95 p-4 pr-11 shadow-2xl backdrop-blur-xl">
        <div
          className="pointer-events-none absolute -left-10 -top-10 size-24 rounded-full bg-primary/10 blur-2xl"
          aria-hidden="true"
        />

        <div className="relative flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20">
            <BadgeCheck className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
              Atividade recente
            </p>

            <p className="mt-1 text-sm font-semibold leading-5 text-foreground">
              {message}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
              <span>
                Agora mesmo
              </span>

              <span
                className="text-border"
                aria-hidden="true"
              >
                •
              </span>

              <span className="inline-flex items-center gap-1 font-semibold text-orange-600">
                <Flame className="size-3.5" />

                {count}{" "}
                {count === 1
                  ? "oferta conferida por você"
                  : "ofertas conferidas por você"}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setVisible(false)}
          className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-zinc-100 hover:text-foreground"
          aria-label="Fechar notificação"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  )
}