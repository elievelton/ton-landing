import type { Metadata } from "next"
import {
  Archivo_Black,
  Geist,
  Geist_Mono,
  Manrope,
} from "next/font/google"

import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { BackToTop } from "@/components/shared/BackToTop"
import { CookieConsent } from "@/components/shared/CookieConsent"
import { SocialProofToast } from "@/components/shared/SocialProofToast"
import { StructuredData } from "@/components/shared/StructuredData"
import { siteConfig } from "@/config/site"
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
})

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  applicationName: siteConfig.name,

  authors: [
    {
      name: siteConfig.author,
    },
  ],

  creator: siteConfig.author,
  publisher: siteConfig.name,

  keywords: siteConfig.keywords,

  category: "finance",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",

    title: siteConfig.title,
    description: siteConfig.description,

    siteName: "Maquininha com Cupom",

    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Maquininhas Ton com cupom de desconto",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: siteConfig.title,
    description: siteConfig.description,

    images: [
      "/images/og-image.png",
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <GoogleAnalytics />
        <StructuredData />

        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

        <BackToTop />
        <SocialProofToast />
        <CookieConsent />
      </body>
    </html>
  )
}