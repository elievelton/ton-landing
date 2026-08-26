"use client"

import Script from "next/script"

const GA_ID = "G-ST8HWB3B3G"

export function GoogleAnalytics() {
  return (
    <>
      {/*
        Google Consent Mode v2

        - Começa com consentimento negado.
        - Se o usuário já tiver uma preferência salva,
          ela é aplicada imediatamente.
        - url_passthrough ajuda a preservar identificadores
          de clique durante navegações/redirecionamentos.
      */}
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
             * Estado padrão do Consent Mode
             */
            window.gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });

            /*
             * Preserva identificadores de clique
             * como gclid, dclid, gclsrc e wbraid
             * durante navegações internas.
             */
            window.gtag('set', 'url_passthrough', true);

            /*
             * Mantém a proteção de dados de anúncios
             * quando ad_storage estiver negado.
             *
             * O Google informa que ads_data_redaction
             * não tem efeito quando ad_storage está granted.
             */
            window.gtag('set', 'ads_data_redaction', true);

            /*
             * Se o usuário já escolheu suas preferências
             * anteriormente, aplica o consentimento imediatamente.
             *
             * Isso evita depender exclusivamente do
             * CookieConsent.tsx durante o carregamento.
             */
            try {
              var storedConsent =
                window.localStorage.getItem('maquininha_cookie_consent');

              if (storedConsent) {
                var preferences = JSON.parse(storedConsent);

                window.gtag('consent', 'update', {
                  analytics_storage:
                    preferences.analytics === true ? 'granted' : 'denied',

                  ad_storage:
                    preferences.advertising === true ? 'granted' : 'denied',

                  ad_user_data:
                    preferences.advertising === true ? 'granted' : 'denied',

                  ad_personalization:
                    preferences.advertising === true ? 'granted' : 'denied'
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

      {/*
        Biblioteca oficial do Google
      */}
      <Script
        id="google-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      {/*
        Inicialização do GA4
      */}
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