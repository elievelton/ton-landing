import type { Metadata } from "next"
import Link from "next/link"

import { Container } from "@/components/shared/Container"

export const metadata: Metadata = {
  title: "Termos de Uso",

  description:
    "Consulte os Termos de Uso do Maquininha com Cupom e entenda as condições de utilização do site, ofertas, cupons e links de parceiros.",

  alternates: {
    canonical: "/termos-de-uso",
  },
}

export default function TermosDeUsoPage() {
  return (
    <main className="bg-background">
      <Container>
        <article className="mx-auto max-w-4xl py-16 sm:py-20">
          <div className="mb-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">
              Transparência e segurança
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Termos de Uso
            </h1>

            <p className="mt-4 text-muted">
              Última atualização: 3 de agosto de 2026
            </p>
          </div>

          <div className="space-y-10 text-base leading-8 text-muted">
            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                1. Aceitação dos Termos
              </h2>

              <p>
                Estes Termos de Uso estabelecem as condições aplicáveis ao
                acesso e à utilização do site Maquininha com Cupom.
              </p>

              <p className="mt-4">
                Ao utilizar este site, o usuário declara estar ciente das
                condições apresentadas nesta página. Caso não concorde com
                estes Termos, recomendamos que interrompa a utilização do
                site.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                2. Sobre o Maquininha com Cupom
              </h2>

              <p>
                O Maquininha com Cupom é um site independente voltado à
                divulgação de informações, comparações, condições comerciais,
                cupons, ofertas e links relacionados a maquininhas de cartão
                e serviços apresentados no site.
              </p>

              <p className="mt-4">
                O objetivo do site é auxiliar o usuário a conhecer diferentes
                modelos, características, condições e oportunidades antes de
                acessar os canais responsáveis pela compra ou contratação.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                3. Relação com marcas e empresas mencionadas
              </h2>

              <p>
                O site poderá apresentar produtos, serviços, marcas, nomes
                comerciais e materiais pertencentes a terceiros, incluindo
                produtos e serviços da Ton.
              </p>

              <p className="mt-4">
                O Maquininha com Cupom não deve ser confundido com o site
                institucional oficial da Ton ou de outras empresas
                eventualmente mencionadas.
              </p>

              <p className="mt-4">
                As marcas, nomes comerciais, logotipos, produtos e demais
                sinais distintivos pertencem aos seus respectivos
                proprietários.
              </p>

              <p className="mt-4">
                Quando houver relação de parceria, indicação ou atividade
                comercial relacionada a determinado produto ou serviço, essa
                condição poderá resultar em remuneração ou comissão ao
                responsável pelo site.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                4. Ofertas, descontos e cupons
              </h2>

              <p>
                O Maquininha com Cupom poderá divulgar ofertas, cupons,
                descontos e outras condições promocionais disponibilizadas
                por empresas parceiras ou pelos respectivos fornecedores dos
                produtos e serviços.
              </p>

              <p className="mt-4">
                Preços, percentuais de desconto, taxas, planos,
                disponibilidade de produtos, condições de pagamento,
                benefícios e demais condições comerciais podem ser alterados
                pelos respectivos fornecedores sem aviso prévio.
              </p>

              <p className="mt-4">
                Por esse motivo, as condições definitivas aplicáveis à compra
                ou contratação serão aquelas apresentadas na página do
                fornecedor no momento em que o usuário concluir a operação.
              </p>

              <p className="mt-4">
                Sempre recomendamos que o usuário confira o preço final, o
                desconto aplicado e as demais condições antes de concluir uma
                compra ou contratação.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                5. Links de parceiros e redirecionamentos
              </h2>

              <p>
                Alguns botões e links disponíveis no site direcionam o
                usuário para páginas administradas por terceiros.
              </p>

              <p className="mt-4">
                Esses links poderão conter identificadores de indicação,
                parceria, campanha ou cupom, permitindo atribuir determinada
                visita ou contratação ao Maquininha com Cupom.
              </p>

              <p className="mt-4">
                Quando o usuário realiza uma compra ou contratação por meio
                desses links, o responsável pelo site poderá receber uma
                comissão ou outra forma de remuneração, sem necessariamente
                gerar custo adicional ao usuário.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                6. Compras e contratações
              </h2>

              <p>
                O Maquininha com Cupom não processa diretamente pagamentos,
                emissão de maquininhas, análise cadastral, aprovação de
                contas, entrega de produtos ou demais procedimentos
                relacionados à contratação dos serviços divulgados, salvo se
                expressamente informado em situação específica.
              </p>

              <p className="mt-4">
                A compra ou contratação é realizada nos canais do respectivo
                fornecedor, que será responsável pelas condições comerciais,
                pagamento, aprovação, entrega, suporte e demais obrigações
                relacionadas ao produto ou serviço contratado.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                7. Informações apresentadas no site
              </h2>

              <p>
                Buscamos manter as informações apresentadas no Maquininha com
                Cupom claras e atualizadas.
              </p>

              <p className="mt-4">
                Entretanto, preços, taxas, planos, descontos, características
                de produtos e outras condições podem sofrer alterações por
                decisão dos respectivos fornecedores.
              </p>

              <p className="mt-4">
                Em caso de divergência entre uma informação apresentada neste
                site e a condição exibida pelo fornecedor no momento da
                contratação, recomendamos considerar e verificar a condição
                apresentada diretamente pelo fornecedor antes de concluir a
                operação.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                8. Uso adequado do site
              </h2>

              <p>
                O usuário concorda em utilizar o site de maneira lícita e de
                forma que não prejudique seu funcionamento, sua segurança ou
                a experiência de outros usuários.
              </p>

              <p className="mt-4">
                Não é permitido tentar acessar áreas restritas, explorar
                vulnerabilidades, interferir no funcionamento do site ou
                utilizar seus recursos para atividades ilícitas.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                9. Propriedade intelectual
              </h2>

              <p>
                Os conteúdos próprios do Maquininha com Cupom, incluindo
                textos, organização, elementos gráficos e demais materiais
                produzidos especificamente para o site, são protegidos pela
                legislação aplicável.
              </p>

              <p className="mt-4">
                Marcas, imagens, nomes comerciais e materiais pertencentes a
                terceiros permanecem sujeitos aos direitos de seus
                respectivos proprietários.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                10. Serviços e sites de terceiros
              </h2>

              <p>
                Após o usuário acessar um link externo, sua navegação passa a
                ocorrer em ambiente administrado por terceiros.
              </p>

              <p className="mt-4">
                Esses serviços possuem seus próprios termos de uso, políticas
                de privacidade, procedimentos de segurança e condições
                comerciais.
              </p>

              <p className="mt-4">
                Recomendamos a leitura dessas informações antes de fornecer
                dados pessoais, realizar pagamentos ou concluir uma
                contratação.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                11. Privacidade e proteção de dados
              </h2>

              <p>
                O tratamento de informações relacionadas à utilização do site
                é explicado em nossa Política de Privacidade.
              </p>

              <p className="mt-4">
                Você pode consultar a{" "}
                <Link
                  href="/politica-de-privacidade"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Política de Privacidade
                </Link>{" "}
                para obter mais informações.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                12. Limitação de responsabilidade
              </h2>

              <p>
                O Maquininha com Cupom atua principalmente como canal
                informativo e de direcionamento para ofertas e serviços de
                terceiros.
              </p>

              <p className="mt-4">
                Questões relacionadas à aprovação de cadastro, processamento
                de pagamentos, entrega, funcionamento de produtos, taxas,
                planos, suporte, cancelamentos, reembolsos ou demais aspectos
                da contratação deverão observar as condições e os canais de
                atendimento do respectivo fornecedor.
              </p>

              <p className="mt-4">
                Nada nestes Termos busca excluir responsabilidades que não
                possam ser legalmente excluídas ou limitar direitos
                assegurados pela legislação aplicável.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                13. Alterações nos Termos de Uso
              </h2>

              <p>
                Estes Termos poderão ser atualizados para refletir mudanças no
                site, nos serviços oferecidos, nas relações comerciais ou na
                legislação aplicável.
              </p>

              <p className="mt-4">
                A versão mais recente permanecerá disponível nesta página,
                acompanhada da respectiva data de atualização.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                14. Contato
              </h2>

              <p>
                Em caso de dúvidas relacionadas a estes Termos de Uso, entre
                em contato pelo e-mail:
              </p>

              <p className="mt-3">
                <a
                  href="mailto:contato@maquininhacomcupom.com.br"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  contato@maquininhacomcupom.com.br
                </a>
              </p>
            </section>

            <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-8">
              <Link
                href="/"
                className="font-semibold text-primary transition-opacity hover:opacity-70"
              >
                ← Voltar para a página inicial
              </Link>

              <Link
                href="/politica-de-privacidade"
                className="font-semibold text-primary transition-opacity hover:opacity-70"
              >
                Política de Privacidade
              </Link>
            </div>
          </div>
        </article>
      </Container>
    </main>
  )
}