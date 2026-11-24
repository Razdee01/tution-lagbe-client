"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { authHeaders, syncJwtToken } from "@/lib/jwt";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

interface TuitionDoc {
  _id: string;
  approvalStatus?: string;
  isActive?: boolean;
}

export default function TutorDashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email ?? "";

  const [tuitions, setTuitions] = useState<TuitionDoc[]>([]);
  const [applicants, setApplicants] = useState<unknown[]>([]);
  const [plan, setPlan] = useState<string>("FREE");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!email) {
      setLoading(false);
      return;
    }

    const loadOverview = async () => {
      try {
        setLoading(true);
        await syncJwtToken(email);

        const [tuitionsRes, appsRes, profileRes] = await Promise.all([
          fetch(`${API_URL}/tuitions/tutor/${encodeURIComponent(email)}`, {
            cache: "no-store",
            headers: authHeaders(),
          }),
          fetch(`${API_URL}/applications/tutor/${encodeURIComponent(email)}`, {
            cache: "no-store",
            headers: authHeaders(),
          }),
          fetch(`${API_URL}/users/profile/${encodeURIComponent(email)}`, {
            cache: "no-store",
            headers: authHeaders(),
          }),
        ]);

        if (tuitionsRes.ok) {
          const tuitionsData = await tuitionsRes.json();
          setTuitions(
            Array.isArray(tuitionsData)
              ? tuitionsData
              : (tuitionsData?.tuitions ?? []),
          );
        }

        if (appsRes.ok) {
          const appsData = await appsRes.json();
          setApplicants(
            Array.isArray(appsData) ? appsData : (appsData?.applications ?? []),
          );
        }

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setPlan(
            String(
              profileData?.plan ??
                (session?.user as { plan?: string } | undefined)?.plan ??
                "FREE",
            ).toUpperCase(),
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, [email, isPending, session?.user]);

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

      {isPending || loading ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-28 animate-pulse rounded-2xl bg-card" />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}
