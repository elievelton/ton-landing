"use client"

import { useEffect, useRef, useState } from "react"
import { BadgeCheck, Flame, X } from "lucide-react"

type SocialProofDetail = {
  message: string
}

type LatestActivity = {
  id: string
  message: string
  createdAt: number
}

type ActivityResponse = {
  totalCount: number
  todayCount: number
  latestActivity: LatestActivity | null
}

const POLLING_INTERVAL = 5000

export function SocialProofToast() {
  const [message, setMessage] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  /*
   * Contador utilizado no toast.
   *
   * Representa somente as atividades registradas
   * no dia atual.
   */
  const [todayCount, setTodayCount] = useState(0)

  const lastActivityId = useRef<string | null>(null)
  const initialized = useRef(false)

  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const removeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function clearTimers() {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current)
    }

    if (removeTimer.current) {
      clearTimeout(removeTimer.current)
    }
  }

  function showToast(newMessage: string) {
    clearTimers()

    setMessage(newMessage)
    setVisible(true)

    hideTimer.current = setTimeout(() => {
      setVisible(false)

      removeTimer.current = setTimeout(() => {
        setMessage(null)
      }, 400)
    }, 8000)
  }

  useEffect(() => {
    let mounted = true

    async function loadActivity(showNewActivity = true) {
      try {
        const response = await fetch("/api/activity", {
          method: "GET",
          cache: "no-store",
        })

        if (!response.ok || !mounted) {
          return
        }

        const data = (await response.json()) as ActivityResponse

        /*
         * O toast utiliza somente o contador
         * referente ao dia atual.
         */
        if (Number.isFinite(data.todayCount)) {
          setTodayCount(data.todayCount)
        }

        /*
         * A primeira consulta serve apenas para estabelecer
         * o estado inicial da página.
         *
         * Mesmo que não exista nenhuma atividade, marcamos
         * o componente como inicializado.
         */
        if (!initialized.current) {
          initialized.current = true
          lastActivityId.current =
            data.latestActivity?.id ?? null

          return
        }

        /*
         * Ainda não existe nenhuma atividade registrada.
         */
        if (!data.latestActivity) {
          return
        }

        /*
         * Se encontramos uma atividade diferente da última
         * conhecida por este visitante, mostramos o toast.
         */
        if (
          showNewActivity &&
          data.latestActivity.id !== lastActivityId.current
        ) {
          lastActivityId.current =
            data.latestActivity.id

          showToast(data.latestActivity.message)
        }
      } catch (error) {
        console.error(
          "Erro ao carregar atividades:",
          error
        )
      }
    }

    async function registerActivity(
      newMessage: string
    ) {
      try {
        const response = await fetch(
          "/api/activity",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: newMessage,
            }),
          }
        )

        if (!response.ok || !mounted) {
          return
        }

        const data =
          (await response.json()) as ActivityResponse

        /*
         * Atualiza imediatamente o contador
         * de atividades realizadas hoje.
         */
        if (Number.isFinite(data.todayCount)) {
          setTodayCount(data.todayCount)
        }

        if (data.latestActivity) {
          /*
           * Guardamos imediatamente o ID da atividade criada
           * por este visitante.
           *
           * Assim o polling não mostra novamente para ele
           * a mesma notificação.
           */
          lastActivityId.current =
            data.latestActivity.id
        }
      } catch (error) {
        console.error(
          "Erro ao registrar atividade:",
          error
        )
      }
    }

    function handleSocialProof(event: Event) {
      const customEvent =
        event as CustomEvent<SocialProofDetail>

      if (!customEvent.detail?.message) {
        return
      }

      /*
       * Quem realizou a ação vê a notificação imediatamente.
       */
      showToast(customEvent.detail.message)

      /*
       * Também registramos a atividade no Redis para que
       * os outros visitantes possam recebê-la.
       *
       * A API incrementa:
       *
       * - contador histórico/global
       * - contador do dia atual
       */
      void registerActivity(
        customEvent.detail.message
      )
    }

    /*
     * Primeira consulta.
     *
     * Carrega o contador de hoje e estabelece qual é
     * a atividade atual sem mostrar uma notificação antiga.
     */
    void loadActivity(false)

    /*
     * Consulta periodicamente o servidor para verificar
     * se outro visitante gerou uma nova atividade.
     */
    const interval = window.setInterval(() => {
      void loadActivity(true)
    }, POLLING_INTERVAL)

    window.addEventListener(
      "social-proof",
      handleSocialProof
    )

    return () => {
      mounted = false

      window.clearInterval(interval)

      window.removeEventListener(
        "social-proof",
        handleSocialProof
      )

      clearTimers()
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
              <span>Agora mesmo</span>

              <span
                className="text-border"
                aria-hidden="true"
              >
                •
              </span>

              <span className="inline-flex items-center gap-1 font-semibold text-orange-600">
                <Flame className="size-3.5" />

                {todayCount}{" "}
                {todayCount === 1
                  ? "oferta conferida hoje"
                  : "ofertas conferidas hoje"}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setVisible(false)}
          className="absolute right-3 top-3 flex size-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-zinc-100 hover:text-foreground"
          aria-label="Fechar notificação"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  )
}