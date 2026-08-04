"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

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

const navigation = [
  { label: "Máquinas", href: "#maquinas" },
  { label: "Planos e Taxas", href: "#planos" },
  { label: "TapTon", href: "#tapton" },
  { label: "Por que comigo?", href: "#consultor" },
  { label: "Sobre mim", href: "#quem-somos" },
  { label: "FAQ", href: "#duvidas" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

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
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden lg:block">
            <TrackedLink
              href={siteConfig.links.catalog}
              target="_blank"
              rel="noopener noreferrer"
              tracking={{
                event: "cta_click",
                location: "header_desktop",
                destination: "catalog",
                label: "Comprar com desconto",
                conversionStrength: "medium",
              }}
            >
              <Button size="lg">
                Comprar com desconto
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

                      {/* Bolinha animada */}
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
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-14 items-center justify-end border-b border-white/10 px-3 text-right text-base font-bold text-white transition-all duration-200 last:border-b-0 hover:bg-white/10 hover:text-black active:bg-white/15 active:text-black"
                    >
                      {item.label}
                    </Link>
                  ))}

                  {/* CTA */}
                  <div className="mt-6">
                    <TrackedLink
                      href={siteConfig.links.catalog}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
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
                        Comprar com desconto
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