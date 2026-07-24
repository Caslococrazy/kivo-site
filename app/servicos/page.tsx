import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Serviços",
  description:
    "Meta Ads, Google Ads, Funis & CRO e Dados & Rastreamento. Os quatro pilares da operação de tráfego pago da Kivo, com entregáveis claros por frente.",
  path: "/servicos",
});

// TODO: revisar copy
const PILARES = [
  {
    id: "meta-ads",
    title: "Meta Ads",
    oQueFaz:
      "Operação completa de Facebook e Instagram Ads: estrutura de campanha, segmentação de públicos, testes de criativo em ciclos curtos e escala do que comprova resultado.",
    entregaveis: [
      "Estrutura de campanhas por objetivo de funil",
      "Matriz de teste de criativos e ângulos",
      "Relatório semanal de performance e decisões",
      "Rotina de otimização de verba entre conjuntos",
    ],
    ferramentas: ["Meta Business Suite", "Ads Manager", "API de Conversão", "Meta Pixel"],
    praQuem:
      "E-commerces, infoprodutos e serviços com oferta validada que precisam de volume e consistência de aquisição.",
  },
  {
    id: "google-ads",
    title: "Google Ads",
    oQueFaz:
      "Captura de demanda no momento exato da busca: Search para intenção quente, PMax para cobertura de rede e YouTube para construção e remarketing.",
    entregaveis: [
      "Estrutura de campanhas Search por intenção",
      "Campanhas PMax com feed otimizado",
      "Estratégia de lances por margem, não por clique",
      "Relatório de termos de busca e negativação contínua",
    ],
    ferramentas: ["Google Ads", "Merchant Center", "Google Analytics 4", "Looker Studio"],
    praQuem:
      "Negócios com demanda ativa de busca — serviços de ticket alto, e-commerce e negócios locais.",
  },
  {
    id: "funis-cro",
    title: "Funis & CRO",
    oQueFaz:
      "Desenho e otimização das páginas e etapas que transformam clique em venda. Clique caro só é caro quando não converte.",
    entregaveis: [
      "Auditoria de funil com mapa de vazamentos",
      "Wireframe e copy de páginas de conversão",
      "Testes A/B priorizados por impacto",
      "Documentação de aprendizados por teste",
    ],
    ferramentas: ["Hotjar", "Google Optimize alternativas", "Figma", "Unbounce / páginas próprias"],
    praQuem:
      "Operações que já têm tráfego mas convertem abaixo do potencial — ou que vão escalar verba e precisam de base sólida.",
  },
  {
    id: "dados-rastreamento",
    title: "Dados & Rastreamento",
    oQueFaz:
      "Infraestrutura de mensuração: pixel, API de conversão, eventos padronizados e dashboards que mostram o que importa em tempo real.",
    entregaveis: [
      "Implementação de pixel + API de conversão",
      "Plano de eventos e taxonomia de UTMs",
      "Dashboard executivo de mídia em tempo real",
      "Auditoria trimestral de qualidade de dados",
    ],
    ferramentas: ["Google Tag Manager", "GA4", "Looker Studio", "Stape / server-side tagging"],
    praQuem:
      "Qualquer operação que investe em mídia — sem rastreamento confiável, toda decisão de verba é aposta.",
  },
];

