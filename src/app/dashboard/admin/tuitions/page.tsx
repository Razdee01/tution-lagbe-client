"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface TuitionModerationItem {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: string;
  monthlyFee: number;
  tutorName?: string;
  tutorEmail: string;
  approvalStatus: "pending" | "approved" | "rejected";
}

export default function AdminTuitionsPage() {
  const [tuitions, setTuitions] = useState<TuitionModerationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTuitions = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/tuitions`,
      { cache: "no-store" },
    );
    const data = res.ok ? await res.json() : [];
    setTuitions(Array.isArray(data) ? data : (data?.tuitions ?? []));
    setLoading(false);
  };

  useEffect(() => {
    loadTuitions();
  }, []);

  const handleApproval = async (
    id: string,
    approvalStatus: "approved" | "rejected",
  ) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/tuitions/${id}/approval`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approvalStatus }),
      },
    );

    if (!res.ok) {
      toast.error(`Failed to ${approvalStatus} tuition`);
      return;
    }

    toast.success(`Tuition ${approvalStatus}`);
    setTuitions((prev) =>
      prev.map((t) => (t._id === id ? { ...t, approvalStatus } : t)),
    );
  };

  return (
    <div>
      <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
        Tuition Approvals
      </h1>

      {loading ? (
        <p className="mt-6 font-manrope text-sm text-muted-foreground">
          Loading tuitions...
        </p>
      ) : tuitions.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-card p-8 text-center">
          <p className="font-heading text-xl font-extrabold">
            No tuitions to review
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {tuitions.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-between rounded-2xl bg-card p-6"
            >
              <div>
                <span className="rounded-md bg-surface-warm px-2.5 py-1 font-manrope text-[10px] font-extrabold uppercase text-brand-orange">
                  {item.approvalStatus}
                </span>

                <h2 className="mt-3 font-heading text-xl font-extrabold">
                  {item.title}
                </h2>
                <p className="mt-1 font-manrope text-xs text-muted-foreground">
                  {item.subject} · {item.classLevel} · {item.mode} · ৳
                  {Number(item.monthlyFee || 0).toLocaleString()}/mo
                </p>
                <p className="mt-2 font-manrope text-xs text-muted-foreground">
                  Tutor: {item.tutorName || item.tutorEmail} ({item.tutorEmail})
                </p>
              </div>

              <div className="mt-5 flex gap-2 border-t border-foreground/10 pt-4">
                <button
                  type="button"
                  onClick={() => handleApproval(item._id, "approved")}
                  className="cursor-pointer rounded-xl bg-brand-orange px-4 py-2 font-manrope text-[11px] font-extrabold uppercase text-[#141519]"
                >
                  APPROVE
                </button>
                <button
                  type="button"
                  onClick={() => handleApproval(item._id, "rejected")}
                  className="cursor-pointer rounded-xl bg-red-500/15 px-4 py-2 font-manrope text-[11px] font-extrabold uppercase text-red-700 dark:text-red-400"
                >
                  REJECT
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
