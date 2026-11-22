"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";

type BillingCycle = "monthly" | "yearly";
type RoleTab = "all" | "students" | "tutors";

interface PricingPlan {
  id: string;
  audience: "students" | "tutors";
  badge: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  stripePriceIdMonthly: string;
  stripePriceIdYearly: string;
  surfaceClass: string;
  buttonClass: string;
  features: string[];
}

const plans: PricingPlan[] = [
  {
    id: "student-free",
    audience: "students",
    badge: "STUDENTS · FREE",
    name: "Student Free",
    tagline: "Browse open tuitions and apply at zero cost.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    stripePriceIdMonthly: "price_student_free",
    stripePriceIdYearly: "price_student_free",
    surfaceClass: "bg-card text-foreground",
    buttonClass:
      "border border-foreground/20 bg-surface-warm text-foreground hover:bg-muted",
    features: [
      "Browse active listings across subjects & locations",
      "Apply to open tuitions directly",
      "Track application status from your dashboard",
      "Filter by Online, Offline, or Hybrid mode",
    ],
  },
  {
    id: "student-pro",
    audience: "students",
    badge: "STUDENTS · STRIPE PRO",
    name: "Student Pro",
    tagline: "Stand out first when high-demand tuitions open.",
    monthlyPrice: 10,
    yearlyPrice: 8,
    stripePriceIdMonthly: "price_student_pro_monthly",
    stripePriceIdYearly: "price_student_pro_yearly",
    surfaceClass: "bg-brand-lavender text-[#141519]",
    buttonClass: "bg-[#141519] text-[#FAF8F5] hover:bg-[#23262F]",
    features: [
      "Priority application placement with tutors",
      "Early alerts for newly posted tuitions",
      "Unlimited saved listings & comparison notes",
      "Manage or cancel anytime via Stripe billing",
    ],
  },
  {
    id: "tutor-free",
    audience: "tutors",
    badge: "TUTORS · FREE",
    name: "Tutor Free",
    tagline: "Start teaching and publish your initial tuition posts.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    stripePriceIdMonthly: "price_tutor_free",
    stripePriceIdYearly: "price_tutor_free",
    surfaceClass: "bg-card text-foreground",
    buttonClass:
      "border border-foreground/20 bg-surface-warm text-foreground hover:bg-muted",
    features: [
      "Create your public mentor profile",
      "Post up to 2 active tuition listings",
      "Receive and review student applications",
      "Set custom monthly ৳ rates and schedules",
    ],
  },
  {
    id: "tutor-pro",
    audience: "tutors",
    badge: "TUTORS · MOST POPULAR",
    name: "Tutor Pro",
    tagline: "Unlimited listings, verified badge, and top visibility.",
    monthlyPrice: 15,
    yearlyPrice: 12,
    stripePriceIdMonthly: "price_tutor_pro_monthly",
    stripePriceIdYearly: "price_tutor_pro_yearly",
    surfaceClass: "bg-[#141519] text-[#FAF8F5]",
    buttonClass: "bg-brand-orange text-[#141519] hover:bg-[#ff7242]",
    features: [
      "Unlimited active tuition listings",
      "Verified Tutor badge on profile & cards",
      "Boosted placement in search & featured slots",
      "Instant Stripe subscription & invoice portal",
    ],
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [roleFilter, setRoleFilter] = useState<RoleTab>("all");

  const handleSubscribe = (plan: PricingPlan) => {
    const priceId =
      billingCycle === "monthly"
        ? plan.stripePriceIdMonthly
        : plan.stripePriceIdYearly;

    const payload = {
      planId: plan.id,
      planName: plan.name,
      audience: plan.audience,
      billingCycle,
      priceId,
      amountUsd:
        billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice,
    };

    console.log("Stripe Subscription Checkout Triggered:", payload);
  };

  const visiblePlans =
    roleFilter === "all"
      ? plans
      : plans.filter((plan) => plan.audience === roleFilter);

  return (
    <section
      aria-labelledby="pricing-heading"
      className="w-full bg-surface-warm py-16 text-foreground transition-colors duration-200 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Editorial Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
              STRIPE SUBSCRIPTIONS / PRICING
            </p>
            <h1
              id="pricing-heading"
              className="mt-3 font-heading text-4xl leading-[1.03] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Start free.
              <br />
              Upgrade when ready.
            </h1>
          </div>

          <p className="max-w-md font-manrope text-sm leading-relaxed text-muted-foreground">
            Every account begins on the Free tier. Switch to Student Pro or
            Tutor Pro anytime with transparent Stripe billing and zero lock-in.
          </p>
        </div>

        {/* Controls Bar: Role Filter & Billing Cycle */}
        <div className="mt-10 flex flex-col justify-between gap-4 rounded-2xl bg-card p-4 sm:flex-row sm:items-center sm:p-5">
          {/* Role Filter */}
          <div
            role="tablist"
            aria-label="Filter plans by role"
            className="flex flex-wrap gap-2"
          >
            {(
              [
                { key: "all", label: "ALL PLANS" },
                { key: "students", label: "STUDENTS" },
                { key: "tutors", label: "TUTORS" },
              ] as const
            ).map((tab) => {
              const active = roleFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setRoleFilter(tab.key)}
                  className={`cursor-pointer rounded-xl px-4 py-2.5 font-manrope text-xs font-extrabold tracking-[0.12em] uppercase transition-colors ${
                    active
                      ? "bg-[#141519] text-[#FAF8F5]"
                      : "bg-surface-warm text-foreground hover:bg-muted"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Monthly / Yearly Toggle */}
          <div className="inline-flex items-center gap-2 rounded-xl bg-surface-warm p-1">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`cursor-pointer rounded-lg px-4 py-2 font-manrope text-xs font-extrabold tracking-[0.12em] uppercase transition-colors ${
                billingCycle === "monthly"
                  ? "bg-brand-orange text-[#141519]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              MONTHLY
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2 font-manrope text-xs font-extrabold tracking-[0.12em] uppercase transition-colors ${
                billingCycle === "yearly"
                  ? "bg-brand-orange text-[#141519]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>YEARLY</span>
              <span className="rounded bg-[#141519] px-1.5 py-0.5 text-[10px] text-brand-yellow">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid (Borderless Rounded Cards) */}
        <div
          className={`mt-10 grid grid-cols-1 gap-6 ${
            visiblePlans.length === 2
              ? "md:grid-cols-2"
              : "md:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {visiblePlans.map((plan) => {
            const price =
              billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            const isDark = plan.surfaceClass.includes("#141519");
            const isLavender = plan.surfaceClass.includes("brand-lavender");

            return (
              <article
                key={plan.id}
                className={`flex h-full flex-col justify-between rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-7 ${plan.surfaceClass}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase ${
                        isDark
                          ? "text-brand-orange"
                          : isLavender
                            ? "text-[#141519]"
                            : "text-brand-orange"
                      }`}
                    >
                      {plan.badge}
                    </span>

                    {plan.monthlyPrice > 0 && (
                      <Sparkles
                        className={`h-4 w-4 ${
                          isDark ? "text-brand-yellow" : "text-brand-orange"
                        }`}
                      />
                    )}
                  </div>

                  <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight">
                    {plan.name}
                  </h2>

                  <p
                    className={`mt-2 font-manrope text-xs leading-relaxed ${
                      isDark
                        ? "text-[#FAF8F5]/75"
                        : isLavender
                          ? "text-[#141519]/80"
                          : "text-muted-foreground"
                    }`}
                  >
                    {plan.tagline}
                  </p>

                  {/* Price Display */}
                  <div className="mt-6 flex items-baseline gap-1.5 border-t border-current/10 pt-5">
                    <span className="font-heading text-4xl font-extrabold tracking-tight">
                      ${price}
                    </span>
                    <span
                      className={`font-manrope text-[10px] font-extrabold tracking-[0.15em] uppercase ${
                        isDark
                          ? "text-[#FAF8F5]/65"
                          : isLavender
                            ? "text-[#141519]/70"
                            : "text-muted-foreground"
                      }`}
                    >
                      / MONTH
                    </span>
                  </div>

                  {/* Feature List */}
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 font-manrope text-xs leading-relaxed"
                      >
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            isDark
                              ? "text-brand-orange"
                              : isLavender
                                ? "text-[#141519]"
                                : "text-brand-orange"
                          }`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA */}
                <div className="mt-8 pt-2">
                  {price === 0 ? (
                    <Link
                      href="/sign-up"
                      className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase transition-colors ${plan.buttonClass}`}
                    >
                      <span>GET STARTED FREE</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSubscribe(plan)}
                      className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase transition-colors ${plan.buttonClass}`}
                    >
                      <span>UPGRADE WITH STRIPE</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
