"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CANAIS_OPCOES,
  contactSchema,
  FATURAMENTO_OPCOES,
  VERBA_OPCOES,
  type ContactFormData,
} from "@/lib/contact-schema";

const inputClass =
  "w-full rounded-lg border border-hair bg-[rgba(255,255,255,.03)] px-4 py-3 text-[14px] text-ink placeholder:text-faint transition-colors focus:border-green focus:outline-none";

const labelClass = "mb-2 block text-[13px] font-medium text-muted";
const errorClass = "mt-1.5 text-[12.5px] text-[#ff8080]";

export default function ContactForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { canais: [] },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        setServerError(
          payload?.error ?? "Não foi possível enviar sua mensagem. Tente novamente."
        );
        return;
      }

      router.push("/contato/obrigado");
    } catch {
      setServerError("Falha de conexão. Verifique sua internet e tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className={labelClass}>
            Nome
          </label>
          <input
            id="nome"
            type="text"
            autoComplete="name"
            placeholder="Seu nome"
            className={inputClass}
            aria-invalid={!!errors.nome}
            {...register("nome")}
          />
          {errors.nome && <p className={errorClass}>{errors.nome.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            E-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="voce@empresa.com.br"
            className={inputClass}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="empresa" className={labelClass}>
          Empresa ou site
        </label>
        <input
          id="empresa"
          type="text"
          autoComplete="organization"
          placeholder="Nome da empresa ou www.seusite.com.br"
          className={inputClass}
          aria-invalid={!!errors.empresa}
          {...register("empresa")}
        />
        {errors.empresa && <p className={errorClass}>{errors.empresa.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="faturamento" className={labelClass}>
            Faturamento mensal
          </label>
          <select
            id="faturamento"
            className={inputClass}
            aria-invalid={!!errors.faturamento}
            defaultValue=""
            {...register("faturamento")}
          >
            <option value="" disabled>
              Selecione uma faixa
            </option>
            {FATURAMENTO_OPCOES.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
          {errors.faturamento && <p className={errorClass}>{errors.faturamento.message}</p>}
        </div>
        <div>
          <label htmlFor="verba" className={labelClass}>
            Verba atual de mídia
          </label>
          <select
            id="verba"
            className={inputClass}
            aria-invalid={!!errors.verba}
            defaultValue=""
            {...register("verba")}
          >
            <option value="" disabled>
              Selecione uma faixa
            </option>
            {VERBA_OPCOES.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
          {errors.verba && <p className={errorClass}>{errors.verba.message}</p>}
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>Canais em que anuncia hoje</legend>
        <div className="flex flex-wrap gap-3">
          {CANAIS_OPCOES.map((canal) => (
            <label
              key={canal}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-hair px-4 py-2.5 text-[13.5px] text-muted transition-colors has-[:checked]:border-green has-[:checked]:text-ink"
            >
              <input
                type="checkbox"
                value={canal}
                className="h-4 w-4 accent-[#CBF000]"
                {...register("canais")}
              />
              {canal}
            </label>
          ))}
        </div>
        {errors.canais && <p className={errorClass}>{errors.canais.message}</p>}
      </fieldset>

      <div>
        <label htmlFor="desafio" className={labelClass}>
          Principal desafio hoje
        </label>
        <textarea
          id="desafio"
          rows={5}
          placeholder="Conte em poucas linhas o que está travando o crescimento — CAC alto, escala que degrada, falta de previsibilidade…"
          className={`${inputClass} resize-y`}
          aria-invalid={!!errors.desafio}
          {...register("desafio")}
        />
        {errors.desafio && <p className={errorClass}>{errors.desafio.message}</p>}
      </div>

      {serverError && (
        <div
          role="alert"
          className="rounded-lg border border-[#ff8080]/30 bg-[#ff8080]/5 px-4 py-3 text-[13.5px] text-[#ffb3b3]"
        >
          {serverError}
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="btn w-full py-3.5 text-[15px] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10">
        {isSubmitting ? "Enviando…" : "Enviar e agendar diagnóstico"}
      </button>
    </form>
  );
}
