import React from "react";
import Link from "next/link";

interface SubjectCardItem {
  id: string;
  name: string;
  countLabel: string;
  href: string;
  className: string;
  titleClassName: string;
  metaClassName: string;
  isLarge?: boolean;
  isBottomBanner?: boolean;
}

const subjects: SubjectCardItem[] = [
  {
    id: "mathematics",
    name: "Mathematics",
    countLabel: "210 TUITIONS",
    href: "/tuitions?subject=Mathematics",
    className:
      "bg-[#121317] text-brand-orange border-r border-b border-foreground lg:col-span-6 lg:row-span-2 min-h-[240px] lg:min-h-[340px]",
    titleClassName:
      "font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-orange group-hover:text-[#141519]",
    metaClassName:
      "font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-[#FAF8F5]/80 group-hover:text-[#141519]",
    isLarge: true,
  },
  {
    id: "physics",
    name: "Physics",
    countLabel: "145 TUITIONS",
    href: "/tuitions?subject=Physics",
    className:
      "bg-brand-lavender text-[#141519] border-b border-foreground lg:col-span-6 min-h-[145px] lg:min-h-[170px]",
    titleClassName:
      "font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141519]",
    metaClassName:
      "font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-[#141519]/80",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    countLabel: "120 TUITIONS",
    href: "/tuitions?subject=Chemistry",
    className:
      "bg-[#F7F3EB] dark:bg-[#1E2129] text-foreground border-b border-r border-foreground lg:col-span-4 min-h-[145px] lg:min-h-[170px]",
    titleClassName:
      "font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground group-hover:text-[#141519]",
    metaClassName:
      "font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-muted-foreground group-hover:text-[#141519]",
  },
  {
    id: "biology",
    name: "Biology",
    countLabel: "98 TUITIONS",
    href: "/tuitions?subject=Biology",
    className:
      "bg-brand-yellow text-[#141519] border-b border-foreground lg:col-span-2 min-h-[145px] lg:min-h-[170px]",
    titleClassName:
      "font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141519]",
    metaClassName:
      "font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-[#141519]/80",
  },
  {
    id: "english",
    name: "English",
    countLabel: "165 TUITIONS",
    href: "/tuitions?subject=English",
    className:
      "bg-[#F7F3EB] dark:bg-[#1E2129] text-foreground border-b border-r border-foreground lg:col-span-4 min-h-[145px] lg:min-h-[155px]",
    titleClassName:
      "font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground group-hover:text-[#141519]",
    metaClassName:
      "font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-muted-foreground group-hover:text-[#141519]",
  },
  {
    id: "ict-programming",
    name: "ICT & Programming",
    countLabel: "78 TUITIONS",
    href: "/tuitions?subject=ICT+%26+Programming",
    className:
      "bg-[#121317] text-[#FAF8F5] border-b border-r border-foreground lg:col-span-4 min-h-[145px] lg:min-h-[155px]",
    titleClassName:
      "font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FAF8F5] group-hover:text-[#141519]",
    metaClassName:
      "font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-[#FAF8F5]/75 group-hover:text-[#141519]",
  },
  {
    id: "ielts",
    name: "IELTS",
    countLabel: "52 TUITIONS",
    href: "/tuitions?subject=IELTS",
    className:
      "bg-brand-orange text-[#141519] border-b border-foreground lg:col-span-4 min-h-[145px] lg:min-h-[155px]",
    titleClassName:
      "font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141519]",
    metaClassName:
      "font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-[#141519]/85",
  },
  {
    id: "admission-preparation",
    name: "Admission Preparation",
    countLabel: "84 TUITIONS →",
    href: "/tuitions?subject=Admission+Prep",
    className:
      "bg-[#F7F3EB] dark:bg-[#1E2129] text-foreground lg:col-span-12 min-h-[115px] lg:min-h-[130px]",
    titleClassName:
      "font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground group-hover:text-[#141519]",
    metaClassName:
      "font-manrope text-[10px] sm:text-xs font-extrabold tracking-[0.16em] uppercase text-muted-foreground group-hover:text-[#141519]",
    isBottomBanner: true,
  },
];

export default function SubjectsGrid() {
  return (
    <section
      aria-labelledby="subjects-heading"
      className="w-full bg-surface-warm py-16 text-foreground transition-colors duration-200 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Eyebrow & Section Title */}
        <p className="font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
          SUBJECTS 
        </p>

        <h2
          id="subjects-heading"
          className="mt-3 font-heading text-4xl leading-[1.03] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          What are you
          <br />
          curious about?
        </h2>

        {/* Editorial Bento Grid */}
        <div className="mt-10 grid grid-cols-1 border border-foreground sm:grid-cols-2 lg:grid-cols-12">
          {subjects.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`group relative flex justify-between p-6 transition-colors duration-200 hover:!bg-brand-orange hover:!text-[#141519] sm:p-7 ${
                item.isBottomBanner
                  ? "flex-col justify-between gap-4 sm:flex-row sm:items-end"
                  : "flex-col justify-between"
              } ${item.className}`}
            >
              <h3 className={item.titleClassName}>{item.name}</h3>

              <span
                className={`${item.metaClassName} ${
                  item.isBottomBanner ? "sm:text-right" : "mt-8"
                }`}
              >
                {item.countLabel}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
