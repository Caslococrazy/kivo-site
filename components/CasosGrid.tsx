"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NICHO_LABEL, type Caso, type Nicho } from "@/content/casos";

const FILTERS: { value: Nicho | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "servico", label: "Serviço" },
  { value: "infoproduto", label: "Infoproduto" },
  { value: "local", label: "Local" },
];

export default function CasosGrid({ casos }: { casos: Caso[] }) {
  const [filter, setFilter] = useState<Nicho | "todos">("todos");
  const reduced = useReducedMotion();

  const filtered = filter === "todos" ? casos : casos.filter((c) => c.nicho === filter);

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-3" role="group" aria-label="Filtrar cases por nicho">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
            className={`rounded-full border px-4 py-2 font-num text-[13px] transition-colors ${
              filter === f.value
                ? "border-green text-ink"
                : "border-hair text-faint hover:text-muted"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div layout={!reduced} className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((caso) => (
            <motion.div
              key={caso.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.6, 0, 0.2, 1] }}
            >
              <Link
                href={`/casos/${caso.slug}`}
                className="group flex h-full flex-col rounded-xl border border-hair p-7 transition-colors hover:border-green"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-heading text-lg font-medium text-ink">{caso.cliente}</span>
                  <span className="rounded-full border border-hair px-3 py-1 text-[11px] text-faint">
                    {NICHO_LABEL[caso.nicho]}
                  </span>
                </div>
                <div className="num text-[clamp(28px,3vw,36px)] leading-none tracking-[-.02em] text-green">
                  {caso.metricaPrincipal}
                </div>
                <p className="mt-2 text-xs text-faint">{caso.periodo}</p>
                <p className="mt-5 flex-1 text-[13.5px] leading-relaxed text-muted">{caso.resumo}</p>
                <span className="link-quiet mt-6 self-start text-[13px] group-hover:border-ink group-hover:text-ink">
                  Ver o case completo →
                </span>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted">Nenhum case nesse nicho ainda.</p>
      )}
    </div>
  );
}
