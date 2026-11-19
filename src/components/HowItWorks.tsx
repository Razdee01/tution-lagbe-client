import React from "react";

interface StepItem {
  number: string;
  title: string;
  description: string;
}

const steps: StepItem[] = [
  {
    number: "01",
    title: "Find",
    description: "Discover tuition opportunities that match your needs.",
  },
  {
    number: "02",
    title: "Explore",
    description: "Learn about tutors and their teaching styles.",
  },
  {
    number: "03",
    title: "Apply",
    description: "Connect with the right tutor.",
  },
  {
    number: "04",
    title: "Grow",
    description: "Begin your learning journey.",
  },
];

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="w-full bg-[#111318] py-16 text-[#FAF8F5] dark:bg-[#0B0C0F] sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Eyebrow & Main Heading */}
        <p className="font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
          HOW IT WORKS / 03
        </p>

        <h2
          id="how-it-works-heading"
          className="mt-4 font-heading text-4xl leading-[1.04] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        >
          <span className="block text-[#FAF8F5]">Four steps.</span>
          <span className="block text-brand-orange">One better future.</span>
        </h2>

        {/* 4-Column Step Cards */}
        <div className="mt-12 grid grid-cols-1 border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`group relative flex flex-col justify-between pt-8 pr-6 pb-8 transition-colors duration-200 sm:pr-8 ${
                index < steps.length - 1
                  ? "border-b border-white/15 lg:border-r lg:border-b-0"
                  : ""
              } ${index % 2 === 0 ? "sm:border-r lg:border-r" : ""} ${
                index === steps.length - 1 ? "lg:border-r-0" : ""
              } ${index > 0 ? "lg:pl-8" : ""}`}
            >
              {/* Outlined Display Number -> Fills with Coral Orange on Card Hover */}
              <div
                aria-hidden="true"
                className="select-none font-heading text-6xl leading-none font-extrabold tracking-tight text-transparent transition-all duration-300 [-webkit-text-stroke:1.5px_rgba(250,248,245,0.28)] group-hover:-translate-y-1 group-hover:text-brand-orange group-hover:[-webkit-text-stroke:1.5px_var(--brand-orange)] sm:text-7xl"
              >
                {step.number}
              </div>

              {/* Step Title & Description */}
              <div className="mt-10 sm:mt-14">
                <h3 className="font-heading text-xl font-bold tracking-tight text-[#FAF8F5] transition-colors duration-200 group-hover:text-brand-orange">
                  {step.title}
                </h3>
                <p className="mt-2.5 max-w-[24ch] font-manrope text-sm leading-relaxed text-[#A3A7B3]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
