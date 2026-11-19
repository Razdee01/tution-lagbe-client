<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` (Turbopack dev server), `npm run build`, `npm run lint` (flat-config ESLint, `eslint.config.mjs`).
- There is **no test runner and no typecheck script**. Typecheck with `npx tsc --noEmit`.
- `npx tsc --noEmit` needs Next's generated types (`.next/types`, `next-env.d.ts`) — run `npm run dev` or `npm run build` once first, or expect errors on `LayoutProps<"/">`.
- Baseline: `npm run lint` currently fails with one pre-existing error (`react-hooks/set-state-in-effect` in `src/components/NavBar.tsx`) plus `<img>` warnings elsewhere. Verify whether your change caused a failure before fixing unrelated ones.

## Stack (Next.js 16, React 19, single-page site)

- App Router: `src/app/layout.tsx` + `src/app/page.tsx` compose section components from `src/components/`. No API routes, no data fetching, no env files.
- shadcn style is `base-nova` (`components.json`): components use **`@base-ui/react`, not Radix** — do not paste Radix-based shadcn examples. Add components with `npx shadcn add <name>`.
- Tailwind CSS 4 is CSS-first: no `tailwind.config`; design tokens and `@theme` live in `src/app/globals.css`, loaded via the `@tailwindcss/turbopack` rule in `next.config.ts`. Don't move that config.
- `cn` in `src/lib/utils.ts` re-exports the `cn` npm package — not clsx + tailwind-merge.
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`).
- Path alias: `@/*` → `src/*`.
- Only `NavBar.tsx` and `TuitionSearchBar.tsx` are client components (`"use client"`); keep new components server-rendered unless they need state/effects.

## Workflow

- `AGENTS.md`'s managed block above is rewritten by `next dev`. Edit content outside the markers and commit the file as-is rather than deleting the block.
- No CI, pre-commit hooks, or PR conventions exist in this repo; verify with `npx tsc --noEmit` + `npm run lint` before finishing.
