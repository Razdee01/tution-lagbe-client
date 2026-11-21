"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface WorkflowStep {
  number: string;
  tag: string;
  title: string;
  description: string;
  highlight: string;
}

const studentSteps: WorkflowStep[] = [
  {
    number: "01",
    tag: "DISCOVER",
    title: "Browse verified tuitions",
    description:
      "Filter open opportunities by subject, class level, online or home mode, and location across Dhaka, Chattogram, Sylhet, and beyond.",
    highlight: "850+ active listings updated daily",
  },
  {
    number: "02",
    tag: "COMPARE",
    title: "Review mentor profiles",
    description:
      "Check teaching backgrounds, subject expertise, monthly tuition rates, and student reviews before making your decision.",
    highlight: "Transparent ৳ monthly rates",
  },
  {
    number: "03",
    tag: "CONNECT",
    title: "Apply in one click",
    description:
      "Submit your interest directly with a short note about your learning goals—no middleman delays or hidden agency fees.",
    highlight: "Track status from your dashboard",
  },
  {
    number: "04",
    tag: "LEARN",
    title: "Start your lessons",
    description:
      "Schedule your first session, build a consistent study rhythm, and upgrade to Pro anytime for priority booking.",
    highlight: "Start free, upgrade whenever ready",
  },
];

const tutorSteps: WorkflowStep[] = [
  {
    number: "01",
    tag: "ONBOARD",
    title: "Create your tutor profile",
    description:
      "Sign up in under two minutes as a Tutor, highlight your academic background, and list the subjects and classes you teach best.",
    highlight: "Starts on the Free plan ($0/mo)",
  },
  {
    number: "02",
    tag: "PUBLISH",
    title: "Post tuition offerings",
    description:
      "Publish up to 2 tuition listings on the Free tier—or unlock unlimited posts and a Verified badge with Tutor Pro.",
    highlight: "Set your own schedule & rate",
  },
  {
    number: "03",
    tag: "SELECT",
    title: "Review & accept students",
    description:
      "Manage incoming student applications in one place, compare schedules, and confirm the learners who fit your availability.",
    highlight: "Direct student communication",
  },
  {
    number: "04",
    tag: "GROW",
    title: "Teach & build reputation",
    description:
      "Deliver great sessions online or in person, collect verified student testimonials, and keep your teaching calendar full.",
    highlight: "1,200+ active mentors nationwide",
  },
];

const faqs = [
  {
    question: "Is Mentor Lagbe free to start for both students and tutors?",
    answer:
      "Yes. Every new account starts on the Free plan ($0) by default. Students can browse and apply to tuitions right away, and tutors can post up to 2 tuition listings and manage applicants at no cost.",
  },
  {
    question:
      "Can I choose between online sessions and in-person home tuition?",
    answer:
      "Yes. Listings clearly specify whether lessons are Online, Offline (Home Tuition), or Hybrid, along with exact neighborhood areas such as Dhanmondi, Uttara, Mirpur, Gulshan, and Mohammadpur.",
  },
  {
    question: "What does upgrading to Pro unlock?",
    answer:
      "Student Pro ($10/month) unlocks priority booking and premium features. Tutor Pro ($15/month) removes listing limits, adds a Verified Tutor badge to your profile, and boosts visibility.",
  },
  {
    question: "Are there any long-term contracts?",
    answer:
      "None at all. You can stay on the Free tier indefinitely or upgrade and cancel your Pro subscription anytime with a single click.",
  },
];

