import { Mail } from "lucide-react"

import { Container } from "@/components/shared/Container"
import { siteConfig } from "@/config/site"

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <a href="#" className="inline-flex flex-col">
              <span className="text-xl font-black tracking-tight text-primary">
                Consultor Ton
              </span>

              <span className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                Máquinas & soluções
              </span>
            </a>

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
              <a
                href="#maquinas"
                className="transition-colors hover:text-primary"
              >
                Máquinas
              </a>

              <a
                href="#planos"
                className="transition-colors hover:text-primary"
              >
                Planos e taxas
              </a>

              <a
                href="#consultor"
                className="transition-colors hover:text-primary"
              >
                Por que comprar comigo?
              </a>

              <a
                href="#quem-somos"
                className="transition-colors hover:text-primary"
              >
                Quem somos
              </a>

              <a
                href="#duvidas"
                className="transition-colors hover:text-primary"
              >
                Perguntas frequentes
              </a>
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

        {/* Rodapé inferior */}
        <div className="flex flex-col gap-4 border-t border-border py-6 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
  <p>
    © {new Date().getFullYear()} Consultor Ton. Todos os direitos
    reservados.
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
            Esta é uma página de consultor independente. Preços, taxas,
            promoções e demais condições estão sujeitos às regras e alterações
            da Ton.
          </p>
        </div>
      </Container>
    </footer>
  )
}