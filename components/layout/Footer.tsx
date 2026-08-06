import Link from "next/link"
import { Mail } from "lucide-react"

import { Container } from "@/components/shared/Container"
import { CookieSettingsButton } from "@/components/shared/CookieSettingsButton"
import { siteConfig } from "@/config/site"

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <Link href="/" className="inline-flex flex-col">
              <span className="font-[family-name:var(--font-archivo-black)] text-xl tracking-tight">
                <span className="text-foreground">Parceiro</span>{" "}
                <span className="text-primary">Ton</span>
              </span>

              <span className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                Máquinas & soluções
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              Informação, experiência e condições especiais para ajudar você
              a escolher a solução Ton mais adequada para o seu negócio.
            </p>

            <p className="mt-4 text-sm font-semibold text-foreground">
              Venda parcelado. Receba à vista.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <p className="text-sm font-bold text-foreground">
              Navegação
            </p>

            <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-muted">
              <Link
                href="/#maquinas"
                className="transition-colors hover:text-primary"
              >
                Máquinas
              </Link>

              <Link
                href="/#planos"
                className="transition-colors hover:text-primary"
              >
                Planos e taxas
              </Link>

              <Link
                href="/#consultor"
                className="transition-colors hover:text-primary"
              >
                Por que comprar comigo?
              </Link>

              <Link
                href="/#quem-somos"
                className="transition-colors hover:text-primary"
              >
                Quem somos
              </Link>

              <Link
                href="/#duvidas"
                className="transition-colors hover:text-primary"
              >
                Perguntas frequentes
              </Link>
            </nav>
          </div>

          {/* Contato */}
          <div>
            <p className="text-sm font-bold text-foreground">
              Precisa de ajuda?
            </p>

            <p className="mt-4 text-sm leading-6 text-muted">
              Ficou com alguma dúvida antes de escolher sua maquininha?
              Entre em contato comigo.
            </p>

            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
            >
              <Mail className="size-4" />

              {siteConfig.email}
            </a>
          </div>
        </div>

        {/* Links legais */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border py-4 text-xs font-medium text-muted">
          <Link
            href="/politica-de-privacidade"
            className="transition-colors hover:text-primary"
          >
            Política de Privacidade
          </Link>

          <span aria-hidden="true">•</span>

          <Link
            href="/termos-de-uso"
            className="transition-colors hover:text-primary"
          >
            Termos de Uso
          </Link>

          <span aria-hidden="true">•</span>

          <CookieSettingsButton />
        </div>

        {/* Rodapé inferior */}
        <div className="flex flex-col gap-4 border-t border-border py-6 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p>
              © {new Date().getFullYear()} Maquininha com Cupom. Todos os
              direitos reservados.
            </p>

            <p>
              Desenvolvido por{" "}
              <a
                href="https://elievelto.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary transition-opacity hover:opacity-70"
              >
                Elievelto
              </a>
            </p>
          </div>

          <p className="max-w-xl sm:text-right">
            Este site atua como um canal de indicação independente. Não realizamos cobranças 
            por aqui; apenas garantimos e aplicamos o seu cupom de desconto exclusivo. Todas as 
            transações, garantias e entregas são processadas diretamente no site oficial da Ton.
          </p>
        </div>
      </Container>
    </footer>
  )
}