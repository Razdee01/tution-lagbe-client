import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays, Mail, MapPin, User } from "lucide-react";
import { Tuition } from "@/type/type";
import ApplyModal from "@/components/ApplyModal";


const TuitionDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tuitions/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch tuition: ${res.status}`);
  }

  const raw = await res.json();
  const tuition: Tuition = raw?.result ?? raw?.data ?? raw?.tuition ?? raw;

  return (
    <section className="w-full bg-surface-warm py-16 text-foreground sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <Link
          href="/browse-tuition"
          className="inline-flex items-center gap-2 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-muted-foreground transition-colors hover:text-brand-orange"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>BACK TO BROWSE TUITION</span>
        </Link>

        <div className="mt-6 overflow-hidden rounded-2xl bg-card">
          {tuition?.bannerImage && (
            <div className="relative h-64 w-full bg-muted sm:h-80">
              <Image
                src={tuition.bannerImage}
                alt={tuition.title || "Tuition Banner"}
                fill
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-cover"
              />
              <span className="absolute top-4 left-4 rounded-md bg-[#141519] px-3 py-1 font-manrope text-[10px] font-extrabold tracking-[0.14em] uppercase text-[#FAF8F5]">
                {tuition.mode}
              </span>
            </div>
          )}

          <div className="p-6 sm:p-10">
            <p className="font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
              {tuition.subject} / {tuition.classLevel}
            </p>

            <h1 className="mt-3 font-heading text-3xl leading-tight font-extrabold tracking-tight text-foreground sm:text-5xl">
              {tuition.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-b border-foreground/10 py-5 font-manrope text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-orange" />
                <span>{tuition.location}</span>
              </span>

              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-brand-orange" />
                <span>{tuition.daysPerWeek} days/week</span>
              </span>
            </div>

            <p className="mt-6 font-manrope text-base leading-relaxed text-muted-foreground">
              {tuition.description}
            </p>

            {/* Tutor Details */}
            <div className="mt-8 rounded-2xl bg-surface-warm p-6">
              <p className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange">
                TUTOR DETAILS
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-card text-foreground">
                  <User className="h-5 w-5 text-brand-orange" />
                </div>
                <div>
                  <p className="font-heading text-lg font-extrabold text-foreground">
                    {tuition.tutorName}
                  </p>
                  {tuition.tutorEmail && (
                    <p className="flex items-center gap-1.5 font-manrope text-xs text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 text-brand-orange" />
                      <span>{tuition.tutorEmail}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Fee & Apply Button */}
            <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl bg-surface-warm p-6 sm:flex-row sm:items-center">
              <div>
                <p className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-muted-foreground">
                  MONTHLY TUITION FEE
                </p>
                <p className="mt-1 font-heading text-3xl font-extrabold text-foreground">
                  ৳{Number(tuition.monthlyFee || 0).toLocaleString()}{" "}
                  <span className="font-manrope text-xs font-bold tracking-[0.14em] uppercase text-muted-foreground">
                    / MONTH
                  </span>
                </p>
              </div>

              <ApplyModal tuition={tuition} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TuitionDetailsPage;
