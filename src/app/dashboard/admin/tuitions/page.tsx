"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { authHeaders, syncJwtToken } from "@/lib/jwt";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

interface AdminTuitionItem {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: string;
  location?: string;
  monthlyFee: number;
  tutorName?: string;
  tutorEmail?: string;
  approvalStatus: "pending" | "approved" | "rejected";
}

export default function AdminTuitionsPage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email ?? "";

  const [tuitions, setTuitions] = useState<AdminTuitionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadTuitions = useCallback(async (adminEmail: string) => {
    try {
      setLoading(true);
      await syncJwtToken(adminEmail);

      const res = await fetch(`${API_URL}/admin/tuitions`, {
        cache: "no-store",
        headers: authHeaders(),
      });

      if (res.ok) {
        const data = await res.json();
        setTuitions(Array.isArray(data) ? data : (data?.tuitions ?? []));
      }
    } catch {
      toast.error("Failed to load tuitions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPending) return;
    if (!email) {
      setLoading(false);
      return;
    }
    loadTuitions(email);
  }, [email, isPending, loadTuitions]);

  const handleApproval = async (
    id: string,
    approvalStatus: "approved" | "rejected",
  ) => {
    try {
      setUpdatingId(id);
      if (email) {
        await syncJwtToken(email);
      }

      const res = await fetch(`${API_URL}/admin/tuitions/${id}/approval`, {
        method: "PATCH",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ approvalStatus }),
      });

      if (!res.ok) {
        toast.error(`Failed to mark tuition as ${approvalStatus}`);
        return;
      }

      toast.success(`Tuition ${approvalStatus}`);
      setTuitions((prev) =>
        prev.map((t) => (t._id === id ? { ...t, approvalStatus } : t)),
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
        Tuition Approvals
      </h1>

      {isPending || loading ? (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-44 animate-pulse rounded-2xl bg-card" />
          ))}
        </div>
      ) : tuitions.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-card p-8 text-center">
          <p className="font-heading text-xl font-extrabold">
            No tuitions submitted yet
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {tuitions.map((item) => {
            const status = (item.approvalStatus || "pending").toLowerCase();
            return (
              <div
                key={item._id}
                className="flex flex-col justify-between rounded-2xl bg-card p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-manrope text-[10px] font-extrabold tracking-[0.14em] uppercase text-brand-orange">
                      {item.subject} · {item.classLevel}
                    </span>
                    <span className="rounded-md bg-surface-warm px-2.5 py-1 font-manrope text-[10px] font-extrabold uppercase">
                      {status}
                    </span>
                  </div>

                  <h2 className="mt-2 font-heading text-xl font-extrabold">
                    {item.title}
                  </h2>
                  <p className="mt-1 font-manrope text-xs text-muted-foreground">
                    Tutor: {item.tutorName || "Tutor"}{" "}
                    {item.tutorEmail ? `(${item.tutorEmail})` : ""} ·{" "}
                    {item.mode}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                  <p className="mt-3 font-heading text-lg font-extrabold">
                    ৳{Number(item.monthlyFee || 0).toLocaleString()}{" "}
                    <span className="font-manrope text-[10px] uppercase text-muted-foreground">
                      / MO
                    </span>
                  </p>
                </div>

                <div className="mt-5 flex gap-2 border-t border-foreground/10 pt-4">
                  <button
                    type="button"
                    disabled={updatingId === item._id || status === "approved"}
                    onClick={() => handleApproval(item._id, "approved")}
                    className="cursor-pointer rounded-xl bg-brand-orange px-4 py-2 font-manrope text-[11px] font-extrabold uppercase text-[#141519] disabled:opacity-50"
                  >
                    APPROVE
                  </button>
                  <button
                    type="button"
                    disabled={updatingId === item._id || status === "rejected"}
                    onClick={() => handleApproval(item._id, "rejected")}
                    className="cursor-pointer rounded-xl bg-red-500/15 px-4 py-2 font-manrope text-[11px] font-extrabold uppercase text-red-700 disabled:opacity-50 dark:text-red-400"
                  >
                    REJECT
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
