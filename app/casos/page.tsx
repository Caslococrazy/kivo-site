import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CasosGrid from "@/components/CasosGrid";
import { casos } from "@/content/casos";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Casos",
  description:
    "Cases reais de escala com tráfego pago: e-commerce, serviços, infoprodutos e negócios locais. Veja os números e o que foi feito em cada operação.",
  path: "/casos",
});

export default function CasosPage() {
  return (
    <section className="pt-[160px] pb-[90px] md:pt-[200px] md:pb-[130px]">
      <div className="wrap">
        <SectionHeading
          tag="Casos"
          title={
            <>
              Curvas que a gente já <span className="text-green">construiu.</span>
            </>
          }
          description="Cada case abaixo é uma operação real. Filtre por nicho e veja o contexto, o que foi feito e o resultado — com o gráfico da curva de cada um."
        />
        <Reveal>
          <CasosGrid casos={casos} />
        </Reveal>
      </div>
    </section>
  );
}
