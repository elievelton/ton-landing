"use client"

import Script from "next/script"

const UET_ID = "121006392"

export function MicrosoftUET() {
  return (
    <Script
      id="microsoft-uet"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w, d, t, u, o) {
            w[u] = w[u] || [];

            // Advanced Consent Mode: começa negado antes de carregar o UET.
            w[u].push("consent", "default", {
              ad_storage: "denied"
            });

            // Reaplica a escolha previamente salva, se houver.
            try {
              var storedConsent = w.localStorage.getItem("maquininha_cookie_consent");

              if (storedConsent) {
                var preferences = JSON.parse(storedConsent);

                w[u].push("consent", "update", {
                  ad_storage: preferences.advertising === true
                    ? "granted"
                    : "denied"
                });
              }
            } catch (error) {
              // Se não for possível ler a preferência, mantém denied.
            }

            o.ts = (new Date).getTime();

            var n = d.createElement(t);
            n.src = "https://bat.bing.net/bat.js?ti=" + o.ti;
            n.async = 1;

            n.onload = n.onreadystatechange = function() {
              var s = this.readyState;

              if (!s || s === "loaded" || s === "complete") {
                o.q = w[u];
                w[u] = new UET(o);
                w[u].push("pageLoad");
                n.onload = n.onreadystatechange = null;
              }
            };

            var i = d.getElementsByTagName(t)[0];
            i.parentNode.insertBefore(n, i);
          })(window, document, "script", "uetq", {
            ti: "121006392",
            enableAutoSpaTracking: true
          });
        `,
      }}
    />
  )
}
