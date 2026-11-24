import Link from "next/link";
import { ArrowRight, ArrowUpRight, GraduationCap, Sparkles } from "lucide-react";

const benefits = [
  {
    title: "Reach motivated students",
    body: "Publish approved listings and get discovered by students actively searching for your subject.",
  },
  {
    title: "Manage your listings",
    body: "Edit, close, or delete your own tuition posts from your tutor dashboard at any time.",
  },
  {
    title: "Grow with Pro",
    body: "Upgrade to Tutor Pro for unlimited posts and a Pro badge that helps your listing stand out.",
  },
];

export default function TeachPage() {
  return (
    <section className="w-full bg-surface-warm py-16 text-foreground sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/15 text-brand-orange">
          <GraduationCap className="h-6 w-6" />
        </div>

        <p className="mt-6 font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
          Teach on MentorLagbe
        </p>

        <h1 className="mt-3 max-w-3xl font-heading text-4xl leading-[1.03] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Share what you know.
          <br />
          <span className="text-brand-orange">Build what&apos;s next.</span>
        </h1>

        <p className="mt-6 max-w-2xl font-manrope text-sm leading-relaxed text-muted-foreground sm:text-base">
          MentorLagbe connects tutors with students across Bangladesh. Create a
          tutor account, post a tuition, and manage applications from one
          simple dashboard.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519] transition-transform duration-150 hover:-translate-y-0.5"
          >
            Join as a tutor
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard/tutor/post-tuition"
            className="inline-flex items-center gap-2 rounded-xl border border-foreground/20 px-6 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-foreground transition-colors hover:border-brand-orange hover:text-brand-orange"
          >
            Post a tuition
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-2xl bg-card p-6 sm:p-7"
            >
              <Sparkles className="h-5 w-5 text-brand-orange" />
              <h2 className="mt-4 font-heading text-xl font-extrabold text-foreground">
                {benefit.title}
              </h2>
              <p className="mt-2 font-manrope text-sm leading-relaxed text-muted-foreground">
                {benefit.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
