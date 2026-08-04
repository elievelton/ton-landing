"use client"

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
              <span className="relative font-[family-name:var(--font-archivo-black)] text-2xl tracking-[-0.05em] sm:text-3xl">
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
              }}
            >
              <Button size="lg">
                Comprar com desconto
              </Button>
            </TrackedLink>
          </div>

          {/* Menu mobile */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Abrir menu"
                  />
                }
              >
                <Menu className="size-6" />
              </SheetTrigger>

              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <nav
                  className="mt-8 flex flex-col gap-6"
                  aria-label="Navegação mobile"
                >
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}

                  <TrackedLink
                    href={siteConfig.links.catalog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4"
                    tracking={{
                      event: "cta_click",
                      location: "header_mobile",
                      destination: "catalog",
                      label: "Comprar com desconto",
                    }}
                  >
                    <Button
                      size="lg"
                      className="w-full"
                    >
                      Comprar com desconto
                    </Button>
                  </TrackedLink>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  )
}