"use client"

import Script from "next/script"

const GA_ID = "G-ST8HWB3B3G"

export function GoogleAnalytics() {
  return (
    <>
      {/* Google Consent Mode v2 */}
      <Script
        id="google-consent-mode"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];

            window.gtag = window.gtag || function() {
              window.dataLayer.push(arguments);
            };

            /*
             * Estado padrão do Consent Mode.
             * Começa negado até o usuário escolher no banner.
             */
            window.gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });

            /*
             * Permite que os identificadores de campanha
             * sejam preservados quando disponíveis na URL.
             */
            window.gtag('set', 'url_passthrough', true);

            /*
             * Restaura a preferência de consentimento
             * salva pelo CookieConsent.
             */
            try {
              var storedConsent =
                window.localStorage.getItem('maquininha_cookie_consent');

              if (storedConsent) {
                var preferences = JSON.parse(storedConsent);

                window.gtag('consent', 'update', {
                  analytics_storage:
                    preferences.analytics === true
                      ? 'granted'
                      : 'denied',

                  ad_storage:
                    preferences.advertising === true
                      ? 'granted'
                      : 'denied',

                  ad_user_data:
                    preferences.advertising === true
                      ? 'granted'
                      : 'denied',

                  ad_personalization:
                    preferences.advertising === true
                      ? 'granted'
                      : 'denied'
                });
              }
            } catch (error) {
              console.warn(
                '[GoogleAnalytics] Erro ao restaurar consentimento:',
                error
              );
            }
          `,
        }}
      />

      {/* Biblioteca oficial do Google Analytics */}
      <Script
        id="google-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      {/* Inicialização do Google Analytics 4 */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];

            window.gtag = window.gtag || function() {
              window.dataLayer.push(arguments);
            };

            window.gtag('js', new Date());

            window.gtag('config', '${GA_ID}', {
              send_page_view: true
            });
          `,
        }}
      />
    </>
  )
}