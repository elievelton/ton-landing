import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "AdsBot-Google",
        allow: "/",
      },
      {
        userAgent: "AdsBot-Google-Mobile",
        allow: "/",
      },
    ],

    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}