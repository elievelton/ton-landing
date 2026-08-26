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

            window.gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });

            /*
             * Preserva parâmetros de identificação de anúncios
             * durante navegações/redirecionamentos.
             */
            window.gtag('set', 'url_passthrough', true);

            /*
             * Redação de dados de anúncios quando o
             * armazenamento de anúncios estiver negado.
             */
            window.gtag('set', 'ads_data_redaction', true);

            /*
             * Restaura o consentimento já salvo pelo
             * CookieConsent.tsx.
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

      {/* Google tag */}
      <Script
        id="google-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      {/* Google Analytics 4 */}
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