import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

const sections = [
  {
    title: "Accounts and roles",
    body: "You must provide accurate information when registering as a Student or Tutor. Accounts may be upgraded to Pro through Stripe, and administrators may manage roles to keep the platform safe and organized.",
  },
  {
    title: "Tuition listings",
    body: "Tutors are responsible for the accuracy of their listings. New listings are submitted as pending and become public only after admin approval. Tutors may edit, close, or delete their own posts.",
  },
  {
    title: "Applications",
    body: "Students may apply to approved tuition posts. A student can submit only one application per tuition. Tutors may accept or reject applications, and students may cancel their own pending applications.",
  },
  {
    title: "Payments and subscriptions",
    body: "Pro plans are billed as one-time checkout payments through Stripe. After a successful payment, the account plan is upgraded and the transaction is recorded. Refund requests should be sent to our support contact.",
  },
];

export default function TermsPage() {
  return (
    <section className="w-full bg-surface-warm py-16 text-foreground sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/15 text-brand-orange">
          <FileText className="h-6 w-6" />
        </div>

        <p className="mt-6 font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
          Legal / Terms
        </p>

        <h1 className="mt-3 font-heading text-4xl leading-[1.03] font-extrabold tracking-tight text-foreground sm:text-5xl">
          Terms of service
        </h1>

        <p className="mt-5 max-w-2xl font-manrope text-sm leading-relaxed text-muted-foreground sm:text-base">
          By using MentorLagbe, you agree to these terms. They describe the
          basic rules for accounts, listings, applications, and payments.
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
            href="/privacy"
            className="inline-flex items-center gap-2 rounded-xl bg-surface-warm px-6 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-foreground transition-colors hover:text-brand-orange"
          >
            Read privacy policy
          </Link>
        </div>
      </div>
    </section>
  );
}
