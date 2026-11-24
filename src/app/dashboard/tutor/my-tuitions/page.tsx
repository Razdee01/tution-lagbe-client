"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { authHeaders, syncJwtToken } from "@/lib/jwt";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

interface TuitionItem {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: string;
  monthlyFee: number;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
}

export default function MyTuitionsPage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email ?? "";

  const [tuitions, setTuitions] = useState<TuitionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<TuitionItem | null>(null);

  const loadTuitions = useCallback(async (tutorEmail: string) => {
    setLoading(true);
    await syncJwtToken(tutorEmail);
    const res = await fetch(
      `${API_URL}/tuitions/tutor/${encodeURIComponent(tutorEmail)}`,
      {
        cache: "no-store",
        headers: authHeaders(),
      },
    );
    const data = res.ok ? await res.json() : [];
    setTuitions(Array.isArray(data) ? data : (data?.tuitions ?? []));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isPending) return;
    if (!email) {
      setLoading(false);
      return;
    }
    loadTuitions(email);
  }, [email, isPending, loadTuitions]);

  const handleToggleActive = async (item: TuitionItem) => {
    const nextActive = !(item.isActive !== false);
    if (email) {
      await syncJwtToken(email);
    }

    const res = await fetch(`${API_URL}/tuitions/${item._id}`, {
      method: "PATCH",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ isActive: nextActive }),
    });
    if (!res.ok) {
      toast.error("Failed to update status");
      return;
    }
    toast.success(
      nextActive ? "Tuition marked Active" : "Tuition marked Closed",
    );
    if (email) loadTuitions(email);
  };

  const handleDelete = async (id: string) => {
    if (email) {
      await syncJwtToken(email);
    }

    const res = await fetch(`${API_URL}/tuitions/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!res.ok) {
      toast.error("Failed to delete tuition");
      return;
    }
    toast.success("Tuition deleted");
    setTuitions((prev) => prev.filter((t) => t._id !== id));
  };

  const handleSaveEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData(e.currentTarget);

    if (email) {
      await syncJwtToken(email);
    }

    const res = await fetch(`${API_URL}/tuitions/${editing._id}`, {
      method: "PATCH",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        title: fd.get("title"),
        subject: fd.get("subject"),
        classLevel: fd.get("classLevel"),
        monthlyFee: Number(fd.get("monthlyFee")),
      }),
    });

    if (!res.ok) {
      toast.error("Failed to update tuition");
      return;
    }
    toast.success("Tuition updated");
    setEditing(null);
    if (email) loadTuitions(email);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
          My Tuitions
        </h1>
        <Link
          href="/dashboard/tutor/post-tuition"
          className="rounded-xl bg-brand-orange px-5 py-3 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519]"
        >
          POST TUITION
        </Link>
      </div>

      {isPending || loading ? (
        <p className="mt-6 font-manrope text-sm text-muted-foreground">
          Loading tuitions...
        </p>
      ) : tuitions.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-card p-8 text-center">
          <p className="font-heading text-xl font-extrabold">
            No tuitions posted yet
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {tuitions.map((item) => {
            const active = item.isActive !== false;
            return (
              <div
                key={item._id}
                className="flex flex-col justify-between rounded-2xl bg-card p-6"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-surface-warm px-2.5 py-1 font-manrope text-[10px] font-extrabold uppercase text-brand-orange">
                      {item.approvalStatus}
                    </span>
                    <span className="rounded-md bg-surface-warm px-2.5 py-1 font-manrope text-[10px] font-extrabold uppercase">
                      {active ? "ACTIVE" : "CLOSED"}
                    </span>
                  </div>

                  <h2 className="mt-3 font-heading text-xl font-extrabold">
                    {item.title}
                  </h2>
                  <p className="mt-1 font-manrope text-xs text-muted-foreground">
                    {item.subject} · {item.classLevel} · {item.mode}
                  </p>
                  <p className="mt-3 font-heading text-lg font-extrabold">
                    ৳{Number(item.monthlyFee || 0).toLocaleString()}{" "}
                    <span className="font-manrope text-[10px] uppercase text-muted-foreground">
                      / MO
                    </span>
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-foreground/10 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditing(item)}
                    className="cursor-pointer rounded-xl bg-surface-warm px-3.5 py-2 font-manrope text-[11px] font-extrabold uppercase"
                  >
                    EDIT
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleActive(item)}
                    className="cursor-pointer rounded-xl bg-surface-warm px-3.5 py-2 font-manrope text-[11px] font-extrabold uppercase"
                  >
                    {active ? "CLOSE" : "ACTIVATE"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    className="cursor-pointer rounded-xl bg-red-500/15 px-3.5 py-2 font-manrope text-[11px] font-extrabold uppercase text-red-700 dark:text-red-400"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={handleSaveEdit}
            className="w-full max-w-md space-y-4 rounded-2xl bg-card p-6"
          >
            <h2 className="font-heading text-xl font-extrabold">
              Edit Tuition
            </h2>
            <input
              name="title"
              defaultValue={editing.title}
              required
              className="w-full rounded-xl bg-surface-warm px-4 py-2.5 text-sm"
            />
            <input
              name="subject"
              defaultValue={editing.subject}
              required
              className="w-full rounded-xl bg-surface-warm px-4 py-2.5 text-sm"
            />
            <input
              name="classLevel"
              defaultValue={editing.classLevel}
              required
              className="w-full rounded-xl bg-surface-warm px-4 py-2.5 text-sm"
            />
            <input
              name="monthlyFee"
              type="number"
              defaultValue={editing.monthlyFee}
              required
              className="w-full rounded-xl bg-surface-warm px-4 py-2.5 text-sm"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="cursor-pointer rounded-xl bg-surface-warm px-4 py-2 font-manrope text-xs font-extrabold uppercase"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-brand-orange px-5 py-2 font-manrope text-xs font-extrabold uppercase text-[#141519]"
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
