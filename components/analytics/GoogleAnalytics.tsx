"use client"

import Script from "next/script"

const GA_ID = "G-ST8HWB3B3G"

export function GoogleAnalytics() {
  return (
    <>
      {/*
        Consent Mode v2.

        O estado padrão começa negado e precisa ser definido
        antes da inicialização da medição.
      */}
      <Script
        id="google-consent-mode"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];

            window.gtag = function(){
              window.dataLayer.push(arguments);
            };

            window.gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });

            window.gtag('set', 'ads_data_redaction', true);
          `,
        }}
      />

      {/* Carrega a biblioteca oficial do Google */}
      <Script
        id="google-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      {/* Inicializa o Google Analytics 4 */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];

            window.gtag = window.gtag || function(){
              window.dataLayer.push(arguments);
            };

            window.gtag('js', new Date());

            window.gtag('config', '${GA_ID}');
          `,
        }}
      />
    </>
  )
}