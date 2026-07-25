import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  HeroBackgroundLazy as HeroBackground,
  GrowthChartLazy as GrowthChart,
} from "@/components/lazy";
import { buildMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Kivo — Tráfego pago & performance",
  description:
    "Agência de gestão de tráfego pago em Curitiba. Meta Ads, Google Ads, funis e dados para escalar marcas com previsibilidade. R$ 42M+ investidos, +50 marcas escaladas.",
  path: "/",
});

const HERO_STATS = [
  { value: "R$ 42M", suffix: "+", label: "investidos em\nredes sociais" },
  { value: "", suffix: "+50", label: "marcas escaladas com\nalta performance" },
  { value: "3,4", suffix: "x", label: "ROAS médio nas\ncontas gerenciadas" },
];

const METHOD_STEPS = [
  {
    span: "Semanas 1–2",
    title: "Diagnóstico & rastreamento",
    text: "Auditoria das contas, instalação de pixel e API de conversão. Antes de investir, garantimos que cada real será medido.",
  },
  {
    span: "Mês 1",
    title: "Estrutura & criativos",
    text: "Campanhas montadas do jeito certo, com criativos e ofertas desenhados pro seu público — a base da curva.",
  },
  {
    span: "Meses 2–3",
    title: "Ciclos de teste",
    text: "Testes rápidos de público, ângulo e página. É aqui que a curva descola da linha cinza e o payback chega.",
  },
  {
    span: "Mês 3+",
    title: "Escala composta",
    text: "O que venceu recebe mais verba, o resultado realimenta o ciclo — e a curva vira exponencial.",
  },
];

const SERVICOS = [
  {
    title: "Meta Ads",
    text: "Estruturas de campanha, públicos e criativos testados em ciclos curtos pra achar o que escala.",
  },
  {
    title: "Google Ads",
    text: "Captura de demanda no momento exato: Search, PMax e YouTube com intenção e lucro no centro.",
  },
  {
    title: "Funis & CRO",
    text: "Páginas e ofertas desenhadas pra converter — clique caro só é caro quando não vira venda.",
  },
  {
    title: "Dados & Rastreamento",
    text: "Pixel, API de conversão e dashboards em tempo real. Decisão por dado, nunca por achismo.",
  },
];

