"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Tuition } from "@/type/type";

export default function ApplyModal({ tuition }: { tuition: Tuition }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    try {
      setSubmitting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/applications`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tuitionId: tuition._id,
            tuitionTitle: tuition.title,
            tutorEmail: tuition.tutorEmail,
            ...values,
          }),
        },
      );

      if (!res.ok) throw new Error("Failed to apply");
      setOpen(false);
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
              <input
                name="studentName"
                type="text"
                required
                placeholder="Your Full Name"
                className="w-full rounded-xl bg-surface-warm px-4 py-3 font-manrope text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
              <input
                name="studentEmail"
                type="email"
                required
                placeholder="Your Email"
                className="w-full rounded-xl bg-surface-warm px-4 py-3 font-manrope text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
              <input
                name="preferredSchedule"
                type="text"
                required
                placeholder="Preferred Days & Time (e.g., Sun, Tue · 5 PM)"
                className="w-full rounded-xl bg-surface-warm px-4 py-3 font-manrope text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
              <textarea
                name="message"
                rows={3}
                required
                placeholder="Note for tutor..."
                className="w-full rounded-xl bg-surface-warm px-4 py-3 font-manrope text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />

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
                  disabled={submitting}
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
