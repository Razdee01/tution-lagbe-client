import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

interface TuitionDoc {
  _id: string;
  approvalStatus?: string;
  isActive?: boolean;
}

export default async function TutorDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email ?? "";
  const plan = String(
    (session?.user as { plan?: string } | undefined)?.plan ?? "FREE",
  ).toUpperCase();

  const tuitionsRes = email
    ? await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tuitions/tutor/${encodeURIComponent(email)}`,
        { cache: "no-store" },
      )
    : null;

  const appsRes = email
    ? await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/applications/tutor/${encodeURIComponent(email)}`,
        { cache: "no-store" },
      )
    : null;

  const tuitionsData = tuitionsRes?.ok ? await tuitionsRes.json() : [];
  const tuitions: TuitionDoc[] = Array.isArray(tuitionsData)
    ? tuitionsData
    : (tuitionsData?.tuitions ?? []);

  const appsData = appsRes?.ok ? await appsRes.json() : [];
  const applicants = Array.isArray(appsData)
    ? appsData
    : (appsData?.applications ?? []);

  const totalPosted = tuitions.length;
  const activeApproved = tuitions.filter(
    (t) => t.approvalStatus === "approved" && t.isActive !== false,
  ).length;
  const totalApplicants = applicants.length;

  const stats = [
    { label: "TOTAL TUITIONS POSTED", value: String(totalPosted) },
    { label: "ACTIVE / APPROVED", value: String(activeApproved) },
    { label: "TOTAL APPLICANTS", value: String(totalApplicants) },
    { label: "CURRENT PLAN", value: plan },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
          Tutor Overview
        </h1>
        <Link
          href="/dashboard/tutor/post-tuition"
          className="rounded-xl bg-brand-orange px-5 py-3 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519]"
        >
          POST NEW TUITION
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-card p-6">
            <p className="font-manrope text-[10px] font-extrabold tracking-[0.15em] uppercase text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-2 font-heading text-3xl font-extrabold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
