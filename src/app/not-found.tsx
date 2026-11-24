import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[75vh] w-full items-center justify-center bg-surface-warm px-4 py-20 text-foreground sm:px-6">
      <div className="w-full max-w-xl rounded-3xl bg-card p-8 text-center sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-warm text-brand-orange">
          <Compass className="h-7 w-7" />
        </div>

        <p className="mt-6 font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
          ERROR 404 · PAGE NOT FOUND
        </p>

        <h1 className="mt-2 font-heading text-3xl leading-tight font-extrabold tracking-tight text-foreground sm:text-5xl">
          We couldn&apos;t find that page.
        </h1>

        <p className="mx-auto mt-4 max-w-md font-manrope text-sm leading-relaxed text-muted-foreground">
          The tuition listing or page you&apos;re looking for may have been
          removed, closed, or the link might be incorrect.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519] transition-opacity hover:opacity-90 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>BACK TO HOME</span>
          </Link>

          <Link
            href="/browse-tuition"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-surface-warm px-6 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-foreground transition-colors hover:text-brand-orange sm:w-auto"
          >
            <Search className="h-4 w-4 text-brand-orange" />
            <span>BROWSE TUITIONS</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
