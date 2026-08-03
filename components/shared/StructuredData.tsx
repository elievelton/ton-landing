import { siteConfig } from "@/config/site"

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "#website",
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "pt-BR",
      },
      {
        "@type": "WebPage",
        "@id": "#webpage",
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: {
          "@id": "#website",
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
        "@id": "#consultor",
        name: siteConfig.author,
        description:
          "Consultor de maquininhas de cartão com experiência no mercado de meios de pagamento.",
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