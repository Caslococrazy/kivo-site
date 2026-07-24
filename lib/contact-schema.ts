import { z } from "zod";

export const FATURAMENTO_OPCOES = [
  "Até R$ 50 mil/mês",
  "R$ 50–150 mil/mês",
  "R$ 150–500 mil/mês",
  "R$ 500 mil–1 mi/mês",
  "Acima de R$ 1 mi/mês",
] as const;

export const VERBA_OPCOES = [
  "Ainda não invisto",
  "Até R$ 5 mil/mês",
  "R$ 5–15 mil/mês",
  "R$ 15–40 mil/mês",
  "Acima de R$ 40 mil/mês",
] as const;

export const CANAIS_OPCOES = [
  "Meta Ads",
  "Google Ads",
  "TikTok Ads",
  "LinkedIn Ads",
  "Nenhum ainda",
] as const;

export const contactSchema = z.object({
  nome: z.string().min(2, "Informe seu nome completo."),
  email: z.string().email("Informe um e-mail válido."),
  empresa: z.string().min(2, "Informe a empresa ou o site."),
  faturamento: z.enum(FATURAMENTO_OPCOES, {
    errorMap: () => ({ message: "Selecione uma faixa de faturamento." }),
  }),
  verba: z.enum(VERBA_OPCOES, {
    errorMap: () => ({ message: "Selecione uma faixa de verba." }),
  }),
  canais: z.array(z.enum(CANAIS_OPCOES)).min(1, "Selecione pelo menos uma opção."),
  desafio: z
    .string()
    .min(10, "Conte um pouco mais — mínimo de 10 caracteres.")
    .max(2000, "Máximo de 2000 caracteres."),
});

export type ContactFormData = z.infer<typeof contactSchema>;
