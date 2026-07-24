import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Método",
  description:
    "O método Kivo em quatro fases: diagnóstico e rastreamento, estrutura e criativos, ciclos de teste e escala composta. Semana a semana, com entregas claras.",
  path: "/metodo",
});

// TODO: revisar copy
const FASES = [
  {
    span: "Fase 1 · Semanas 1–2",
    title: "Diagnóstico & rastreamento",
    intro:
      "Antes de investir um real, garantimos que cada real será medido. Sem dado confiável, otimização é chute.",
    semanas: [
      {
        label: "Semana 1",
        itens: [
          "Auditoria completa das contas de anúncio e histórico de campanhas",
          "Análise do funil atual: páginas, ofertas e taxas de conversão",
          "Mapeamento de eventos e plano de rastreamento",
        ],
      },
      {
        label: "Semana 2",
        itens: [
          "Implementação de pixel e API de conversão",
          "Configuração de GA4, GTM e taxonomia de UTMs",
          "Dashboard de mídia configurado e validado",
        ],
      },
    ],
    checklist: [
      "Auditoria documentada com plano de ação",
      "Rastreamento validado ponta a ponta",
      "Dashboard em tempo real entregue",
      "Benchmark inicial registrado (o ponto 1,0x da curva)",
    ],
  },
  {
    span: "Fase 2 · Mês 1",
    title: "Estrutura & criativos",
    intro:
      "Campanhas montadas do jeito certo, com criativos e ofertas desenhados pro seu público. É a base da curva — feita pra aguentar escala.",
    semanas: [
      {
        label: "Semanas 3–4",
        itens: [
          "Estrutura de campanhas por objetivo e etapa de funil",
          "Definição da matriz de públicos e segmentações",
          "Briefing de criativos: ângulos, formatos e ganchos",
        ],
      },
      {
        label: "Semanas 4–6",
        itens: [
          "Primeiras campanhas no ar com verba controlada",
          "Páginas de destino revisadas ou reconstruídas",
          "Rotina de acompanhamento diário estabelecida",
        ],
      },
    ],
    checklist: [
      "Estrutura de conta documentada",
      "Matriz de teste de criativos ativa",
      "Páginas de conversão publicadas",
      "Primeiros dados de performance coletados",
    ],
  },
  {
    span: "Fase 3 · Meses 2–3",
    title: "Ciclos de teste",
    intro:
      "Testes rápidos de público, ângulo e página, em ciclos semanais. É aqui que a curva descola da linha azul — e o payback chega.",
    semanas: [
      {
        label: "Ciclo semanal",
        itens: [
          "Segunda: leitura de dados da semana e decisões de verba",
          "Terça–quinta: novos testes no ar (criativo, público ou página)",
          "Sexta: consolidação de aprendizados e briefing da próxima rodada",
        ],
      },
      {
        label: "Ao longo dos meses 2–3",
        itens: [
          "Corte rápido do que não performa — sem apego",
          "Duplicação e alimentação do que comprova resultado",
          "Refinamento de oferta com base em objeções reais",
        ],
      },
    ],
    checklist: [
      "Biblioteca de aprendizados por teste",
      "Criativos vencedores identificados e documentados",
      "Payback atingido (média histórica: mês 2–4)",
      "Custo de aquisição estabilizado",
    ],
  },
  {
    span: "Fase 4 · Mês 3+",
    title: "Escala composta",
    intro:
      "O que venceu recebe mais verba, o resultado realimenta o ciclo — e a curva vira exponencial. Escala sem quebrar o que funciona.",
    semanas: [
      {
        label: "Rotina de escala",
        itens: [
          "Aumento gradual de verba nos vencedores (20–30% por ciclo)",
          "Expansão de públicos semelhantes validados",
          "Novos canais avaliados com base em dados, não em moda",
        ],
      },
      {
        label: "Governança contínua",
        itens: [
          "Revisão mensal de estratégia com o cliente",
          "Auditoria trimestral de rastreamento",
          "Planejamento de sazonalidades e datas-chave",
        ],
      },
    ],
    checklist: [
      "Escala validada sem degradação de ROAS",
      "Melhor mês histórico dentro do primeiro trimestre (4 em 5 contas)",
      "Roadmap de crescimento para os próximos 6 meses",
      "Operação documentada — o conhecimento fica com você",
    ],
  },
];

export default function MetodoPage() {
  return (
    <>
      <section className="pt-[160px] pb-[60px] md:pt-[200px] md:pb-[80px]">
        <div className="wrap">
          <SectionHeading
            tag="Método"
            title={
              <>
                A curva não acontece por sorte. <span className="text-green">Ela é construída.</span>
              </>
            }
            description="Quatro fases, cada uma com entregas claras e prazo definido. É o mesmo processo em toda conta que operamos — porque é o que comprovadamente constrói a curva."
          />
        </div>
      </section>

      <div className="relative">
        <div
          className="pointer-events-none absolute bottom-0 left-8 top-0 hidden w-px md:left-1/2 md:block"
          style={{
            background:
              "linear-gradient(180deg, var(--green) 0%, rgba(35,229,109,.35) 60%, var(--hair) 100%)",
          }}
          aria-hidden="true"
        />

        {FASES.map((fase, i) => (
          <section key={fase.title} className="border-t border-hair py-[70px] md:py-[100px]">
            <div className="wrap">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
                <Reveal className={i % 2 === 1 ? "md:order-2" : ""}>
                  <span className="font-num text-xs tracking-[.04em] text-green">{fase.span}</span>
                  <h2 className="mt-3 text-[clamp(26px,3vw,38px)] leading-tight">{fase.title}</h2>
                  <p className="mt-5 text-muted">{fase.intro}</p>

                  <div className="mt-8">
                    <h3 className="mb-4 text-[13px] font-medium uppercase tracking-wider text-faint">
                      Checklist de entregas
                    </h3>
                    <ul className="space-y-3">
                      {fase.checklist.map((c) => (
                        <li key={c} className="flex gap-3 text-[13.5px] text-muted">
                          <svg
                            className="mt-1 h-3.5 w-3.5 shrink-0"
                            viewBox="0 0 14 14"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle cx="7" cy="7" r="6" stroke="#23E56D" strokeWidth="1.5" />
                            <path
                              d="M4.5 7l1.8 1.8L9.8 5.3"
                              stroke="#23E56D"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.1} className={`space-y-8 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  {fase.semanas.map((s) => (
                    <div key={s.label} className="border-t border-hair pt-6">
                      <h3 className="mb-4 font-num text-xs tracking-[.04em] text-ink">{s.label}</h3>
                      <ul className="space-y-3">
                        {s.itens.map((item) => (
                          <li key={item} className="flex gap-3 text-[13.5px] text-muted">
                            <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-green" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="border-t border-hair py-[100px] md:py-[150px]">
        <Reveal className="wrap">
          <h2 className="mb-5 text-[clamp(30px,3.6vw,46px)]">
            Pronto pra começar a <span className="text-green">fase 1</span>?
          </h2>
          <p className="mb-10 max-w-[440px] text-muted">
            O diagnóstico gratuito já é o primeiro passo do método — sem compromisso.
          </p>
          <Link href="/contato" className="btn px-[30px] py-3.5 text-[15px]">
            Agendar diagnóstico gratuito
          </Link>
        </Reveal>
      </section>
    </>
  );
}
