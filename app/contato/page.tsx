import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contato",
  description:
    "Agende um diagnóstico gratuito das suas campanhas de tráfego pago. Resposta em até 1 dia útil.",
  path: "/contato",
});

const CONTATOS = [
  {
    label: "WhatsApp",
    value: "+55 (41) 90000-0000", // TODO: revisar copy — número real
    href: "https://wa.me/5541900000000",
  },
  {
    label: "E-mail",
    value: "contato@kivo.com.br", // TODO: revisar copy — e-mail real
    href: "mailto:contato@kivo.com.br",
  },
  {
    label: "LinkedIn",
    value: "/company/kivo", // TODO: revisar copy — URL real
    href: "https://linkedin.com/company/kivo",
  },
];

export default function ContatoPage() {
  return (
    <section className="pt-[160px] pb-[90px] md:pt-[200px] md:pb-[130px]">
      <div className="wrap">
        <Reveal className="mb-16 max-w-xl">
          <div className="mb-4 text-[13px] text-faint">Contato</div>
          <h1 className="text-[clamp(30px,3.6vw,46px)] leading-[1.14]">
            Vamos ver até onde a <span className="text-green">sua marca</span> vai.
          </h1>
          <p className="mt-5 text-muted">
            Preencha o formulário e receba um diagnóstico gratuito das suas campanhas — ou do
            potencial que você ainda não destravou. Resposta em até 1 dia útil.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1.5fr_1fr] md:gap-20">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-8 md:border-l md:border-hair md:pl-10">
              {CONTATOS.map((c) => (
                <div key={c.label}>
                  <h2 className="mb-2 text-[13px] font-medium uppercase tracking-wider text-faint">
                    {c.label}
                  </h2>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-quiet text-[14.5px]"
                  >
                    {c.value}
                  </a>
                </div>
              ))}
              <div>
                <h2 className="mb-2 text-[13px] font-medium uppercase tracking-wider text-faint">
                  Horário de atendimento
                </h2>
                <p className="text-[14px] text-muted">
                  Segunda a sexta · 9h às 18h
                  <br />
                  <span className="text-faint">(horário de Brasília)</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
