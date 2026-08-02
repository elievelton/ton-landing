"use client"

import Link from "next/link"
import { Menu } from "lucide-react"

import { Container } from "@/components/shared/Container"
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
  { label: "Benefícios", href: "#beneficios" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "FAQ", href: "#faq" },
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
            <span className="text-2xl font-black tracking-tight text-primary">
              Representante Ton
            </span>
          </Link>

          {/* Navegação desktop */}
          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Navegação principal"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden lg:block">
            <a
              href={siteConfig.links.catalog}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">
                Comprar com desconto
              </Button>
            </a>
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

                  <a
                    href={siteConfig.links.catalog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4"
                  >
                    <Button
                      size="lg"
                      className="w-full"
                    >
                      Comprar com desconto
                    </Button>
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  )
}