"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Tuition } from "@/type/type";
import { authClient } from "@/lib/auth-client";
import { authHeaders, syncJwtToken } from "@/lib/jwt";

export default function ApplyModal({ tuition }: { tuition: Tuition }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const studentName = session?.user?.name ?? "";
  const studentEmail = session?.user?.email ?? "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    try {
      setSubmitting(true);
      if (studentEmail) {
        await syncJwtToken(studentEmail);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/applications`,
        {
          method: "POST",
          headers: authHeaders({ "Content-Type": "application/json" }),
          body: JSON.stringify({
            tuitionId: tuition._id,
            tuitionTitle: tuition.title,
            subject: tuition.subject,
            monthlyFee: tuition.monthlyFee,
            tutorEmail: tuition.tutorEmail,
            studentName,
            studentEmail,
            studentPhone: values.studentPhone,
            preferredSchedule: values.preferredSchedule,
            studentNote: values.studentNote,
            status: "pending",
            appliedAt: new Date().toISOString(),
          }),
        },
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.message || "Failed to apply");
      }

      form.reset();
      setOpen(false);
      toast.success("Application submitted successfully!");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not submit application",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer rounded-xl bg-brand-orange px-6 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519] transition-transform hover:-translate-y-0.5"
      >
        APPLY FOR TUITION
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-lg rounded-2xl bg-card p-6 text-foreground sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange">
                  APPLICATION
                </p>
                <h2 className="mt-1 font-heading text-2xl font-extrabold">
                  Apply for Tuition
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-lg p-1.5 text-muted-foreground hover:bg-surface-warm"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="studentName"
                  className="mb-1.5 block font-manrope text-[11px] font-bold tracking-[0.1em] uppercase text-muted-foreground"
                >
                  Full Name
                </label>
                <input
                  id="studentName"
                  name="studentName"
                  type="text"
                  readOnly
                  value={isPending ? "Loading..." : studentName}
                  className="w-full cursor-not-allowed rounded-xl bg-surface-warm/70 px-4 py-3 font-manrope text-sm text-muted-foreground focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="studentEmail"
                  className="mb-1.5 block font-manrope text-[11px] font-bold tracking-[0.1em] uppercase text-muted-foreground"
                >
                  Email Address
                </label>
                <input
                  id="studentEmail"
                  name="studentEmail"
                  type="email"
                  readOnly
                  value={isPending ? "Loading..." : studentEmail}
                  className="w-full cursor-not-allowed rounded-xl bg-surface-warm/70 px-4 py-3 font-manrope text-sm text-muted-foreground focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="studentPhone"
                  className="mb-1.5 block font-manrope text-[11px] font-bold tracking-[0.1em] uppercase text-foreground"
                >
                  Phone Number
                </label>
                <input
                  id="studentPhone"
                  name="studentPhone"
                  type="tel"
                  required
                  placeholder="e.g., 017XXXXXXXX"
                  className="w-full rounded-xl bg-surface-warm px-4 py-3 font-manrope text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="preferredSchedule"
                  className="mb-1.5 block font-manrope text-[11px] font-bold tracking-[0.1em] uppercase text-foreground"
                >
                  Preferred Schedule
                </label>
                <input
                  id="preferredSchedule"
                  name="preferredSchedule"
                  type="text"
                  required
                  placeholder="Preferred Days & Time (e.g., Sun, Tue · 5 PM)"
                  className="w-full rounded-xl bg-surface-warm px-4 py-3 font-manrope text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="studentNote"
                  className="mb-1.5 block font-manrope text-[11px] font-bold tracking-[0.1em] uppercase text-foreground"
                >
                  Note for Tutor
                </label>
                <textarea
                  id="studentNote"
                  name="studentNote"
                  rows={3}
                  required
                  placeholder="Note for tutor..."
                  className="w-full rounded-xl bg-surface-warm px-4 py-3 font-manrope text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="cursor-pointer rounded-xl bg-surface-warm px-4 py-3 font-manrope text-xs font-extrabold uppercase"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={submitting || isPending || !session?.user}
                  className="cursor-pointer rounded-xl bg-brand-orange px-6 py-3 font-manrope text-xs font-extrabold uppercase text-[#141519] disabled:opacity-60"
                >
                  {submitting ? "SENDING..." : "SUBMIT"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
