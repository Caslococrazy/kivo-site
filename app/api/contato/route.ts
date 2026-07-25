import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

// Cloudflare Pages exige runtime edge em toda rota de servidor.
export const runtime = "edge";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !to) {
    console.error("RESEND_API_KEY ou CONTACT_EMAIL_TO não configurados.");
    return NextResponse.json(
      { error: "Serviço de e-mail não configurado. Tente novamente mais tarde." },
      { status: 500 }
    );
  }

  const data = parsed.data;
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_EMAIL_FROM || "Kivo Site <onboarding@resend.dev>",
    to,
    replyTo: data.email,
    subject: `[Site Kivo] Novo lead: ${data.nome} — ${data.empresa}`,
    text: [
      `Nome: ${data.nome}`,
      `E-mail: ${data.email}`,
      `Empresa/site: ${data.empresa}`,
      `Faturamento mensal: ${data.faturamento}`,
      `Verba atual de mídia: ${data.verba}`,
      `Canais que anuncia hoje: ${data.canais.join(", ")}`,
      ``,
      `Principal desafio:`,
      data.desafio,
    ].join("\n"),
  });

  if (error) {
    console.error("Erro Resend:", error);
    return NextResponse.json(
      { error: "Não foi possível enviar sua mensagem. Tente novamente." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
