import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const sections = [
  {
    title: "What we collect",
    body: "We store the name, email address, role, profile details, and subscription plan you provide when you create or update a MentorLagbe account. Tutor listings and student applications contain only the details needed to match and manage tuition requests.",
  },
  {
    title: "How we use it",
    body: "Your information is used to operate the platform: authenticate accounts, display approved tuition listings, process applications, manage roles and listings, and record Pro subscription payments.",
  },
  {
    title: "Cookies and sessions",
    body: "MentorLagbe uses authentication cookies to keep you signed in and a local token to authorize protected API requests. You can sign out at any time to clear your active session.",
  },
  {
    title: "Payments",
    body: "Pro subscriptions are processed by Stripe. MentorLagbe stores transaction records such as amount, currency, transaction ID, and payment date, but does not store your card details.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="w-full bg-surface-warm py-16 text-foreground sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/15 text-brand-orange">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <p className="mt-6 font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
          Legal / Privacy
        </p>

        <h1 className="mt-3 font-heading text-4xl leading-[1.03] font-extrabold tracking-tight text-foreground sm:text-5xl">
          Privacy policy
        </h1>

        <p className="mt-5 max-w-2xl font-manrope text-sm leading-relaxed text-muted-foreground sm:text-base">
          This policy explains how MentorLagbe handles information on the
          platform. We keep it simple and use data only to deliver the service.
        </p>

        <div className="mt-10 space-y-5">
          {sections.map((section) => (
            <article key={section.title} className="rounded-2xl bg-card p-6 sm:p-8">
              <h2 className="font-heading text-xl font-extrabold text-foreground sm:text-2xl">
                {section.title}
              </h2>
              <p className="mt-3 font-manrope text-sm leading-relaxed text-muted-foreground sm:text-base">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519] transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/terms"
            className="inline-flex items-center gap-2 rounded-xl bg-surface-warm px-6 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-foreground transition-colors hover:text-brand-orange"
          >
            Read terms
          </Link>
        </div>
      </div>
    </section>
  );
}
