import type { Metadata } from "next"
import Link from "next/link"

import { Container } from "@/components/shared/Container"

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Conheça a Política de Privacidade do Maquininha com Cupom e saiba como tratamos dados pessoais, cookies e informações de navegação.",
}

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="bg-background">
      <Container>
        <article className="mx-auto max-w-4xl py-16 sm:py-20">
          <div className="mb-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">
              Privacidade e transparência
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Política de Privacidade
            </h1>

            <p className="mt-4 text-muted">
              Última atualização: 3 de agosto de 2026
            </p>
          </div>

          <div className="space-y-10 text-base leading-8 text-muted">
            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                1. Sobre esta Política de Privacidade
              </h2>

              <p>
                Esta Política de Privacidade explica como o site Maquininha
                com Cupom trata informações relacionadas aos usuários durante
                a utilização do site, incluindo dados fornecidos
                voluntariamente, informações técnicas de navegação e dados
                eventualmente coletados por tecnologias de medição,
                publicidade e cookies.
              </p>

              <p className="mt-4">
                O tratamento de dados pessoais é realizado buscando observar
                a legislação brasileira aplicável, especialmente a Lei nº
                13.709/2018, conhecida como Lei Geral de Proteção de Dados
                Pessoais (LGPD).
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                2. Sobre o Maquininha com Cupom
              </h2>

              <p>
                O Maquininha com Cupom é um site independente destinado à
                divulgação de informações, ofertas, condições comerciais e
                links relacionados a maquininhas de cartão e serviços
                apresentados no site.
              </p>

              <p className="mt-4">
                O site pode utilizar links de parceiro, indicação ou
                redirecionamento para páginas de terceiros. Ao realizar uma
                compra ou contratação por meio desses links, o responsável
                pelo site poderá receber comissão ou outra forma de
                remuneração, sem necessariamente gerar custo adicional ao
                usuário.
              </p>

              <p className="mt-4">
                Marcas, nomes comerciais, logotipos e produtos de terceiros
                mencionados no site pertencem aos seus respectivos
                proprietários. Salvo quando expressamente informado, este
                site não deve ser confundido com o site institucional oficial
                das empresas e marcas mencionadas.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                3. Informações que podem ser coletadas
              </h2>

              <p>
                Dependendo dos recursos utilizados no site, poderão ser
                tratados dados e informações como:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  informações fornecidas voluntariamente pelo usuário ao
                  entrar em contato;
                </li>

                <li>
                  endereço IP e informações técnicas relacionadas à conexão;
                </li>

                <li>
                  tipo de navegador, dispositivo e sistema operacional;
                </li>

                <li>
                  páginas acessadas e interações realizadas no site;
                </li>

                <li>
                  origem do acesso, data e horário da navegação;
                </li>

                <li>
                  informações relacionadas ao desempenho e funcionamento do
                  site;
                </li>

                <li>
                  identificadores e informações armazenadas por cookies ou
                  tecnologias semelhantes, quando aplicáveis.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                4. Finalidades do tratamento
              </h2>

              <p>
                As informações poderão ser utilizadas para finalidades
                legítimas relacionadas ao funcionamento e desenvolvimento do
                site, incluindo:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>fornecer e manter o funcionamento do site;</li>

                <li>melhorar a experiência de navegação;</li>

                <li>medir desempenho e audiência;</li>

                <li>entender como os usuários interagem com o conteúdo;</li>

                <li>identificar e corrigir problemas técnicos;</li>

                <li>
                  mensurar resultados de campanhas e ações de marketing;
                </li>

                <li>
                  prevenir fraudes, abusos e atividades que possam
                  comprometer a segurança do site;
                </li>

                <li>
                  responder solicitações encaminhadas pelos usuários.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                5. Cookies e tecnologias semelhantes
              </h2>

              <p>
                O site poderá utilizar cookies e tecnologias semelhantes para
                permitir funcionalidades, lembrar determinadas preferências,
                analisar tráfego, medir desempenho e compreender a utilização
                das páginas.
              </p>

              <p className="mt-4">
                Alguns cookies podem ser necessários para o funcionamento do
                site, enquanto outros podem estar relacionados a medição,
                análise ou publicidade.
              </p>

              <p className="mt-4">
                Quando aplicável, o usuário poderá controlar determinadas
                categorias de cookies por meio das opções de consentimento
                disponibilizadas no site e também pelas configurações do seu
                navegador.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                6. Google Analytics e Google Ads
              </h2>

              <p>
                O Maquininha com Cupom poderá utilizar serviços de medição e
                publicidade fornecidos pelo Google, incluindo Google
                Analytics e Google Ads.
              </p>

              <p className="mt-4">
                Essas tecnologias podem ser utilizadas para compreender a
                utilização do site, medir conversões, avaliar o desempenho de
                campanhas publicitárias e, quando permitido e aplicável,
                oferecer publicidade mais relevante.
              </p>

              <p className="mt-4">
                O uso dessas tecnologias poderá envolver cookies,
                identificadores e outras informações técnicas, de acordo com
                as configurações adotadas no site e as políticas dos
                respectivos fornecedores.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                7. Links e serviços de terceiros
              </h2>

              <p>
                O site contém links que direcionam o usuário para páginas e
                serviços administrados por terceiros.
              </p>

              <p className="mt-4">
                Ao acessar um site externo, o tratamento das informações passa
                a estar sujeito também às políticas, termos e práticas de
                privacidade do respectivo terceiro.
              </p>

              <p className="mt-4">
                Recomendamos que o usuário consulte as políticas de
                privacidade e os termos aplicáveis aos serviços externos antes
                de fornecer dados pessoais ou concluir uma contratação.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                8. Compartilhamento de informações
              </h2>

              <p>
                Informações poderão ser tratadas ou compartilhadas com
                fornecedores necessários para a operação do site, como
                serviços de hospedagem, infraestrutura, segurança, análise de
                dados e publicidade.
              </p>

              <p className="mt-4">
                Também poderá ocorrer compartilhamento quando necessário para
                cumprimento de obrigação legal ou regulatória, exercício
                regular de direitos ou atendimento de determinação de
                autoridade competente.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                9. Segurança
              </h2>

              <p>
                São adotadas medidas razoáveis destinadas a proteger as
                informações tratadas pelo site contra acessos não autorizados,
                perda, alteração ou divulgação indevida.
              </p>

              <p className="mt-4">
                Entretanto, nenhum sistema conectado à internet pode oferecer
                garantia absoluta de segurança.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                10. Direitos dos titulares
              </h2>

              <p>
                Nos casos previstos pela legislação aplicável, o titular de
                dados pessoais poderá solicitar informações e exercer os
                direitos previstos na LGPD, incluindo, conforme aplicável,
                confirmação da existência de tratamento, acesso, correção,
                eliminação, anonimização, bloqueio e demais direitos
                legalmente previstos.
              </p>

              <p className="mt-4">
                Solicitações relacionadas à privacidade podem ser enviadas
                para{" "}
                <a
                  href="mailto:contato@maquininhacomcupom.com.br"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  contato@maquininhacomcupom.com.br
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                11. Retenção de informações
              </h2>

              <p>
                As informações poderão ser mantidas pelo período necessário
                para atender às finalidades para as quais foram tratadas,
                cumprir obrigações legais ou regulatórias e exercer direitos,
                observados os requisitos da legislação aplicável.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                12. Alterações nesta Política
              </h2>

              <p>
                Esta Política de Privacidade poderá ser atualizada para
                refletir alterações no site, nos serviços utilizados ou na
                legislação aplicável.
              </p>

              <p className="mt-4">
                A versão mais recente permanecerá disponível nesta página,
                acompanhada da respectiva data de atualização.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">
                13. Contato
              </h2>

              <p>
                Para dúvidas, solicitações ou assuntos relacionados à
                privacidade e proteção de dados, entre em contato pelo e-mail:
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

            <div className="border-t border-border pt-8">
              <Link
                href="/"
                className="font-semibold text-primary transition-opacity hover:opacity-70"
              >
                ← Voltar para a página inicial
              </Link>
            </div>
          </div>
        </article>
      </Container>
    </main>
  )
}