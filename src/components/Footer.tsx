import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 fill-current"
      aria-hidden="true"
    >
      <path d="M13.5 22v-8.2h2.7l.4-3.2h-3.1V8.6c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3v2.3H7.7v3.2h2.7V22h3.1Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 stroke-current"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 fill-current"
      aria-hidden="true"
    >
      <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.22 16.16 8.22C14.37 8.22 13.48 9.2 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.1 17.06 13.58V19.5H20.44V13.02Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#111318] pt-16 pb-10 text-[#FAF8F5] dark:bg-[#090A0D] sm:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Top Display Headline */}
        <h2 className="font-heading text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="block text-[#FAF8F5]">Find your people.</span>
          <span className="block text-brand-orange">Find your path.</span>
        </h2>

        {/* Middle Columns Row */}
        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 font-heading text-2xl font-extrabold tracking-tight text-[#FAF8F5] select-none"
            >
              <span>Mentor</span>
              <span className="inline-block -rotate-2 bg-brand-orange px-2 py-0.5 text-[#141519] transition-transform duration-200 group-hover:rotate-0">
                Lagbe
              </span>
            </Link>

            <p className="mt-4 max-w-xs font-manrope text-xs leading-relaxed text-[#A3A7B3] sm:text-sm">
              Good guidance changes everything.
              <br />
              Tutors and tuition across Bangladesh.
            </p>
          </div>

          {/* EXPLORE Column */}
          <div className="lg:col-span-3">
            <p className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-[#A3A7B3]">
              EXPLORE
            </p>
            <ul className="mt-4 space-y-2.5 font-manrope text-xs font-medium text-[#FAF8F5]/85 sm:text-sm">
              <li>
                <Link
                  href="/tuitions"
                  className="transition-colors hover:text-brand-orange"
                >
                  Browse Tuitions
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="transition-colors hover:text-brand-orange"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="transition-colors hover:text-brand-orange"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT Column */}
          <div className="lg:col-span-3">
            <p className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-[#A3A7B3]">
              CONTACT
            </p>
            <ul className="mt-4 space-y-2.5 font-manrope text-xs font-medium text-[#FAF8F5]/85 sm:text-sm">
              <li>
                <a
                  href="mailto:rahmanrajdee@gmail.com"
                  className="transition-colors hover:text-brand-orange"
                >
                  rahmanrajdee@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:01867075117"
                  className="transition-colors hover:text-brand-orange"
                >
                  01867075117
                </a>
              </li>
              <li className="text-[#FAF8F5]/85">Dhaka, Bangladesh</li>
            </ul>
          </div>

          {/* FOLLOW Column */}
          <div className="lg:col-span-2">
            <p className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-[#A3A7B3]">
              FOLLOW
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Mentor Lagbe on Facebook"
                className="flex h-8 w-8 items-center justify-center border border-white/20 text-[#FAF8F5]/80 transition-colors hover:border-brand-orange hover:text-brand-orange"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Mentor Lagbe on Instagram"
                className="flex h-8 w-8 items-center justify-center border border-white/20 text-[#FAF8F5]/80 transition-colors hover:border-brand-orange hover:text-brand-orange"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Mentor Lagbe on X"
                className="flex h-8 w-8 items-center justify-center border border-white/20 font-heading text-xs font-extrabold text-[#FAF8F5]/80 transition-colors hover:border-brand-orange hover:text-brand-orange"
              >
                𝕏
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Mentor Lagbe on LinkedIn"
                className="flex h-8 w-8 items-center justify-center border border-white/20 text-[#FAF8F5]/80 transition-colors hover:border-brand-orange hover:text-brand-orange"
              >
                <LinkedInIcon />
              </a>
              <a
                href="mailto:rahmanrajdee@gmail.com"
                aria-label="Email Mentor Lagbe"
                className="flex h-8 w-8 items-center justify-center border border-white/20 text-[#FAF8F5]/80 transition-colors hover:border-brand-orange hover:text-brand-orange"
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/15 pt-6 font-manrope text-[11px] text-[#8E93A0] sm:flex-row sm:items-center">
          <p>© 2026 MentorLagbe. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Link
              href="/privacy"
              className="transition-colors hover:text-[#FAF8F5]"
            >
              Privacy
            </Link>
            <span>·</span>
            <Link
              href="/terms"
              className="transition-colors hover:text-[#FAF8F5]"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
