import React from "react";
import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-4 py-16">
      <div className="w-full rounded-2xl bg-card p-8 text-center">
        <XCircle className="mx-auto h-12 w-12 text-red-500" />
        <p className="mt-4 font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-muted-foreground">
          CHECKOUT CANCELLED
        </p>
        <h1 className="mt-1 font-heading text-3xl font-extrabold">
          Payment Not Completed
        </h1>
        <p className="mt-2 font-manrope text-sm text-muted-foreground">
          No charges were made. You can upgrade to Pro anytime from pricing or
          your dashboard.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/pricing"
            className="rounded-xl bg-brand-orange px-6 py-3 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519]"
          >
            BACK TO PRICING
          </Link>
        </div>
      </div>
    </section>
  );
}
