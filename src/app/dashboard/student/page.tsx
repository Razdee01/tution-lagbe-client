import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function StudentDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  const res = email
    ? await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/applications/${encodeURIComponent(email)}`,
        { cache: "no-store" },
      )
    : null;

  const applications = res?.ok ? await res.json() : [];


  const totalApplications = applications.length;
  const acceptedApplications = applications.filter(
    (app: { status?: string }) => app.status === "accepted",
  ).length;
  const pendingApplications = applications.filter(
    (app: { status?: string }) => app.status === "pending",
  ).length;

  const stats = [
    { label: "TOTAL APPLIED TUITIONS", value: String(totalApplications) },
    { label: "ACCEPTED APPLICATIONS", value: String(acceptedApplications) },
    { label: "PENDING APPLICATIONS", value: String(pendingApplications) },
    { label: "CURRENT PLAN", value: "FREE" },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
        Student Overview
      </h1>

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
