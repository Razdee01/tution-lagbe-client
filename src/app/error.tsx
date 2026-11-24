"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, TriangleAlert } from "lucide-react";

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[75vh] w-full items-center justify-center bg-surface-warm px-4 py-20 text-foreground sm:px-6">
      <div className="w-full max-w-xl rounded-3xl bg-card p-8 text-center sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-warm text-brand-orange">
          <TriangleAlert className="h-7 w-7" />
        </div>

        <p className="mt-6 font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
          Something went wrong
        </p>

        <h1 className="mt-2 font-heading text-3xl leading-tight font-extrabold tracking-tight text-foreground sm:text-5xl">
          This page could not be loaded.
        </h1>

        <p className="mx-auto mt-4 max-w-md font-manrope text-sm leading-relaxed text-muted-foreground">
          The request may have failed or the page is temporarily unavailable.
          Try again, or return to the home page.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={retry}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519] transition-opacity hover:opacity-90 sm:w-auto"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-surface-warm px-6 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-foreground transition-colors hover:text-brand-orange sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
