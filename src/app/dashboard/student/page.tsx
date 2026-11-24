"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { authHeaders, syncJwtToken } from "@/lib/jwt";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function StudentDashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email ?? "";

  const [applications, setApplications] = useState<{ status?: string }[]>([]);
  const [plan, setPlan] = useState<string>("FREE");
  const [savedCount, setSavedCount] = useState<number>(0);
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

        const [appsRes, profileRes] = await Promise.all([
          fetch(`${API_URL}/applications/${encodeURIComponent(email)}`, {
            cache: "no-store",
            headers: authHeaders(),
          }),
          fetch(`${API_URL}/users/profile/${encodeURIComponent(email)}`, {
            cache: "no-store",
            headers: authHeaders(),
          }),
        ]);

        if (appsRes.ok) {
          const appsData = await appsRes.json();
          setApplications(
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
          setSavedCount(
            Array.isArray(profileData?.bookmarkedTuitionIds)
              ? profileData.bookmarkedTuitionIds.length
              : 0,
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, [email, isPending, session?.user]);

  const totalApplications = applications.length;
  const acceptedApplications = applications.filter(
    (app) => app.status === "accepted",
  ).length;
  const pendingApplications = applications.filter(
    (app) => app.status === "pending",
  ).length;

  const stats = [
    { label: "TOTAL APPLIED TUITIONS", value: String(totalApplications) },
    { label: "ACCEPTED APPLICATIONS", value: String(acceptedApplications) },
    { label: "PENDING APPLICATIONS", value: String(pendingApplications) },
    { label: "SAVED TUITIONS", value: String(savedCount) },
    { label: "CURRENT PLAN", value: plan },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
        Student Overview
      </h1>

      {isPending || loading ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="h-28 animate-pulse rounded-2xl bg-card" />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
