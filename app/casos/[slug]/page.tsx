import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import { GrowthChartLazy as GrowthChart } from "@/components/lazy";
import { casos, getCasoBySlug, NICHO_LABEL } from "@/content/casos";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return casos.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const caso = getCasoBySlug(params.slug);
  if (!caso) return {};
  return buildMetadata({
    title: `${caso.cliente} — Case`,
    description: `${caso.metricaPrincipal} em ${caso.periodo}. ${caso.resumo}`,
    path: `/casos/${caso.slug}`,
  });
}

export default function CasoPage({ params }: Props) {
  const caso = getCasoBySlug(params.slug);
  if (!caso) notFound();

  return (
    <>
      <section className="pt-[160px] pb-[60px] md:pt-[200px] md:pb-[80px]">
        <div className="wrap">
          <Reveal>
            <Link href="/casos" className="link-quiet text-[13px]">
              ← Todos os casos
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="rounded-full border border-hair px-3 py-1 text-[11px] text-faint">
                {NICHO_LABEL[caso.nicho]}
              </span>
              <span className="text-[13px] text-faint">{caso.periodo}</span>
            </div>
            <h1 className="mt-4 text-[clamp(34px,4.5vw,56px)] leading-[1.1]">{caso.cliente}</h1>
            <div className="num mt-6 text-[clamp(36px,5vw,64px)] leading-none tracking-[-.02em] text-green">
              {caso.metricaPrincipal}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hair py-[70px] md:py-[100px]">
        <div className="wrap grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <h2 className="mb-4 text-[13px] font-medium uppercase tracking-wider text-faint">
              Contexto
            </h2>
            <p className="text-[15px] leading-relaxed text-muted">{caso.contexto}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mb-4 text-[13px] font-medium uppercase tracking-wider text-faint">
              Desafio
            </h2>
            <p className="text-[15px] leading-relaxed text-muted">{caso.desafio}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hair py-[70px] md:py-[100px]">
        <div className="wrap">
          <Reveal>
            <h2 className="mb-8 text-[clamp(24px,2.8vw,34px)]">
              O que a <span className="text-green">Kivo</span> fez
            </h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {caso.oQueAKivoFez.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-hair p-5 text-[13.5px] text-muted"
                >
                  <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-green" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hair py-[70px] md:py-[100px]">
        <div className="wrap">
          <Reveal>
            <h2 className="mb-10 text-[clamp(24px,2.8vw,34px)]">A curva do resultado</h2>
            <GrowthChart
              scenarios={{ 1: caso.scenario }}
              defaultLevel={1}
              showInvestSelector={false}
              caption={`Receita indexada (início = 1x) · ${caso.periodo} · dados da operação ${caso.cliente}`}
            />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hair py-[70px] md:py-[100px]">
        <div className="wrap">
          <Reveal className="mx-auto max-w-2xl text-center">
            <svg
              className="mx-auto mb-8 h-8 w-8"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 22c0-6 3-11 9-13l1 2c-4 2-6 5-6 8h5v9H6v-6zm14 0c0-6 3-11 9-13l1 2c-4 2-6 5-6 8h5v9h-9v-6z"
                fill="#CBF000"
                opacity=".5"
              />
            </svg>
            <blockquote className="text-[clamp(19px,2.2vw,26px)] font-light leading-relaxed text-ink">
              &ldquo;{caso.depoimento.texto}&rdquo;
            </blockquote>
            <div className="mt-8">
              <div className="text-[14px] font-medium text-ink">{caso.depoimento.autor}</div>
              <div className="mt-1 text-[13px] text-faint">{caso.depoimento.cargo}</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hair py-[100px] md:py-[150px]">
        <Reveal className="wrap">
          <h2 className="mb-5 text-[clamp(30px,3.6vw,46px)]">
            A próxima curva pode ser a <span className="text-green">sua.</span>
          </h2>
          <p className="mb-10 max-w-[440px] text-muted">
            Diagnóstico gratuito das suas campanhas atuais — sem compromisso.
          </p>
          <Link href="/contato" className="btn px-[30px] py-3.5 text-[15px]">
            Quero escalar minha marca
          </Link>
        </Reveal>
      </section>
    </>
  );
}
