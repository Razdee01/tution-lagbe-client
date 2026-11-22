<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands / verification

- Use npm (`package-lock.json`); README's yarn/pnpm/bun lines are boilerplate. Scripts: `npm run dev` (Turbopack), `npm run build`, `npm run start`, `npm run lint`.
- No test runner or typecheck script. Typecheck with `npx tsc --noEmit`; on a fresh checkout run `npm run dev` or `npm run build` first so `.next/types` and `next-env.d.ts` exist, or `LayoutProps<"/">` will error.
- Lint baseline (verified): exits 1 from pre-existing `react-hooks/set-state-in-effect` in `src/components/NavBar.tsx`; warnings for `<img>` in `src/components/TestimonialsSection.tsx`. Compare before/after; don't fix unrelated warnings.

## Architecture / runtime

- Source lives in `src/`; README's `app/page.tsx` path is stale. Routes: `/`, `/browse-tuition`, `/browse-tuition/[id]`, `/how-it-works`, `/pricing`, `/sign-in`, `/sign-up`, `/api/auth/[...all]`. Some UI links still point to nonexistent `/tuitions` and `/teach` — use the real routes above.
- Auth: Better Auth + MongoDB adapter in `src/lib/auth.ts`, catch-all handler in `src/app/api/auth/[...all]/route.ts`, client in `src/lib/auth-client.ts`. Keep the client same-origin (`/api/auth`); `NEXT_PUBLIC_API_URL` is the tuition backend on :5000 and has no auth routes. Local `.env` (gitignored; no `.env.example`) must define `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGO_DB`, `NEXT_PUBLIC_API_URL`; don't commit values.
- Tuition data comes from an external backend at `NEXT_PUBLIC_API_URL` (`/tuitions`, `/tuitions/:id`, POST `/applications`); session checks hit local `/api/auth/get-session`. The backend must be reachable for home/browse/details to work.
- Client boundary is already broad: `NavBar`, `TuitionSearchBar`, and the browse/details/sign-in/sign-up/pricing/how-it-works route files use `"use client"`; keep new components server-rendered unless they need state/effects.

## UI conventions

- shadcn style is `base-nova` (`components.json`): components use **`@base-ui/react`, not Radix** — do not paste Radix-based shadcn examples. Add components with `npx shadcn add <name>`.
- Tailwind CSS 4 is CSS-first: no `tailwind.config`; design tokens and `@theme` live in `src/app/globals.css`, loaded via the `@tailwindcss/turbopack` rule in `next.config.ts`. Don't move that config.
- `cn` in `src/lib/utils.ts` re-exports the `cn` npm package — not clsx + tailwind-merge. React Compiler is enabled; path alias `@/*` → `src/*`.

## Workflow

- `AGENTS.md`'s managed block above is rewritten by `next dev`. Edit content outside the markers and commit the file as-is rather than deleting the block.
- No CI, pre-commit hooks, or PR conventions exist in this repo; verify with `npx tsc --noEmit` + `npm run lint` before finishing.