// TODO: revisar copy
const FAQ = [
  {
    question: "Qual a verba mínima pra trabalhar com a Kivo?",
    answer:
      "Operamos contas a partir de R$ 5 mil/mês de investimento em mídia. Abaixo disso, o ciclo de teste fica lento demais pra gerar aprendizado estatístico e o custo de gestão não se paga.",
  },
  {
    question: "Em quanto tempo vejo resultado?",
    answer:
      "As primeiras semanas são de diagnóstico, rastreamento e estrutura. Os ciclos de teste começam no primeiro mês e o payback médio das contas fica entre o mês 2 e o mês 4, dependendo da verba e da maturidade da oferta.",
  },
  {
    question: "Qual ROAS posso esperar?",
    answer:
      "Depende de margem, ticket e maturidade da oferta. A média das contas gerenciadas é 3,4x, mas tratamos ROAS como consequência de funil e oferta bem resolvidos — não como promessa de entrada.",
  },
  {
    question: "Vocês atendem concorrentes do meu nicho?",
    answer:
      "Não operamos contas concorrentes diretas simultaneamente. Exclusividade de nicho por região é parte do contrato.",
  },
  {
    question: "Como funciona o contrato?",
    answer:
      "Contrato inicial de 3 meses — tempo mínimo pra rodar o ciclo completo de diagnóstico, estrutura e teste. Depois disso, renovação mensal sem fidelidade.",
  },
  {
    question: "A verba de mídia está inclusa no fee?",
    answer:
      "Não. A verba de mídia é investida diretamente nas suas contas de anúncio (Meta, Google), que permanecem suas. O fee da Kivo remunera a operação e a estratégia.",
  },
  {
    question: "Vocês criam os criativos?",
    answer:
      "Direcionamos roteiro, ângulo e formato de cada criativo com base nos dados dos testes. A produção pode ser feita pelo seu time com nosso briefing ou por parceiros de produção que indicamos.",
  },
  {
    question: "Preciso ter site ou landing page pronta?",
    answer:
      "Não necessariamente. Se a sua página atual não sustenta conversão, a frente de Funis & CRO desenha e implementa as páginas antes de escalar a verba.",
  },
];

export default function ServicosPage() {
  return (
    <>
      <section className="pt-[160px] pb-[60px] md:pt-[200px] md:pb-[80px]">
        <div className="wrap">
          <SectionHeading
            tag="Serviços"
            title={
              <>
                Quatro frentes, <span className="text-green">um objetivo</span>: escala com lucro.
              </>
            }
            description="Cada pilar existe pra resolver um gargalo específico da operação de mídia. Juntos, formam o sistema completo — do clique ao dado que orienta a próxima decisão."
          />
        </div>
      </section>

      {PILARES.map((p, idx) => (
        <section
          key={p.id}
          id={p.id}
          className="border-t border-hair py-[70px] md:py-[100px]"
        >
          <div className="wrap">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
              <Reveal>
                <span className="font-num text-xs tracking-[.04em] text-green">
                  0{idx + 1}
                </span>
                <h2 className="mt-3 text-[clamp(26px,3vw,38px)] leading-tight">{p.title}</h2>
                <p className="mt-5 text-muted">{p.oQueFaz}</p>
              </Reveal>
              <Reveal delay={0.1} className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-[13px] font-medium uppercase tracking-wider text-faint">
                    Entregáveis
                  </h3>
                  <ul className="space-y-3">
                    {p.entregaveis.map((e) => (
                      <li key={e} className="flex gap-3 text-[13.5px] text-muted">
                        <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-green" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-4 text-[13px] font-medium uppercase tracking-wider text-faint">
                      Ferramentas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {p.ferramentas.map((f) => (
                        <span
                          key={f}
                          className="rounded-md border border-hair px-3 py-1.5 font-num text-xs text-muted"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 text-[13px] font-medium uppercase tracking-wider text-faint">
                      Pra quem é
                    </h3>
                    <p className="text-[13.5px] text-muted">{p.praQuem}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-hair py-[90px] md:py-[130px]">
        <div className="wrap">
          <SectionHeading
            tag="Perguntas frequentes"
            title="O que todo mundo pergunta antes de fechar."
          />
          <Reveal>
            <Accordion items={FAQ} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hair py-[100px] md:py-[150px]">
        <Reveal className="wrap">
          <h2 className="mb-5 text-[clamp(30px,3.6vw,46px)]">
            Não sabe qual frente é o seu gargalo?
          </h2>
          <p className="mb-10 max-w-[440px] text-muted">
            O diagnóstico gratuito aponta exatamente onde a sua operação perde dinheiro hoje.
          </p>
          <Link href="/contato" className="btn px-[30px] py-3.5 text-[15px]">
            Agendar diagnóstico gratuito
          </Link>
        </Reveal>
      </section>
    </>
  );
}
