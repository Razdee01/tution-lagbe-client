import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface TierDetails {
  price: string;
  period?: string;
  features: string[];
}

interface PricingRow {
  audience: string;
  free: TierDetails;
  pro: TierDetails;
}

const pricingRows: PricingRow[] = [
  {
    audience: "Students",
    free: {
      price: "$0",
      features: [
        "Browse tuition listings",
        "Apply for tuition",
        "Track applications",
      ],
    },
    pro: {
      price: "$10",
      period: "/ MONTH",
      features: ["Priority booking", "Premium features"],
    },
  },
  {
    audience: "Tutors",
    free: {
      price: "$0",
      features: ["Post up to 2 tuition listings", "Manage applicants"],
    },
    pro: {
      price: "$15",
      period: "/ MONTH",
      features: [
        "Unlimited tuition posts",
        "Verified badge",
        "Premium features",
      ],
    },
  },
];

export default function PricingSection() {
  return (
    <section
      aria-labelledby="pricing-heading"
      className="w-full  bg-surface-warm py-16 text-foreground transition-colors duration-200 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Eyebrow & Main Headline */}
        <p className="font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
          PRICING 
        </p>

        <h2
          id="pricing-heading"
          className="mt-3 font-heading text-4xl leading-[1.03] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Start free.
          <br />
          Go further.
        </h2>

        {/* Editorial Pricing Comparison Matrix */}
        <div className="">
          {/* Desktop Column Headers */}
          <div className="hidden grid-cols-12 items-end lg:grid">
            <div className="col-span-4 border-b border-foreground/70 pb-3 font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-muted-foreground">
              FOR
            </div>
            <div className="col-span-4 border-b border-foreground/70 pb-3 font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-muted-foreground">
              FREE
            </div>
            <div className="col-span-4 border-b border-white/15 bg-[#121317] px-8 pt-4 pb-3 font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange dark:bg-[#0B0C0E]">
              PRO
            </div>
          </div>

          {/* Audience Rows (Students & Tutors) */}
          <div className="divide-y divide-foreground/70 border-b border-foreground/70 lg:divide-y-0">
            {pricingRows.map((row, rowIndex) => (
              <div
                key={row.audience}
                className="grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Audience Label */}
                <div
                  className={`py-8 lg:col-span-4 lg:pr-6 ${
                    rowIndex === 0 ? "lg:border-b lg:border-foreground/70" : ""
                  }`}
                >
                  <h3 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                    {row.audience}
                  </h3>
                </div>

                {/* FREE Column */}
                <div
                  className={`pb-8 lg:col-span-4 lg:py-8 lg:pr-8 ${
                    rowIndex === 0 ? "lg:border-b lg:border-foreground/70" : ""
                  }`}
                >
                  <p className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-muted-foreground">
                    FREE
                  </p>
                  <p className="mt-1 font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                    {row.free.price}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {row.free.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 font-manrope text-xs font-medium text-foreground/85 sm:text-sm"
                      >
                        <span
                          aria-hidden="true"
                          className="font-bold text-brand-orange"
                        >
                          →
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* PRO Column (High-Contrast Dark Block) */}
                <div
                  className={`bg-[#121317] px-6 py-8 text-[#FAF8F5] dark:bg-[#0B0C0E] sm:px-8 lg:col-span-4 ${
                    rowIndex === 0 ? "border-b border-white/15" : ""
                  }`}
                >
                  <p className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange">
                    PRO
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-heading text-4xl font-extrabold tracking-tight text-[#FAF8F5] sm:text-5xl">
                      {row.pro.price}
                    </span>
                    {row.pro.period && (
                      <span className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange">
                        {row.pro.period}
                      </span>
                    )}
                  </div>

                  <ul className="mt-5 space-y-2">
                    {row.pro.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 font-manrope text-xs font-medium text-[#FAF8F5]/90 sm:text-sm"
                      >
                        <span
                          aria-hidden="true"
                          className="font-bold text-brand-orange"
                        >
                          →
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footnote & CTA */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-manrope text-xs font-medium text-muted-foreground sm:text-sm">
            No contracts. Upgrade or cancel anytime.
          </p>

          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-brand-orange px-6 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519] transition-transform duration-150 hover:-translate-y-0.5"
          >
            <span>VIEW ALL PLANS</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
