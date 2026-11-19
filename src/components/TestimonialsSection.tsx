import React from "react";
import { Star } from "lucide-react";

interface SideTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  isLavender?: boolean;
}

const sideTestimonials: SideTestimonial[] = [
  {
    id: "tanvir",
    quote:
      '"I filled my schedule within two weeks. The students here genuinely want to learn."',
    author: "Tanvir Ahmed",
    role: "TUTOR · MATHEMATICS",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    isLavender: false,
  },
  {
    id: "farhana",
    quote:
      '"I found a mentor who knew the admission test inside out. That changed everything."',
    author: "Farhana Rahman",
    role: "STUDENT · UNIVERSITY ADMISSION",
    avatar:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80",
    isLavender: true,
  },
];

export default function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="w-full bg-surface-warm py-16 text-foreground transition-colors duration-200 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Eyebrow & Headline */}
        <p className="font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
          TESTIMONIALS / 05
        </p>

        <h2
          id="testimonials-heading"
          className="mt-3 font-heading text-4xl leading-[1.03] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Stories from the
          <br />
          other side of the desk.
        </h2>

        {/* Split Editorial Grid */}
        <div className="mt-10 grid grid-cols-1 border-t border-b border-foreground/70 lg:grid-cols-12">
          {/* Left Featured Testimonial */}
          <div className="flex flex-col gap-6 border-b border-foreground/70 py-8 lg:col-span-7 lg:flex-row lg:items-start lg:gap-8 lg:border-r lg:border-b-0 lg:pr-8">
            <div className="h-64 w-full shrink-0 overflow-hidden border border-border/30 bg-muted sm:h-72 sm:w-56">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
                alt="Ayesha Akter"
                className="h-full w-full object-cover object-top grayscale contrast-110"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                {/* 5 Coral Stars */}
                <div
                  aria-label="5 out of 5 stars"
                  className="flex items-center gap-1 text-brand-orange"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-brand-orange text-brand-orange"
                    />
                  ))}
                </div>

                {/* Large Coral Quote Mark */}
                <div
                  aria-hidden="true"
                  className="mt-2 font-heading text-4xl leading-none font-extrabold text-brand-orange select-none"
                >
                  “
                </div>

                {/* Main Quote */}
                <blockquote className="mt-1 font-heading text-2xl leading-[1.15] font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-[2.15rem]">
                  I went from failing maths to scoring an A+. My tutor
                  didn&apos;t just teach formulas — she taught me I could
                  actually do this.
                </blockquote>
              </div>

              {/* Attribution */}
              <div className="mt-8">
                <p className="font-heading text-sm font-bold text-foreground">
                  Ayesha Akter
                </p>
                <p className="mt-0.5 font-manrope text-[10px] font-extrabold tracking-[0.15em] uppercase text-muted-foreground">
                  STUDENT · CLASS 10, DHAKA
                </p>
              </div>
            </div>
          </div>

          {/* Right Stacked Cards */}
          <div className="flex flex-col justify-between gap-5 py-8 lg:col-span-5 lg:pl-8">
            {sideTestimonials.map((item) => (
              <article
                key={item.id}
                className={`flex items-start gap-4 border p-5 transition-transform duration-200 hover:-translate-y-0.5 ${
                  item.isLavender
                    ? "border-foreground/20 bg-brand-lavender text-[#141519]"
                    : "border-border/40 bg-card text-foreground"
                }`}
              >
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="h-16 w-16 shrink-0 border border-foreground/20 object-cover object-top grayscale contrast-110"
                />

                <div className="min-w-0 flex-1">
                  <p
                    className={`font-heading text-sm leading-snug font-bold sm:text-base ${
                      item.isLavender ? "text-[#141519]" : "text-foreground"
                    }`}
                  >
                    {item.quote}
                  </p>

                  <p
                    className={`mt-3 font-heading text-xs font-extrabold ${
                      item.isLavender ? "text-[#141519]" : "text-foreground"
                    }`}
                  >
                    {item.author}
                  </p>

                  <p
                    className={`mt-0.5 font-manrope text-[10px] font-bold tracking-[0.14em] uppercase ${
                      item.isLavender
                        ? "text-[#141519]/75"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