const NUMEROS = [
  { value: "98", suffix: "%", text: "de retenção dos clientes após os primeiros 6 meses de operação" },
  { value: "−37", suffix: "%", text: "de redução média no CPL nos primeiros 90 dias de gestão" },
  { value: "4", suffix: " em 5", text: "contas atingem o melhor mês histórico dentro do primeiro trimestre" },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />

      <header id="top" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-[120px]">
        <HeroBackground />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 70% at 50% 42%, transparent 30%, rgba(6,9,7,.55) 100%), linear-gradient(180deg, rgba(6,9,7,.35) 0%, rgba(6,9,7,.1) 40%, var(--bg) 98%)",
          }}
        />

        <div className="wrap relative z-[2] flex flex-1 flex-col items-center justify-center text-center">
          <div className="logo-intro logo-shine">
            <Logo
              size={110}
              href={null}
              ariaHidden
              className="text-[clamp(110px,19vw,280px)] leading-none [filter:drop-shadow(0_12px_60px_rgba(0,0,0,.55))]"
            />
            <span className="logo-glint" aria-hidden="true">
              <Logo
                size={110}
                href={null}
                ariaHidden
                className="text-[clamp(110px,19vw,280px)] leading-none"
              />
            </span>
          </div>
          <p className="mx-auto my-6 max-w-[460px] text-[clamp(15px,1.4vw,17px)] tracking-[.005em] text-muted">
            Escalando ofertas e empresas no mercado.
          </p>
          <div className="flex items-center justify-center gap-7">
            <Link href="/contato" className="btn">
              Quero escalar minha marca
            </Link>
          </div>
        </div>

        <div className="wrap relative z-[2]">
          <div className="mt-20 flex flex-col items-center gap-8 border-t border-hair pt-9 pb-14 text-center md:flex-row md:justify-center md:gap-[clamp(40px,8vw,96px)]">
            {HERO_STATS.map((s, i) => (
              <div key={i}>
                <div className="num text-[clamp(32px,3.4vw,42px)] font-normal leading-none tracking-[-.02em] text-ink">
                  {s.value}
                  <i className="not-italic text-green">{s.suffix}</i>
                </div>
                <p className="mt-3 whitespace-pre-line text-[12.5px] leading-relaxed tracking-[.01em] text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section id="resultado" className="border-t border-hair py-[90px] md:py-[130px]">
        <div className="wrap">
          <SectionHeading
            tag="Com tráfego × sem tráfego"
            title={
              <>
                A diferença entre <span className="text-green">crescer</span> e apenas existir.
              </>
            }
            description="Crescimento orgânico é lento e imprevisível. Tráfego pago bem operado é composto: cada real investido alimenta o próximo ciclo. Ajuste o investimento e veja até onde dá pra ir."
          />
          <Reveal>
            <GrowthChart />
          </Reveal>
        </div>
      </section>

      <section id="metodo" className="border-t border-hair py-[90px] md:py-[130px]">
        <div className="wrap">
          <SectionHeading
            tag="A curva na prática"
            title={
              <>
                Cada fase do gráfico é uma <span className="text-green">etapa do método.</span>
              </>
            }
            description="A curva não acontece por sorte. Ela é construída em quatro fases — e o gráfico acima mostra exatamente onde cada uma entrega resultado."
          />
          <div className="relative grid grid-cols-1 gap-10 pt-9 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
            <div
              className="pointer-events-none absolute inset-x-0 top-1 hidden h-px md:block"
              style={{
                background:
                  "linear-gradient(90deg, var(--green) 0%, rgba(203,240,0,.35) 60%, var(--hair) 100%)",
              }}
            />
            {METHOD_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05} className="relative">
                <span
                  className="absolute -top-[34px] left-0 hidden h-[9px] w-[9px] rounded-full bg-green md:block"
                  aria-hidden="true"
                />
                <span className="font-num text-xs tracking-[.04em] text-green">{step.span}</span>
                <h3 className="my-2.5 text-[17px] font-medium">{step.title}</h3>
                <p className="text-[13.5px] text-muted">{step.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <Link href="/metodo" className="link-quiet">
              Ver o método completo, semana a semana →
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="servicos" className="border-t border-hair py-[90px] md:py-[130px]">
        <div className="wrap">
          <SectionHeading
            tag="O que fazemos"
            title="Especialistas em cada etapa do funil pago."
          />
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
            {SERVICOS.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 0.05}
                className="border-t border-hair pt-6 transition-colors hover:border-green"
              >
                <h3 className="mb-3 text-[17px] font-medium">{s.title}</h3>
                <p className="text-[13.5px] text-muted">{s.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <Link href="/servicos" className="link-quiet">
              Ver todos os serviços em detalhe →
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="numeros" className="border-t border-hair py-[90px] md:py-[130px]">
        <div className="wrap">
          <Reveal className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            {NUMEROS.map((n) => (
              <div key={n.text}>
                <div className="num text-[clamp(40px,4.5vw,56px)] font-normal leading-none tracking-[-.02em] text-ink">
                  {n.value}
                  <i className="not-italic text-green">{n.suffix}</i>
                </div>
                <p className="mt-3 max-w-[260px] text-[13.5px] text-muted">{n.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="contato" className="border-t border-hair py-[100px] md:py-[150px]">
        <Reveal className="wrap">
          <div className="mb-4 text-[13px] text-faint">Pronto pra escalar?</div>
          <h2 className="mb-5 text-[clamp(36px,4.6vw,60px)]">
            Vamos ver até onde a <span className="text-green">sua marca</span> vai.
          </h2>
          <p className="mb-10 max-w-[440px] text-muted">
            Diagnóstico gratuito das suas campanhas atuais — ou do potencial que você ainda não
            destravou.
          </p>
          <Link href="/contato" className="btn px-[30px] py-3.5 text-[15px]">
            Agendar diagnóstico gratuito
          </Link>
        </Reveal>
      </section>
    </>
  );
}
