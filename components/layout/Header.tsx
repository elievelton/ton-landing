"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calculator, Flame, Menu } from "lucide-react"

import { Container } from "@/components/shared/Container"
import { TrackedLink } from "@/components/shared/TrackedLink"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { siteConfig } from "@/config/site"
import {
  isPromotionActive,
} from "@/config/promotions"

const navigation = [
  { label: "Máquinas", href: "#maquinas" },
  { label: "Planos", href: "#planos" },
  {
    label: "Calculadora de Taxas",
    href: "#calculadora",
    highlight: true,
  },
  { label: "Como ganhar 20% OFF", href: "#consultor" },
  { label: "Sobre mim", href: "#quem-somos" },
  { label: "FAQ", href: "#duvidas" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [promotionVisible, setPromotionVisible] =
    useState(false)

  useEffect(() => {
    function updatePromotionVisibility() {
      setPromotionVisible(isPromotionActive())
    }

    updatePromotionVisibility()

    const interval = window.setInterval(
      updatePromotionVisibility,
      1000,
    )

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Página inicial"
          >
            <div className="group inline-flex items-center gap-2">
              <span className="relative font-[family-name:var(--font-archivo-black)] text-2xl tracking-tight sm:text-3xl">
                <span className="text-foreground">
                  Parceiro
                </span>{" "}

                <span className="relative text-primary">
                  Ton

                  <span
                    className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-orange-500 transition-transform duration-300 group-hover:scale-x-75"
                    aria-hidden="true"
                  />
                </span>
              </span>

              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40" />

                <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
              </span>
            </div>
          </Link>

          {/* Navegação desktop */}
          <nav
            className="hidden items-center gap-5 lg:flex"
            aria-label="Navegação principal"
          >
            {navigation.map((item) => {
              const isCalculator = item.highlight

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "group relative inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium transition-all duration-200",

                    isCalculator
                      ? "font-bold text-primary"
                      : "text-foreground/70 hover:text-primary",
                  ].join(" ")}
                >
                  {isCalculator && (
                    <Calculator className="size-3.5 transition-transform duration-200 group-hover:scale-110" />
                  )}

                  {item.label}

                  {isCalculator && (
                    <span
                      className="
                        absolute
                        -bottom-1
                        left-0
                        h-0.5
                        w-full
                        origin-left
                        scale-x-0
                        rounded-full
                        bg-primary
                        transition-transform
                        duration-300
                        group-hover:scale-x-100
                      "
                    />
                  )}
                </Link>
              )
            })}

            {/* Promoção */}
            {promotionVisible && (
              <Link
                href="#promocao"
                className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
              >
                <Flame className="size-4 fill-current transition-transform duration-300 group-hover:scale-110" />

                <span>Oferta</span>

                <span className="rounded-full bg-orange-500 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white group-hover:bg-white group-hover:text-orange-500">
                  desse mês
                </span>
              </Link>
            )}
          </nav>

          {/* CTA desktop */}
          <div className="hidden lg:block">
            <TrackedLink
              href={siteConfig.links.catalog}
              target="_blank"
              rel="noopener noreferrer"
              celebration
              tracking={{
                event: "cta_click",
                location: "header_desktop",
                destination: "catalog",
                label: "Comprar com desconto",
                conversionStrength: "medium",
              }}
            >
              <Button
                size="lg"
                className="relative overflow-hidden bg-orange-500 font-bold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:bg-orange-600 animate-[bounce_2s_infinite]"
              >
                🔥 Pegar Meu Desconto
              </Button>
            </TrackedLink>
          </div>

          {/* Menu mobile */}
          <div className="lg:hidden">
            <Sheet
              open={menuOpen}
              onOpenChange={setMenuOpen}
            >
              <SheetTrigger
                render={
                  <button
                    type="button"
                    className="group relative flex size-11 items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-sm transition-all duration-300 hover:border-primary/30 hover:bg-primary hover:text-white hover:shadow-md active:scale-95"
                    aria-label="Abrir menu"
                  />
                }
              >
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <Menu className="relative z-10 size-6 stroke-[2.5]" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[85%] max-w-sm border-l border-white/10 bg-primary p-0 text-white"
              >
                {/* Cabeçalho do menu */}
                <SheetHeader className="border-b border-white/15 px-6 pb-6 pt-16">
                  <SheetTitle className="text-right">
                    <div className="group inline-flex items-center justify-end gap-2">
                      <span className="relative font-[family-name:var(--font-archivo-black)] text-2xl tracking-tight">
                        <span className="text-black">
                          Parceiro
                        </span>{" "}

                        <span className="relative text-white">
                          Ton

                          <span
                            className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-orange-500 transition-transform duration-300 group-hover:scale-x-75"
                            aria-hidden="true"
                          />
                        </span>
                      </span>

                      <span className="relative flex size-2.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-40" />

                        <span className="relative inline-flex size-2.5 rounded-full bg-white" />
                      </span>
                    </div>
                  </SheetTitle>

                  <p className="mt-2 text-right text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                    Máquinas & soluções
                  </p>
                </SheetHeader>

                {/* Navegação mobile */}
                <nav
                  className="flex flex-col px-4 py-5"
                  aria-label="Navegação mobile"
                >
                  {navigation.map((item) => {
                    const isCalculator = item.highlight

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() =>
                          setMenuOpen(false)
                        }
                        className={[
                          "flex min-h-14 items-center justify-end gap-2 border-b border-white/10 px-3 text-right text-base transition-all duration-200 last:border-b-0 active:bg-white/15 active:text-black",

                          isCalculator
                            ? "font-extrabold text-white hover:bg-white/10 hover:text-white"
                            : "font-bold text-white hover:bg-white/10 hover:text-black",
                        ].join(" ")}
                      >
                        {isCalculator && (
                          <Calculator className="size-4 text-orange-300" />
                        )}

                        {item.label}
                      </Link>
                    )
                  })}

                  {/* Promoção mobile */}
                  {promotionVisible && (
                    <Link
                      href="#promocao"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="flex min-h-14 items-center justify-end gap-2 border-b border-white/10 bg-white/5 px-3 text-right text-base font-extrabold text-white transition-all duration-200 hover:bg-white/10 hover:text-black active:bg-white/15 active:text-black"
                    >
                      <span className="rounded-full bg-orange-500 px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white">
                        desse mês
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Flame className="size-4 fill-current text-orange-300" />
                        Oferta
                      </span>
                    </Link>
                  )}

                  {/* CTA mobile */}
                  <div className="mt-6">
                    <TrackedLink
                      href={siteConfig.links.catalog}
                      target="_blank"
                      rel="noopener noreferrer"
                      celebration
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      tracking={{
                        event: "cta_click",
                        location: "header_mobile",
                        destination: "catalog",
                        label: "Comprar com desconto",
                        conversionStrength: "medium",
                      }}
                    >
                      <Button
                        size="lg"
                        className="h-14 w-full rounded-xl bg-orange-500 text-base font-extrabold text-white shadow-lg shadow-black/10 transition-all hover:bg-orange-600 active:scale-[0.98]"
                      >
                        🔥 Pegar Meu Desconto
                      </Button>
                    </TrackedLink>

                    <p className="mt-3 text-center text-xs leading-5 text-white/60">
                      Cupom aplicado no link de compra
                    </p>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  )
}