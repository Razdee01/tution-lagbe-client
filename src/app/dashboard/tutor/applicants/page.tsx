"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { authHeaders, syncJwtToken } from "@/lib/jwt";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

interface ApplicantItem {
  _id: string;
  tuitionTitle: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  preferredSchedule?: string;
  studentNote?: string;
  status: "pending" | "accepted" | "rejected";
}

export default function TutorApplicantsPage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email ?? "";

  const [applicants, setApplicants] = useState<ApplicantItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadApplicants = useCallback(async (tutorEmail: string) => {
    setLoading(true);
    await syncJwtToken(tutorEmail);
    const res = await fetch(
      `${API_URL}/applications/tutor/${encodeURIComponent(tutorEmail)}`,
      {
        cache: "no-store",
        headers: authHeaders(),
      },
    );
    const data = res.ok ? await res.json() : [];
    setApplicants(Array.isArray(data) ? data : (data?.applications ?? []));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isPending) return;
    if (!email) {
      setLoading(false);
      return;
    }
    loadApplicants(email);
  }, [email, isPending, loadApplicants]);

  const handleStatus = async (id: string, status: "accepted" | "rejected") => {
    if (email) {
      await syncJwtToken(email);
    }

    const res = await fetch(`${API_URL}/applications/${id}/status`, {
      method: "PATCH",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      toast.error(`Failed to mark as ${status}`);
      return;
    }

    toast.success(`Application ${status}`);
    setApplicants((prev) =>
      prev.map((app) => (app._id === id ? { ...app, status } : app)),
    );
  };

  return (
    <div>
      <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
        Applicants
      </h1>

      {isPending || loading ? (
        <p className="mt-6 font-manrope text-sm text-muted-foreground">
          Loading applicants...
        </p>
      ) : applicants.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-card p-8 text-center">
          <p className="font-heading text-xl font-extrabold">
            No student applications yet
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {applicants.map((app) => (
            <div
              key={app._id}
              className="flex flex-col justify-between rounded-2xl bg-card p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-manrope text-[10px] font-extrabold tracking-[0.14em] uppercase text-brand-orange">
                    {app.tuitionTitle}
                  </span>
                  <span className="rounded-md bg-surface-warm px-2.5 py-1 font-manrope text-[10px] font-extrabold uppercase">
                    {app.status}
                  </span>
                </div>

                <h2 className="mt-2 font-heading text-xl font-extrabold">
                  {app.studentName}
                </h2>
                <p className="font-manrope text-xs text-muted-foreground">
                  {app.studentEmail}
                  {app.studentPhone ? ` · ${app.studentPhone}` : ""}
                </p>

                {app.preferredSchedule && (
                  <p className="mt-3 rounded-xl bg-surface-warm p-3 font-manrope text-xs">
                    <span className="font-bold">Schedule:</span>{" "}
                    {app.preferredSchedule}
                  </p>
                )}

                {app.studentNote && (
                  <p className="mt-2 font-manrope text-xs text-muted-foreground">
                    &ldquo;{app.studentNote}&rdquo;
                  </p>
                )}
              </div>

              <div className="mt-5 flex gap-2 border-t border-foreground/10 pt-4">
                <button
                  type="button"
                  onClick={() => handleStatus(app._id, "accepted")}
                  className="cursor-pointer rounded-xl bg-brand-orange px-4 py-2 font-manrope text-[11px] font-extrabold uppercase text-[#141519]"
                >
                  ACCEPT
                </button>
                <button
                  type="button"
                  onClick={() => handleStatus(app._id, "rejected")}
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
