import React from "react";

export default async function AdminDashboardPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/overview`, {
    cache: "no-store",
  });
  const data = res.ok ? await res.json() : {};
 
  

  const totalUsers = Number(data?.totalUsers ?? 0);
  const totalTutors = Number(data?.totalTutors ?? 0);
  const pendingCount = Number(data?.pendingTuitions ?? 0);
  const approvedCount = Number(data?.approvedTuitions ?? 0);
  const totalRevenue = Number(data?.totalRevenue ?? 0);

  const stats = [
    { label: "TOTAL USERS", value: String(totalUsers) },
    { label: "TOTAL TUTORS", value: String(totalTutors) },
    {
      label: "PENDING / APPROVED TUITIONS",
      value: `${pendingCount} / ${approvedCount}`,
    },
    {
      label: "TOTAL STRIPE REVENUE",
      value: `$${totalRevenue.toLocaleString()}`,
    },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
        Admin Overview
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
