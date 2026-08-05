"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

const STORAGE_KEY = "maquininha_cookie_consent"
const UET_ID = "121006392"

type ConsentPreferences = {
  necessary: true
  analytics: boolean
  advertising: boolean
}

export function MicrosoftUET() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    function readConsent() {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY)

        if (!stored) {
          setEnabled(false)
          return
        }

        const preferences = JSON.parse(
          stored
        ) as ConsentPreferences

        setEnabled(preferences.advertising === true)
      } catch {
        setEnabled(false)
      }
    }

    readConsent()

    function handleConsentUpdated() {
      readConsent()
    }

    window.addEventListener(
      "cookie-consent-updated",
      handleConsentUpdated
    )

    return () => {
      window.removeEventListener(
        "cookie-consent-updated",
        handleConsentUpdated
      )
    }
  }, [])

  if (!enabled) {
    return null
  }

  return (
    <Script
      id="microsoft-uet"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w, d, t, u, o) {
            w[u] = w[u] || [];
            o.ts = (new Date).getTime();

            var n = d.createElement(t);

            n.src =
              "https://bat.bing.net/bat.js?ti=" +
              o.ti +
              ("uetq" != u ? "&q=" + u : "");

            n.async = 1;

            n.onload = n.onreadystatechange = function() {
              var s = this.readyState;

              if (
                !s ||
                s === "loaded" ||
                s === "complete"
              ) {
                o.q = w[u];
                w[u] = new UET(o);
                w[u].push("pageLoad");

                n.onload = n.onreadystatechange = null;
              }
            };

            var i = d.getElementsByTagName(t)[0];

            i.parentNode.insertBefore(n, i);

          })(window, document, "script", "uetq", {
            ti: "${UET_ID}",
            enableAutoSpaTracking: true
          });
        `,
      }}
    />
  )
}