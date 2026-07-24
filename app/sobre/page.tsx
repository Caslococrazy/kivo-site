import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sobre",
  description:
    "A Kivo é uma agência de tráfego pago em Curitiba com atuação nacional. Operação enxuta, decisão por dado e contas tratadas como se fossem nossas.",
  path: "/sobre",
});

// TODO: revisar copy — nomes e cargos de placeholder até definição do time
const TIME = [
  { nome: "Matheus", cargo: "Fundador & Head de Performance" },
  { nome: "Nome Sobrenome", cargo: "Gestor(a) de Tráfego" },
  { nome: "Nome Sobrenome", cargo: "Analista de Dados" },
  { nome: "Nome Sobrenome", cargo: "Designer de Criativos" },
];

export default function SobrePage() {
  return (
    <>
      <section className="pt-[160px] pb-[70px] md:pt-[200px] md:pb-[100px]">
        <div className="wrap">
          <Reveal className="max-w-3xl">
            <div className="mb-4 text-[13px] text-faint">Sobre a Kivo</div>
            {/* TODO: revisar copy */}
            <h1 className="text-[clamp(30px,4vw,52px)] leading-[1.14]">
              Verba de mídia não é despesa. É o{" "}
              <span className="text-green">motor de crescimento</span> mais mensurável que existe —
              quando alguém opera direito.
            </h1>
            <div className="mt-10 space-y-6 text-[15.5px] leading-relaxed text-muted">
              <p>
                A Kivo nasceu de uma incomodação: verba queimada em campanha mal estruturada,
                relatório bonito escondendo conta que não fecha, e agência que fala em
                &ldquo;awareness&rdquo; quando o cliente pergunta sobre lucro.
              </p>
              <p>
                A gente opera diferente. Cada conta tem rastreamento validado antes do primeiro
                real investido. Cada decisão de verba tem um dado por trás. Cada relatório mostra
                o número que importa — quanto entrou, quanto voltou.
              </p>
              <p>
                Operação enxuta por escolha: poucas contas por gestor, pra cada uma ser tratada
                como se fosse nossa.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hair py-[70px] md:py-[100px]">
        <div className="wrap grid grid-cols-1 gap-12 md:grid-cols-3">
          <Reveal>
            <h2 className="mb-4 text-[13px] font-medium uppercase tracking-wider text-faint">
              Base
            </h2>
            <p className="text-[15px] text-ink">Curitiba, PR — Brasil</p>
            <p className="mt-2 text-[13.5px] text-muted">
              Atuação 100% nacional. Reuniões remotas, operação em tempo real, sem fronteira de
              CEP.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mb-4 text-[13px] font-medium uppercase tracking-wider text-faint">
              Como decidimos
            </h2>
            <p className="text-[13.5px] text-muted">
              Dado antes de opinião. Teste antes de certeza. Lucro antes de vaidade. Se uma métrica
              não muda uma decisão, ela não entra no relatório.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mb-4 text-[13px] font-medium uppercase tracking-wider text-faint">
              O que não fazemos
            </h2>
            <p className="text-[13.5px] text-muted">
              Não prometemos ROAS antes de ver a conta. Não operamos concorrentes diretos. Não
              seguramos cliente por contrato — seguramos por resultado.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hair py-[70px] md:py-[100px]">
        <div className="wrap">
          <Reveal className="mb-14">
            <div className="mb-4 text-[13px] text-faint">Time</div>
            <h2 className="text-[clamp(26px,3vw,38px)]">
              Pouca gente, <span className="text-green">muita conta escalada.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {TIME.map((pessoa, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="rounded-xl border border-hair p-6">
                  <div
                    className="mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-hair bg-[rgba(255,255,255,.03)]"
                    aria-hidden="true"
                  >
                    <span className="font-heading text-2xl font-light text-faint">
                      {pessoa.nome.charAt(0)}
                    </span>
                  </div>
                  <div className="text-[15px] font-medium text-ink">{pessoa.nome}</div>
                  <div className="mt-1 text-[13px] text-muted">{pessoa.cargo}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-hair py-[100px] md:py-[150px]">
        <Reveal className="wrap">
          <h2 className="mb-5 text-[clamp(30px,3.6vw,46px)]">
            Quer trabalhar com a gente — como <span className="text-green">cliente</span>?
          </h2>
          <p className="mb-10 max-w-[440px] text-muted">
            Começa com um diagnóstico gratuito da sua operação atual.
          </p>
          <Link href="/contato" className="btn px-[30px] py-3.5 text-[15px]">
            Falar com a Kivo
          </Link>
        </Reveal>
      </section>
    </>
  );
}
