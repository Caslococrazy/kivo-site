# Kivo — site institucional

Site multi-página da Kivo (agência de tráfego pago, Curitiba). Next.js 14 (App Router),
TypeScript, Tailwind, Framer Motion, React Hook Form + Zod, Resend.

O `kivo.html` na raiz é a referência visual original (single-page) da qual o design system
foi extraído. Ele não faz parte do build — é fonte da verdade para cores, tipografia e o
gráfico interativo.

## Ambiente (Windows)

Node **não está no PATH** do shell. Prefixe os comandos:

```bash
export PATH="/c/Program Files/nodejs:$PATH"
```

WSL não está instalado nesta máquina.

## Armadilha: nunca rode `npm run build` com o dev server ligado

O build de produção sobrescreve a pasta `.next` que o `npm run dev` está usando. O sintoma é
o site carregar **sem CSS e sem JavaScript** (links azuis, conteúdo invisível), com 404 em
`/_next/static/...` no log do servidor. Isso já aconteceu duas vezes e custou tempo de
diagnóstico — parece bug de código, mas é cache corrompido.

Ordem correta: parar o dev → `rm -rf .next` → `npm run build` → `rm -rf .next` → `npm run dev`.

Para checagem rápida sem tocar em `.next`, use `npx tsc --noEmit`.

## Animações: por que não usamos Framer Motion para revelar conteúdo

`whileInView` do Framer Motion **não redispara em navegação client-side** do App Router. O
conteúdo ficava preso em `opacity: 0` até um reload — foi o bug de "clico em Casos e não
aparece nada". `components/ui/Reveal.tsx` usa IntersectionObserver nativo, com checagem
síncrona de `getBoundingClientRect` na montagem para o que já está no viewport.

`PageTransition` também virou animação CSS pura pelo mesmo motivo.

Framer Motion segue em uso onde funciona bem: menu mobile (`Nav`), acordeão do FAQ e o filtro
de casos.

## Logo: relações de cor que importam

- `green` **#CBF000** (lima) — cor oficial da marca. `k`, `i` (ponto) e destaques.
- `mint` **#EEFAAB** — corpo do `i`. É um tom claro derivado do lima; se o lima mudar, este
  precisa ser recalculado junto ou destoa.
- `vo` usa `ink` (branco).

O brilho que atravessa o logo (`.logo-glint`) precisa de **dois tons no gradiente**:
núcleo branco para acender o `k`/`i` (que são lima) e bordas lima para tingir o `vo` (que é
branco). Um brilho de tom único é invisível em metade do wordmark — lima sobre lima e branco
sobre branco não produzem mudança.

O efeito usa uma **cópia sobreposta do wordmark** com `background-clip: text`. A abordagem
óbvia — uma faixa clara com `mix-blend-mode` — não funciona aqui: o `z-index` do container do
hero isola o grupo de blend e a faixa vira um retângulo cinza sobre o fundo. Qualquer `filter`
em elemento ancestral causa o mesmo isolamento (foi por isso que o `blur` saiu do keyframe de
entrada).

## Deploy

**Vercel** — funciona sem configuração. É onde o site está no ar.

**Cloudflare Pages** — preparado mas **nunca validado**. O adaptador está fixado em
`@cloudflare/next-on-pages@1.13.12` (as versões seguintes exigem Next 15). O build da
Cloudflare **não roda no Windows sem WSL**, então não há como testá-lo nesta máquina. Detalhes
e configuração no README.

## Conteúdo editável

- Cases: `content/casos.ts` — adicionar um objeto ao array atualiza grid, filtro, página
  dinâmica e sitemap automaticamente.
- Copy das páginas: arrays no topo de cada `app/*/page.tsx`.
- Placeholders pendentes de revisão estão marcados com `// TODO: revisar copy`.

## Contexto do usuário

Matheus é o dono da Kivo, não é desenvolvedor. Explique passos de terminal, Git e deploy de
forma literal (comandos prontos para colar) e evite jargão sem tradução.
