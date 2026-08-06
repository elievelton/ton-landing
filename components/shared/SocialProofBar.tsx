"use client"

import { useEffect, useRef, useState } from "react"
import { BadgeCheck, Flame } from "lucide-react"

type ActivityResponse = {
  totalCount: number
  todayCount: number
}

const POLLING_INTERVAL = 5000

export function SocialProofBar() {
  const [totalCount, setTotalCount] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [showIncrement, setShowIncrement] = useState(false)

  const previousCount = useRef<number | null>(null)
  const incrementTimer =
    useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadActivity() {
      try {
        const response = await fetch("/api/activity", {
          method: "GET",
          cache: "no-store",
        })

        if (!response.ok || !mounted) {
          return
        }

        const data = (await response.json()) as ActivityResponse

        if (!Number.isFinite(data.totalCount)) {
          return
        }

        /*
         * Primeira consulta:
         *
         * apenas carrega o valor atual.
         * Não mostramos +1 quando a página abre.
         */
        if (previousCount.current === null) {
          previousCount.current = data.totalCount
          setTotalCount(data.totalCount)
          setLoaded(true)
          return
        }

        /*
         * Detecta quando o contador aumentou.
         */
        if (data.totalCount > previousCount.current) {
          setTotalCount(data.totalCount)

          /*
           * Mostra o +1.
           */
          setShowIncrement(true)

          if (incrementTimer.current) {
            clearTimeout(incrementTimer.current)
          }

          /*
           * Remove a animação depois de 2 segundos.
           */
          incrementTimer.current = setTimeout(() => {
            if (mounted) {
              setShowIncrement(false)
            }
          }, 2000)
        }

        previousCount.current = data.totalCount
        setTotalCount(data.totalCount)
        setLoaded(true)
      } catch (error) {
        console.error(
          "Erro ao carregar contador global:",
          error
        )
      }
    }

    /*
     * Primeira consulta.
     */
    void loadActivity()

    /*
     * Verifica atualizações a cada 5 segundos.
     */
    const interval = window.setInterval(() => {
      void loadActivity()
    }, POLLING_INTERVAL)

    return () => {
      mounted = false

      window.clearInterval(interval)

      if (incrementTimer.current) {
        clearTimeout(incrementTimer.current)
      }
    }
  }, [])

  /*
   * Evita mostrar "0 pessoas" enquanto
   * carregamos o valor real.
   */
  if (!loaded) {
    return (
      <div
        className="h-9 bg-primary"
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className="relative z-[60] overflow-hidden bg-primary text-white"
      role="status"
      aria-live="polite"
    >
      {/* Brilho decorativo */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-9 max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs sm:text-sm">
        <Flame
          className="size-4 shrink-0 text-orange-300"
          aria-hidden="true"
        />

        <span>
          <strong className="font-extrabold">
            {totalCount.toLocaleString("pt-BR")}
          </strong>{" "}
          {totalCount === 1
            ? "pessoa já acessou"
            : "pessoas já acessaram"}{" "}
          nossas ofertas com desconto
        </span>

        {/* Animação +1 */}
        <span
          className={[
            "inline-flex min-w-8 items-center justify-center rounded-full bg-white px-2 py-0.5 text-[11px] font-black text-primary shadow-md transition-all duration-500",
            showIncrement
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-2 scale-75 opacity-0",
          ].join(" ")}
          aria-hidden={!showIncrement}
        >
          +1
        </span>

        <BadgeCheck
          className="hidden size-4 shrink-0 sm:block"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}