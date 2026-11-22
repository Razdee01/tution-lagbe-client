import React from "react";

const stats = [
  { label: "TOTAL TUITIONS POSTED", value: "0" },
  { label: "ACTIVE / APPROVED", value: "0" },
  { label: "TOTAL APPLICANTS", value: "0" },
  { label: "CURRENT PLAN", value: "FREE" },
];

export default function TutorDashboardPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
        Tutor Overview
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
