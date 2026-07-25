# Kivo — Site institucional

Site multi-página da Kivo (agência de gestão de tráfego pago, Curitiba), construído com Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion e Resend.

O arquivo `kivo.html` na raiz é a referência visual original (single-page). O design system do site foi extraído dele — cores, tipografia, logo, animações e o gráfico interativo.

## Como rodar

```bash
npm install
npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000).

Build de produção:

```bash
npm run build
npm start
```

## Variáveis de ambiente

Copie `.env.local.example` para `.env.local` e preencha:

| Variável | Para quê |
| --- | --- |
| `RESEND_API_KEY` | Chave da API do [Resend](https://resend.com/api-keys), usada pelo formulário de contato |
| `CONTACT_EMAIL_TO` | E-mail que recebe os leads do formulário |
| `CONTACT_EMAIL_FROM` | Remetente dos e-mails (domínio verificado no Resend; enquanto não tiver, use `onboarding@resend.dev`) |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site — usada em canonical, sitemap e Open Graph |

Sem `RESEND_API_KEY`/`CONTACT_EMAIL_TO` o site roda normalmente, mas o envio do formulário retorna erro tratado (mensagem amigável no front).

## Deploy na Vercel

1. Suba o repositório no GitHub/GitLab.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório — a Vercel detecta Next.js automaticamente, sem configuração extra.
3. Em **Settings → Environment Variables**, adicione as 4 variáveis acima.
4. Deploy. O sitemap fica em `/sitemap.xml` e o robots em `/robots.txt`, gerados automaticamente.

## Deploy na Cloudflare Pages

O projeto está preparado para a Cloudflare (o adaptador `@cloudflare/next-on-pages` está
instalado e `/api/contato` roda em runtime `edge`, exigência da plataforma).

Configuração no painel da Cloudflare, ao criar o projeto a partir do repositório:

| Campo | Valor |
| --- | --- |
| Framework preset | Next.js |
| Build command | `npx @cloudflare/next-on-pages` |
| Build output directory | `.vercel/output/static` |

Em **Settings → Functions → Compatibility flags**, adicione `nodejs_compat`
(nos ambientes de Production e Preview). Sem essa flag o site não sobe.

Em **Settings → Environment variables**, adicione as mesmas 4 variáveis da tabela acima.

**Atenção — limitações conhecidas:**

- O comando `npm run pages:build` **não roda no Windows** sem WSL. A ferramenta avisa isso
  explicitamente. O build da Cloudflare (que roda em Linux) funciona normalmente; só não dá
  para testá-lo localmente nesta máquina.
- O adaptador está fixado na versão `1.13.12`. As versões seguintes exigem Next.js 15, e este
  projeto está no 14.2. Ao atualizar o Next para a 15, dá para migrar para o adaptador atual
  (ou para `@opennextjs/cloudflare`, que roda em Cloudflare Workers).

## Onde editar

### Cases (`content/casos.ts`)

Fonte única dos cases. Cada entrada tem:

- `slug` — vira a URL (`/casos/<slug>`)
- `cliente`, `nicho`, `metricaPrincipal`, `periodo`, `resumo` — usados no card da grid
- `contexto`, `desafio`, `oQueAKivoFez`, `depoimento` — usados na página do case
- `scenario` — dados da curva do gráfico do case: `r` (taxa de crescimento mensal composta, ex. `1.17` = +17%/mês), `label` (badge no fim da curva), `payback` e `miles` (marcos: `[índice do mês, "rótulo"]`)

Adicionar um case = adicionar um objeto no array. A grid, o filtro, a página dinâmica e o sitemap atualizam sozinhos.

### Copy das páginas

- Home: `app/page.tsx` (hero, stats, método resumido, serviços resumidos, números)
- Serviços + FAQ: `app/servicos/page.tsx` (arrays `PILARES` e `FAQ` no topo)
- Método: `app/metodo/page.tsx` (array `FASES`)
- Sobre: `app/sobre/page.tsx` (manifesto e array `TIME`)
- Contato: `app/contato/page.tsx` (array `CONTATOS` — WhatsApp, e-mail, LinkedIn) e `lib/contact-schema.ts` (faixas de faturamento/verba e canais do formulário)

Tudo que ainda é placeholder está marcado com `// TODO: revisar copy`.

### Design system

- Tokens de cor e fontes: `tailwind.config.ts` + `app/globals.css`
- Logo: `components/Logo.tsx` (nunca alterar cores ou fonte — identidade fixa)
- Gráfico interativo: `components/GrowthChart.tsx` (aceita props para cenários customizados — é assim que os cases reutilizam ele)
- Fundo animado do hero: `components/HeroBackground.tsx`

## Estrutura

```
app/
├── layout.tsx              # fontes, Nav, Footer, transição de rota
├── page.tsx                # Home
├── servicos/page.tsx
├── metodo/page.tsx
├── casos/page.tsx          # grid com filtro por nicho
├── casos/[slug]/page.tsx   # case individual (gera estático por slug)
├── sobre/page.tsx
├── contato/page.tsx
├── contato/obrigado/page.tsx  # noindex
├── api/contato/route.ts    # validação Zod + envio via Resend
├── sitemap.ts / robots.ts
├── og-image.png/route.tsx  # Open Graph image gerada em runtime
└── apple-icon.tsx
components/
├── Nav.tsx / Footer.tsx / Logo.tsx
├── HeroBackground.tsx      # canvas animado (respeita prefers-reduced-motion)
├── GrowthChart.tsx         # gráfico SVG interativo
├── CasosGrid.tsx / ContactForm.tsx / PageTransition.tsx
└── ui/                     # Reveal, SectionHeading, Accordion
content/casos.ts            # fonte editável dos cases
lib/seo.ts                  # metadata helpers + JSON-LD
lib/contact-schema.ts       # schema Zod do formulário (compartilhado front/API)
```

## Acessibilidade e performance

- `prefers-reduced-motion` respeitado em todas as animações (canvas, gráfico, reveals, transições)
- Foco visível, ARIA nos controles interativos, HTML semântico
- Canvas e gráfico carregados com `dynamic(..., { ssr: false })` — fora do bundle inicial
- Breakpoints mobile-first: 560 / 900 / 1160
