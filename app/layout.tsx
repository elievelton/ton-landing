import type { Metadata } from "next"
import { Geist, Geist_Mono, Manrope } from "next/font/google"

import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { siteConfig } from "@/config/site"
import { BackToTop } from "@/components/shared/BackToTop"
import { StructuredData } from "@/components/shared/StructuredData"
import { SocialProofToast } from "@/components/shared/SocialProofToast"

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

export const metadata: Metadata = {
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
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
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
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <StructuredData />
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
        <BackToTop />
        <SocialProofToast />
      </body>
    </html>
  )
}