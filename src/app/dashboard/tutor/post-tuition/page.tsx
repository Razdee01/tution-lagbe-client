"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function PostTuitionPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [submitting, setSubmitting] = useState(false);
  const [mode, setMode] = useState<"Online" | "Offline">("Online");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const tutorName = session?.user?.name ?? "";
  const tutorEmail = session?.user?.email ?? "";

  const uploadToImgBB = async (file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: fd,
      },
    );
    const data = await res.json();
    if (!res.ok || !data?.success) {
      throw new Error("Image upload failed");
    }
    return data.data.display_url as string;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tutorEmail) {
      toast.error("Please sign in as a tutor first.");
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);
    const values = Object.fromEntries(fd.entries());

    setSubmitting(true);

    let bannerImage = "";
    if (imageFile) {
      bannerImage = await uploadToImgBB(imageFile);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tuitions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: values.title,
        subject: values.subject,
        classLevel: values.classLevel,
        mode,
        location: mode === "Online" ? "Online" : values.location,
        monthlyFee: Number(values.monthlyFee),
        daysPerWeek: Number(values.daysPerWeek),
        bannerImage,
        description: values.description,
        tutorName,
        tutorEmail,
        approvalStatus: "pending",
        isActive: true,
      }),
    });

    const data = await res.json().catch(() => ({}));
    setSubmitting(false);

    if (!res.ok) {
      toast.error(data?.message || "Failed to post tuition");
      return;
    }

    toast.success("Tuition submitted for admin approval!");
    form.reset();
    setImageFile(null);
    router.push("/dashboard/tutor/my-tuitions");
    router.refresh();
  };

  return (
    <div className="max-w-3xl">
      <p className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange">
        TUTOR WORKSPACE
      </p>
      <h1 className="mt-1 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
        Post a Tuition
      </h1>
      <p className="mt-2 font-manrope text-xs text-muted-foreground">
        Free plan tutors can post up to 2 tuitions. New posts start as pending
        until approved by an admin.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-2xl bg-card p-6 sm:p-8"
      >
        <div>
          <label className="mb-1.5 block font-manrope text-[11px] font-bold tracking-[0.1em] uppercase">
            Tuition Title
          </label>
          <input
            name="title"
            type="text"
            required
            placeholder="e.g., HSC Higher Math & Physics Batch"
            className="w-full rounded-xl bg-surface-warm px-4 py-3 font-manrope text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block font-manrope text-[11px] font-bold tracking-[0.1em] uppercase">
              Subject
            </label>
            <input
              name="subject"
              type="text"
              required
              placeholder="e.g., Mathematics"
              className="w-full rounded-xl bg-surface-warm px-4 py-3 font-manrope text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-manrope text-[11px] font-bold tracking-[0.1em] uppercase">
              Class Level
            </label>
            <input
              name="classLevel"
              type="text"
              required
              placeholder="e.g., Class 11-12 / HSC"
              className="w-full rounded-xl bg-surface-warm px-4 py-3 font-manrope text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block font-manrope text-[11px] font-bold tracking-[0.1em] uppercase">
              Mode
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as "Online" | "Offline")}
              className="w-full rounded-xl bg-surface-warm px-4 py-3 font-manrope text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block font-manrope text-[11px] font-bold tracking-[0.1em] uppercase">
              Monthly Fee (BDT)
            </label>
            <input
              name="monthlyFee"
              type="number"
              min={0}
              required
              placeholder="5000"
              className="w-full rounded-xl bg-surface-warm px-4 py-3 font-manrope text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-manrope text-[11px] font-bold tracking-[0.1em] uppercase">
              Days / Week
            </label>
            <input
              name="daysPerWeek"
              type="number"
              min={1}
              max={7}
              required
              placeholder="3"
              className="w-full rounded-xl bg-surface-warm px-4 py-3 font-manrope text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
            />
          </div>
        </div>

        {mode === "Offline" && (
          <div>
            <label className="mb-1.5 block font-manrope text-[11px] font-bold tracking-[0.1em] uppercase">
              Location
            </label>
            <input
              name="location"
              type="text"
              required
              placeholder="e.g., Dhanmondi, Dhaka"
              className="w-full rounded-xl bg-surface-warm px-4 py-3 font-manrope text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
            />
          </div>
        )}

        <div>
          <label className="mb-1.5 block font-manrope text-[11px] font-bold tracking-[0.1em] uppercase">
            Banner Image (ImgBB)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="w-full rounded-xl bg-surface-warm px-4 py-2.5 font-manrope text-xs file:mr-4 file:rounded-lg file:border-0 file:bg-card file:px-3 file:py-1.5 file:font-bold"
          />
        </div>

        <div>
          <label className="mb-1.5 block font-manrope text-[11px] font-bold tracking-[0.1em] uppercase">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            required
            placeholder="Share syllabus coverage, teaching approach, and batch timing..."
            className="w-full rounded-xl bg-surface-warm px-4 py-3 font-manrope text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={submitting || isPending}
            className="cursor-pointer rounded-xl bg-brand-orange px-6 py-3 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519] disabled:opacity-60"
          >
            {submitting ? "PUBLISHING..." : "SUBMIT TUITION"}
          </button>
        </div>
      </form>
    </div>
  );
}
