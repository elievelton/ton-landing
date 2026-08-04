"use client"

import { useEffect, useState } from "react"
import { Cookie, Settings2, X } from "lucide-react"

const STORAGE_KEY = "maquininha_cookie_consent"

type ConsentPreferences = {
  necessary: true
  analytics: boolean
  advertising: boolean
}

type GoogleConsentValue = "granted" | "denied"

type GoogleConsentUpdate = Record<string, GoogleConsentValue> & {
  analytics_storage: GoogleConsentValue
  ad_storage: GoogleConsentValue
  ad_user_data: GoogleConsentValue
  ad_personalization: GoogleConsentValue
}


const ACCEPT_ALL: ConsentPreferences = {
  necessary: true,
  analytics: true,
  advertising: true,
}

const REJECT_OPTIONAL: ConsentPreferences = {
  necessary: true,
  analytics: false,
  advertising: false,
}

function updateGoogleConsent(preferences: ConsentPreferences) {
  if (!window.gtag) {
    return
  }

  const consentUpdate: GoogleConsentUpdate = {
    analytics_storage: preferences.analytics
      ? "granted"
      : "denied",

    ad_storage: preferences.advertising
      ? "granted"
      : "denied",

    ad_user_data: preferences.advertising
      ? "granted"
      : "denied",

    ad_personalization: preferences.advertising
      ? "granted"
      : "denied",
  }

  window.gtag(
    "consent",
    "update",
    consentUpdate
  )
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const [analytics, setAnalytics] = useState(false)
  const [advertising, setAdvertising] = useState(false)

  useEffect(() => {
    const storedConsent =
      window.localStorage.getItem(STORAGE_KEY)

    if (!storedConsent) {
      setVisible(true)
    } else {
      try {
        const preferences = JSON.parse(
          storedConsent
        ) as ConsentPreferences

        setAnalytics(preferences.analytics)
        setAdvertising(preferences.advertising)

        updateGoogleConsent(preferences)
      } catch {
        window.localStorage.removeItem(STORAGE_KEY)
        setVisible(true)
      }
    }

    function openCookieSettings() {
      const storedPreferences =
        window.localStorage.getItem(STORAGE_KEY)

      if (storedPreferences) {
        try {
          const preferences = JSON.parse(
            storedPreferences
          ) as ConsentPreferences

          setAnalytics(preferences.analytics)
          setAdvertising(preferences.advertising)
        } catch {
          // Mantém as preferências atuais caso o valor salvo seja inválido.
        }
      }

      setSettingsOpen(true)
      setVisible(true)
    }

    window.addEventListener(
      "open-cookie-settings",
      openCookieSettings
    )

    return () => {
      window.removeEventListener(
        "open-cookie-settings",
        openCookieSettings
      )
    }
  }, [])

  function savePreferences(
    preferences: ConsentPreferences
  ) {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(preferences)
    )

    setAnalytics(preferences.analytics)
    setAdvertising(preferences.advertising)

    updateGoogleConsent(preferences)

    window.dispatchEvent(
      new CustomEvent("cookie-consent-updated", {
        detail: preferences,
      })
    )

    setSettingsOpen(false)
    setVisible(false)
  }

  function acceptAll() {
    savePreferences(ACCEPT_ALL)
  }

  function rejectOptional() {
    savePreferences(REJECT_OPTIONAL)
  }

  function saveCustomPreferences() {
    savePreferences({
      necessary: true,
      analytics,
      advertising,
    })
  }

  if (!visible) {
    return null
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[200] p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Preferências de cookies"
    >
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="hidden size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:flex">
              <Cookie className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    Sua privacidade é importante
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                    Utilizamos cookies necessários para o funcionamento do
                    site e, com sua autorização, cookies de análise e
                    publicidade para medir o desempenho e melhorar sua
                    experiência.
                  </p>

                  <a
                    href="/politica-de-privacidade"
                    className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
                  >
                    Saiba mais na Política de Privacidade
                  </a>
                </div>

                <button
                  type="button"
                  onClick={rejectOptional}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-zinc-100 hover:text-foreground"
                  aria-label="Fechar e recusar cookies opcionais"
                >
                  <X className="size-4" />
                </button>
              </div>

              {settingsOpen && (
                <div className="mt-5 space-y-3 border-t border-border pt-5">
                  {/* Necessários */}
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        Cookies necessários
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted">
                        Necessários para recursos básicos e funcionamento do
                        site.
                      </p>
                    </div>

                    <span className="shrink-0 text-xs font-bold text-primary">
                      Sempre ativos
                    </span>
                  </div>

                  {/* Analytics */}
                  <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border p-4">
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        Análise e desempenho
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted">
                        Ajuda a entender como o site é utilizado e a medir seu
                        desempenho.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(event) =>
                        setAnalytics(event.target.checked)
                      }
                      className="size-5 accent-green-600"
                    />
                  </label>

                  {/* Publicidade */}
                  <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border p-4">
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        Publicidade
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted">
                        Permite medir campanhas e utilizar recursos
                        relacionados à publicidade.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={advertising}
                      onChange={(event) =>
                        setAdvertising(event.target.checked)
                      }
                      className="size-5 accent-green-600"
                    />
                  </label>
                </div>
              )}

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  Aceitar todos
                </button>

                <button
                  type="button"
                  onClick={rejectOptional}
                  className="rounded-xl border border-border bg-white px-5 py-3 text-sm font-bold text-foreground transition-colors hover:bg-zinc-50"
                >
                  Recusar opcionais
                </button>

                {settingsOpen ? (
                  <button
                    type="button"
                    onClick={saveCustomPreferences}
                    className="rounded-xl border border-primary/30 bg-primary/5 px-5 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary/10"
                  >
                    Salvar preferências
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSettingsOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-muted transition-colors hover:bg-zinc-50 hover:text-foreground"
                  >
                    <Settings2 className="size-4" />

                    Configurar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}