export default function HowItWorksPage() {
  const [activeAudience, setActiveAudience] = useState<"students" | "tutors">(
    "students",
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const steps = activeAudience === "students" ? studentSteps : tutorSteps;

  return (
    <div className="w-full bg-surface-warm text-foreground transition-colors duration-200">
      {/* 1. Editorial Hero Section */}
      <section className="border-b border-foreground/20 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
                THE PROCESS / HOW IT WORKS
              </p>

              <h1 className="mt-4 font-heading text-5xl leading-[0.98] font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Simple steps.
                <span className="block text-brand-orange">
                  Serious results.
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4">
              <p className="font-manrope text-sm leading-relaxed text-muted-foreground sm:text-base">
                Whether you&apos;re searching for a dedicated mentor or looking
                to share what you know, Mentor Lagbe connects students and
                tutors across Bangladesh without the usual friction.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/tuitions"
                  className="inline-flex items-center gap-2 bg-brand-orange px-5 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519] transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <span>BROWSE TUITIONS</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center border border-foreground/30 bg-card px-5 py-3.5 font-manrope text-xs font-bold tracking-[0.14em] uppercase text-foreground transition-colors hover:border-foreground hover:bg-muted"
                >
                  CREATE ACCOUNT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dark 4-Step Interactive Workflow Section */}
      <section className="w-full bg-[#111318] py-16 text-[#FAF8F5] dark:bg-[#0B0C0F] sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          {/* Header + Student / Tutor Toggle */}
          <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
                STEP-BY-STEP GUIDE / 01
              </p>
              <h2 className="mt-3 font-heading text-3xl leading-[1.05] font-extrabold tracking-tight text-[#FAF8F5] sm:text-5xl">
                Built for both sides
                <span className="block text-brand-orange">of the desk.</span>
              </h2>
            </div>

            {/* Audience Switcher */}
            <div
              role="tablist"
              aria-label="Choose workflow role"
              className="inline-flex border border-white/20 bg-[#191B20] p-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeAudience === "students"}
                onClick={() => setActiveAudience("students")}
                className={`cursor-pointer px-5 py-2.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase transition-colors ${
                  activeAudience === "students"
                    ? "bg-brand-orange text-[#141519]"
                    : "text-[#FAF8F5]/75 hover:text-[#FAF8F5]"
                }`}
              >
                FOR STUDENTS
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeAudience === "tutors"}
                onClick={() => setActiveAudience("tutors")}
                className={`cursor-pointer px-5 py-2.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase transition-colors ${
                  activeAudience === "tutors"
                    ? "bg-brand-orange text-[#141519]"
                    : "text-[#FAF8F5]/75 hover:text-[#FAF8F5]"
                }`}
              >
                FOR TUTORS
              </button>
            </div>
          </div>

          {/* 4-Column Step Grid with Orange Hover Fill */}
          <div className="grid grid-cols-1 border-b border-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`group flex flex-col justify-between py-9 pr-6 transition-colors duration-200 sm:pr-8 ${
                  index < steps.length - 1
                    ? "border-b border-white/15 lg:border-r lg:border-b-0"
                    : ""
                } ${index % 2 === 0 ? "sm:border-r lg:border-r" : ""} ${
                  index === steps.length - 1 ? "lg:border-r-0" : ""
                } ${index > 0 ? "lg:pl-8" : ""}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className="font-heading text-6xl leading-none font-extrabold tracking-tight text-transparent transition-all duration-300 [-webkit-text-stroke:1.5px_rgba(250,248,245,0.28)] select-none group-hover:-translate-y-1 group-hover:text-brand-orange group-hover:[-webkit-text-stroke:1.5px_var(--brand-orange)] sm:text-7xl"
                    >
                      {step.number}
                    </span>

                    <span className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange">
                      {step.tag}
                    </span>
                  </div>

                  <h3 className="mt-8 font-heading text-xl font-bold tracking-tight text-[#FAF8F5] transition-colors duration-200 group-hover:text-brand-orange">
                    {step.title}
                  </h3>

                  <p className="mt-3 font-manrope text-sm leading-relaxed text-[#A3A7B3]">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/10 pt-4">
                  <p className="font-manrope text-[11px] font-bold tracking-wide text-[#FAF8F5]/85">
                    <span className="mr-1.5 text-brand-orange">→</span>
                    {step.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Editorial Feature Highlights (Color-Blocked Grid) */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <p className="font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
            WHY MENTOR LAGBE / 02
          </p>

          <h2 className="mt-3 font-heading text-4xl leading-[1.03] font-extrabold tracking-tight text-foreground sm:text-5xl">
            Designed for clarity,
            <br />
            built on trust.
          </h2>

          <div className="mt-10 grid grid-cols-1 border border-foreground md:grid-cols-3">
            {/* Block 1 */}
            <div className="flex flex-col justify-between border-b border-foreground bg-card p-7 md:border-r md:border-b-0">
              <div>
                <ShieldCheck className="h-6 w-6 text-brand-orange" />
                <h3 className="mt-6 font-heading text-2xl font-extrabold tracking-tight text-foreground">
                  No hidden commissions
                </h3>
                <p className="mt-3 font-manrope text-sm leading-relaxed text-muted-foreground">
                  Students and tutors agree directly on monthly schedules and
                  tuition fees without unexpected deductions from your first
                  month&apos;s salary.
                </p>
              </div>
              <p className="mt-8 font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange">
                DIRECT CONNECTION
              </p>
            </div>

            {/* Block 2 (Lavender) */}
            <div className="flex flex-col justify-between border-b border-foreground bg-brand-lavender p-7 text-[#141519] md:border-r md:border-b-0">
              <div>
                <Sparkles className="h-6 w-6 text-[#141519]" />
                <h3 className="mt-6 font-heading text-2xl font-extrabold tracking-tight text-[#141519]">
                  Every level & curriculum
                </h3>
                <p className="mt-3 font-manrope text-sm leading-relaxed text-[#141519]/80">
                  From Class 6–12 Bangla & English Medium to O/A Levels, IELTS,
                  ICT & Programming, and Engineering/Medical admission prep.
                </p>
              </div>
              <p className="mt-8 font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-[#141519]">
                25+ SUBJECT CATEGORIES
              </p>
            </div>

            {/* Block 3 (Golden Yellow) */}
            <div className="flex flex-col justify-between bg-brand-yellow p-7 text-[#141519]">
              <div>
                <CheckCircle2 className="h-6 w-6 text-[#141519]" />
                <h3 className="mt-6 font-heading text-2xl font-extrabold tracking-tight text-[#141519]">
                  Flexible learning modes
                </h3>
                <p className="mt-3 font-manrope text-sm leading-relaxed text-[#141519]/80">
                  Learn from anywhere via live online sessions or match with
                  tutors right in your neighborhood across Dhaka and major
                  cities.
                </p>
              </div>
              <p className="mt-8 font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-[#141519]">
                ONLINE · OFFLINE · HYBRID
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Editorial FAQ Section */}
      <section className="border-t border-foreground/20 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <p className="font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
              QUESTIONS / 03
            </p>
            <h2 className="mt-3 font-heading text-4xl leading-[1.04] font-extrabold tracking-tight text-foreground sm:text-5xl">
              Frequently
              <br />
              asked.
            </h2>
            <p className="mt-4 max-w-sm font-manrope text-sm leading-relaxed text-muted-foreground">
              Still have questions about matching with a tutor or listing your
              classes? Reach us directly at{" "}
              <a
                href="mailto:rahmanrajdee@gmail.com"
                className="font-bold text-foreground underline decoration-brand-orange underline-offset-4 hover:text-brand-orange"
              >
                rahmanrajdee@gmail.com
              </a>
              .
            </p>
          </div>

          <div className="divide-y divide-foreground/25 border-t border-b border-foreground/25 lg:col-span-7">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={faq.question} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                  >
                    <span className="font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
                      {faq.question}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-foreground/25 bg-card text-foreground">
                      {isOpen ? (
                        <Minus className="h-4 w-4 text-brand-orange" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="mt-3 pr-10 font-manrope text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
