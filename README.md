# MentorLagbe — Client

## Project name

**MentorLagbe** — a tuition marketplace that connects students with verified tutors across Bangladesh.

## Purpose

MentorLagbe makes it easy for students to find the right tutor and for tutors to publish and manage tuition listings. The app includes role-based dashboards, application tracking, bookmarks, admin moderation, and Pro subscription payments.

## Live URL


- Frontend (Next.js): `https://tution-lagbe-client.vercel.app/`
- Backend API (Express): `https://tution-lagbe-server.vercel.app/`
- Local development: `http://localhost:3000`

##  credentials


| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@gmail.com` | `<12345678>` |
| Tutor | `<tutor@gmail.com>` | `<12345678>` |
| Student | `<student@gmail.com>` | `<12345678>` |

Admin access is role-protected and is not available from the public sign-up form; promote the demo admin in MongoDB or through the admin users screen.

## Key features

- Responsive landing page with hero search, featured tuition cards, testimonials, and pricing sections.
- Browse and filter tuition listings by subject, class level, location, and search text.
- Tuition details page with tutor information, fee, bookmarks, and an apply flow.
- Better Auth email/password sign-up and sign-in with Student, Tutor, and Admin roles.
- JWT synchronization for authenticated calls to the Express backend.
- Role-based dashboards:
  - Students: applications, bookmarks, profile, and Pro upgrade.
  - Tutors: post/edit/delete tuition posts, review applicants, profile, and Pro upgrade.
  - Admins: overview, user management, tuition approval, and transaction history.
- Bookmark/unbookmark tuition posts for logged-in students.
- Duplicate-application prevention and application status updates.
- Stripe Checkout for Student Pro and Tutor Pro plans, with payment verification and transaction records.
- User feedback with Sonner toasts for sign-in, sign-up, sign-out, applications, and errors.
- Custom `loading.tsx`, `not-found.tsx`, and `error.tsx` route states.
- Legal pages at `/privacy` and `/terms`.

## Main routes

- `/` — landing page
- `/browse-tuition` — searchable tuition listings
- `/browse-tuition/[id]` — tuition details and application gate
- `/how-it-works` — platform walkthrough
- `/pricing` — Pro plan comparison
- `/sign-in`, `/sign-up` — authentication
- `/teach` — tutor information and sign-up entry point (when enabled)
- `/privacy`, `/terms` — legal pages
- `/dashboard/*` — role-based dashboards
- `/payment/success` — Stripe payment verification callback
- `/api/auth/[...all]` — Better Auth handler

## Tech stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4 with CSS-first `@theme` tokens
- Base UI via shadcn (`base-nova` style)
- Better Auth with MongoDB adapter
- Sonner for toast notifications
- Lucide React for icons
- Stripe Checkout (through the Express backend)

## npm packages used

### Dependencies

`next`, `react`, `react-dom`, `better-auth`, `@better-auth/mongo-adapter`, `mongodb`, `@base-ui/react`, `lucide-react`, `sonner`, `next-themes`, `class-variance-authority`, `cn`, `shadcn`, `tw-animate-css`

### Dev dependencies

`typescript`, `tailwindcss`, `@tailwindcss/turbopack`, `eslint`, `eslint-config-next`, `@types/node`, `@types/react`, `@types/react-dom`, `babel-plugin-react-compiler`

## Getting started

Use **npm** (the repository includes `package-lock.json`).

```bash
npm install
```

Create a local `.env` file (it is gitignored):

```env
BETTER_AUTH_SECRET=<your-better-auth-secret>
BETTER_AUTH_URL=http://localhost:3000
MONGO_DB=<your-mongodb-connection-string>
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_API_KEY=<your-imgbb-key-if-used>
```

Run the Express API from `../tuition-lagbe-server` first, then start the client:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev     # Start the Next.js dev server
npm run build   # Production build
npm run start   # Start the production server
npm run lint    # Run ESLint
npx tsc --noEmit # TypeScript check (after .next/types exists)
```

## Repository

Client source: `https://github.com/Razdee01/tution-lagbe-client.git`
