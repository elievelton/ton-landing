import { siteConfig } from "@/config/site"

export function StructuredData() {
  const websiteId = `${siteConfig.url}/#website`
  const webpageId = `${siteConfig.url}/#webpage`
  const consultantId = `${siteConfig.url}/#consultor`

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: "Maquininha com Cupom",
        description: siteConfig.description,
        inLanguage: "pt-BR",
      },

      {
        "@type": "WebPage",
        "@id": webpageId,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: {
          "@id": websiteId,
        },
        inLanguage: "pt-BR",
        about: [
          {
            "@type": "Thing",
            name: "Maquininhas Ton",
          },
          {
            "@type": "Thing",
            name: "Taxas Ton",
          },
          {
            "@type": "Thing",
            name: "Planos Ton",
          },
          {
            "@type": "Thing",
            name: "TapTon",
          },
        ],
      },

      {
        "@type": "Person",
        "@id": consultantId,
        name: siteConfig.author,
        url: siteConfig.url,
        description:
          "Consultor independente de maquininhas de cartão e soluções de pagamento.",
        knowsAbout: [
          "Maquininhas de cartão",
          "Meios de pagamento",
          "Maquininhas Ton",
          "Planos Ton",
          "Taxas de cartão",
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  )
}