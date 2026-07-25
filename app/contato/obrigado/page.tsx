import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mensagem enviada",
  description: "Recebemos sua mensagem. Resposta em até 1 dia útil.",
  path: "/contato/obrigado",
  noIndex: true,
});

export default function ObrigadoPage() {
  return (
    <section className="flex min-h-[80svh] items-center pt-[120px] pb-[90px]">
      <div className="wrap">
        <Reveal className="mx-auto max-w-xl text-center">
          <svg
            className="mx-auto mb-8 h-14 w-14"
            viewBox="0 0 56 56"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="28" cy="28" r="26" stroke="#CBF000" strokeWidth="2" />
            <path
              d="M18 28.5l6.5 6.5L38 21.5"
              stroke="#CBF000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-[clamp(30px,3.6vw,46px)] leading-[1.14]">
            Mensagem recebida. <span className="text-green">Bora escalar.</span>
          </h1>
          <p className="mt-5 text-muted">
            Nossa equipe vai analisar as informações e responder em até 1 dia útil com os próximos
            passos do diagnóstico.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Link href="/" className="btn">
              Voltar ao início
            </Link>
            <Link href="/casos" className="link-quiet">
              Ver casos enquanto isso →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
