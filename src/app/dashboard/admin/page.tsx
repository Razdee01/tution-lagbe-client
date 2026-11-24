"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { authHeaders, syncJwtToken } from "@/lib/jwt";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function AdminDashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email ?? "";

  const [overview, setOverview] = useState({
    totalUsers: 0,
    totalTutors: 0,
    pendingTuitions: 0,
    approvedTuitions: 0,
    totalRevenue: 0,
  });
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

        const res = await fetch(`${API_URL}/admin/overview`, {
          cache: "no-store",
          headers: authHeaders(),
        });

        if (res.ok) {
          const data = await res.json();
          setOverview({
            totalUsers: Number(data?.totalUsers ?? 0),
            totalTutors: Number(data?.totalTutors ?? 0),
            pendingTuitions: Number(data?.pendingTuitions ?? 0),
            approvedTuitions: Number(data?.approvedTuitions ?? 0),
            totalRevenue: Number(data?.totalRevenue ?? 0),
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, [email, isPending]);

  const stats = [
    { label: "TOTAL USERS", value: String(overview.totalUsers) },
    { label: "TOTAL TUTORS", value: String(overview.totalTutors) },
    {
      label: "PENDING / APPROVED TUITIONS",
      value: `${overview.pendingTuitions} / ${overview.approvedTuitions}`,
    },
    {
      label: "TOTAL STRIPE REVENUE",
      value: `$${overview.totalRevenue.toLocaleString()}`,
    },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
        Admin Overview
      </h1>

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
