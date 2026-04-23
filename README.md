# Portfólio interdisciplinar

Site em **Next.js 14 (App Router)** + **TypeScript** + **Tailwind CSS** para exibir trabalhos interdisciplinares com tipografia responsiva usando **`@chenglou/pretext`** (medição e quebra de linha sem depender de `getBoundingClientRect` no caminho quente).

> O pacote publicado no npm é `@chenglou/pretext`. Não confundir com outros pacotes chamados apenas `pretext`.

## Requisitos

- Node.js 18+
- npm (ou pnpm/yarn)

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Build de produção

```bash
npm run build
npm start
```

## Estrutura útil

| Caminho | Descrição |
| --- | --- |
| `src/data/projects.ts` | Lista de projetos de exemplo (`Projeto`) |
| `src/lib/pretext/` | Funções: `calculateOptimalFontSize`, `truncateToMaxLines`, `canvasFont` |
| `src/hooks/` | `useResponsiveText`, `useTextMeasurement`, `useBalancedLayout` |
| `src/components/pretext/` | `ResponsiveHeading`, `BalancedText`, `TruncatedText`, `MultiColumnText` |

## Pretext e SSR

O Pretext usa **Canvas** no navegador. As funções e hooks evitam medição durante o **pré-render no servidor** (`typeof window === "undefined"`) e aplicam o layout preciso após o cliente medir a largura do container (`ResizeObserver`). Até lá, há *fallbacks* (`clamp` em truncados, parágrafo simples em texto balanceado) para não quebrar o build nem a hidratação.

## Personalização rápida

1. Edite projetos em `src/data/projects.ts` e imagens em `public/images/`.
2. Ajuste cores em `tailwind.config.ts` (tons `ink` e `accent`).
3. Atualize links e e-mail em `src/app/contato/page.tsx` e `src/components/contato/ContactForm.tsx`.
4. Alinhe a *stack* de fonte usada no CSS com `PRETEXT_SANS` / `PRETEXT_SERIF` em `src/lib/font-stacks.ts` para medições coerentes.

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build otimizado
- `npm run start` — serve o build
- `npm run lint` — ESLint (Next)

## Licença

MIT (ajuste conforme a política da sua instituição).
