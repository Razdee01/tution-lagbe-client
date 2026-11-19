
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface BannerProps {
  imageSrc?: string;
  imageAlt?: string;
}

export default function Banner() {
  return (
    <section className="relative w-full border-b-4 border-brand-orange bg-surface-warm transition-colors duration-200">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Editorial Headline & Actions */}
        <div className="flex flex-col justify-between px-4 py-10 sm:px-6 lg:col-span-7 lg:px-10 lg:py-14">
          <div>
            <p className="font-manrope text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground">
              THE MENTORLAGBE NETWORK / 01
            </p>

            <h1 className="mt-6 font-heading text-5xl leading-[0.98] font-extrabold tracking-tight text-foreground sm:text-6xl xl:text-[4.5rem]">
              Your next big
              <br />
              break starts
              <br />
              with
              <br />
              someone
              <br />
              <span className="text-brand-orange">who knows.</span>
            </h1>
          </div>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xs font-manrope text-sm leading-relaxed text-muted-foreground">
              Find the right tutor, discover opportunities, and build your
              future one lesson at a time.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/tuitions"
                className="inline-flex items-center gap-2 bg-brand-orange px-5 py-3.5 font-manrope text-xs font-bold tracking-[0.14em] uppercase text-[#141519] transition-transform duration-150 hover:-translate-y-0.5"
              >
                <span>FIND YOUR TUTOR</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/teach"
                className="inline-flex items-center justify-center border border-foreground/30 bg-card px-5 py-3.5 font-manrope text-xs font-bold tracking-[0.14em] uppercase text-foreground transition-colors hover:border-foreground hover:bg-muted"
              >
                TEACH WITH US
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Photo + Infinitely Rotating Circular Stamp + Featured Tuition Overlay */}
        <div className="relative min-h-[440px] border-t border-border bg-muted lg:col-span-5 lg:min-h-[580px] lg:border-t-0 lg:border-l">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
            alt="Tutor guiding a student with notebook at a desk"
            className="h-full w-full object-cover object-center grayscale contrast-110"
            width={1200}
            height={800}
          />

          {/* Top-Right Infinitely Rotating Circular Badge */}
          <div className="pointer-events-none absolute top-5 right-5 z-10 flex h-24 w-24 items-center justify-center rounded-full bg-surface-warm/85 p-1 backdrop-blur-[2px]">
            <svg
              viewBox="0 0 120 120"
              className="animate-spin-slow h-full w-full text-foreground"
              aria-label="Good guidance changes everything"
            >
              <defs>
                <path
                  id="guidanceCirclePath"
                  d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                />
              </defs>
              <text
                fill="currentColor"
                className="font-manrope text-[9.3px] font-extrabold tracking-[0.21em] uppercase"
              >
                <textPath href="#guidanceCirclePath" startOffset="0%">
                  GOOD GUIDANCE • CHANGES EVERYTHING •
                </textPath>
              </text>
            </svg>

            {/* Center Coral Dot */}
            <span className="absolute h-3 w-3 rounded-full bg-brand-orange" />
          </div>

          {/* Bottom-Left Featured Tuition Card Overlay */}
          <div className="absolute bottom-0 left-0 z-10 w-60 bg-brand-orange p-4 text-[#141519] sm:w-64">
            <p className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-[#141519]/80">
              CLASS 10 · MATHS
            </p>
            <p className="mt-1 font-heading text-2xl font-extrabold tracking-tight text-[#141519]">
              ৳4,500/mo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
