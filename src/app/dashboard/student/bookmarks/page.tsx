"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Bookmark,
  CalendarDays,
  MapPin,
  Sparkles,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Tuition } from "@/type/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const FREE_BOOKMARK_LIMIT = 5;

export default function StudentBookmarksPage() {
  const { data: session, isPending } = authClient.useSession();
  const userEmail = session?.user?.email ?? "";

  const [bookmarks, setBookmarks] = useState<Tuition[]>([]);
  const [userPlan, setUserPlan] = useState<string>("free");
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) return;
    if (!userEmail) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        const [bookmarksRes, profileRes] = await Promise.all([
          fetch(`${API_URL}/users/bookmarks/${encodeURIComponent(userEmail)}`, {
            cache: "no-store",
          }),
          fetch(`${API_URL}/users/profile/${encodeURIComponent(userEmail)}`, {
            cache: "no-store",
          }),
        ]);

        if (bookmarksRes.ok) {
          const data = await bookmarksRes.json();
          setBookmarks(Array.isArray(data) ? data : []);
        }

        if (profileRes.ok) {
          const profile = await profileRes.json();
          setUserPlan(String(profile?.plan || "free").toLowerCase());
        }
      } catch {
        toast.error("Failed to load saved tuitions");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userEmail, isPending]);

  const handleRemoveBookmark = async (tuitionId: string) => {
    if (!userEmail) return;

    try {
      setRemovingId(tuitionId);
      const res = await fetch(`${API_URL}/users/bookmarks/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, tuitionId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Could not remove bookmark");
      }

      setBookmarks((prev) => prev.filter((item) => item._id !== tuitionId));
      toast.success("Removed from saved tuitions");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to remove bookmark",
      );
    } finally {
      setRemovingId(null);
    }
  };

  const isPro = userPlan === "pro";
  const atFreeLimit = !isPro && bookmarks.length >= FREE_BOOKMARK_LIMIT;

  return (
    <div>
      {/* Header & Free vs Pro Quota Banner */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange">
            STUDENT WORKSPACE
          </p>
          <h1 className="mt-1 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
            Saved Tuitions
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 font-manrope text-[11px] font-extrabold tracking-[0.14em] uppercase ${
              isPro
                ? "bg-brand-orange text-[#141519]"
                : "bg-card text-foreground"
            }`}
          >
            {isPro ? (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                <span>PRO · UNLIMITED BOOKMARKS ({bookmarks.length})</span>
              </>
            ) : (
              <>
                <Bookmark className="h-3.5 w-3.5 text-brand-orange" />
                <span>
                  FREE QUOTA: {bookmarks.length} / {FREE_BOOKMARK_LIMIT} SAVED
                </span>
              </>
            )}
          </span>

          {!isPro && (
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#141519] px-4 py-2.5 font-manrope text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#FAF8F5] transition-opacity hover:opacity-90"
            >
              <span>UPGRADE TO PRO</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-brand-orange" />
            </Link>
          )}
        </div>
      </div>

      {/* Free Limit Notice */}
      {atFreeLimit && (
        <div className="mt-6 flex flex-col justify-between gap-3 rounded-2xl bg-card p-5 sm:flex-row sm:items-center">
          <p className="font-manrope text-xs leading-relaxed text-muted-foreground">
            You&apos;ve reached the{" "}
            <strong className="text-foreground">5-bookmark limit</strong> on the
            Free plan. Remove a saved tuition or upgrade to{" "}
            <strong className="text-foreground">Student Pro</strong> for
            unlimited bookmarks.
          </p>
          <Link
            href="/pricing"
            className="shrink-0 rounded-xl bg-brand-orange px-4 py-2.5 font-manrope text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#141519]"
          >
            UNLOCK UNLIMITED
          </Link>
        </div>
      )}

      {/* Content States */}
      {loading ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-80 animate-pulse rounded-2xl bg-card" />
          ))}
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-card p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-warm text-brand-orange">
            <Bookmark className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-heading text-2xl font-extrabold text-foreground">
            No saved tuitions yet
          </h2>
          <p className="mx-auto mt-2 max-w-md font-manrope text-sm text-muted-foreground">
            Bookmark tuitions while browsing so you can compare fees, schedules,
            and apply when ready.
          </p>
          <Link
            href="/browse-tuition"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-5 py-3 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519]"
          >
            <span>BROWSE TUITIONS</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((item) => {
            const isRemoving = removingId === item._id;

            return (
              <article
                key={item._id}
                className="flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-card"
              >
                <div>
                  <div className="relative h-44 w-full bg-muted">
                    {item.bannerImage && (
                      <Image
                        src={item.bannerImage}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    )}
                    <span className="absolute top-3 left-3 rounded-md bg-[#141519] px-2.5 py-1 font-manrope text-[10px] font-extrabold tracking-[0.14em] uppercase text-[#FAF8F5]">
                      {item.mode}
                    </span>

                    <button
                      type="button"
                      disabled={isRemoving}
                      onClick={() => handleRemoveBookmark(item._id)}
                      title="Remove from saved"
                      aria-label="Remove from saved"
                      className="absolute top-3 right-3 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-red-500/90 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-6">
                    <p className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange">
                      {item.subject} / {item.classLevel}
                    </p>

                    <h2 className="mt-2 line-clamp-2 font-heading text-xl leading-snug font-extrabold text-foreground">
                      {item.title}
                    </h2>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-manrope text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5 truncate">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
                        <span className="truncate">{item.location}</span>
                      </span>
                      <span className="flex items-center gap-1.5 shrink-0">
                        <CalendarDays className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
                        <span>{item.daysPerWeek} days/week</span>
                      </span>
                    </div>

                    <div className="mt-4 flex items-baseline gap-1.5 border-t border-foreground/10 pt-4">
                      <span className="font-heading text-2xl font-extrabold text-foreground">
                        ৳{Number(item.monthlyFee || 0).toLocaleString()}
                      </span>
                      <span className="font-manrope text-[10px] font-extrabold tracking-[0.15em] uppercase text-muted-foreground">
                        / MONTH
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-foreground/10 px-6 py-4">
                  <button
                    type="button"
                    disabled={isRemoving}
                    onClick={() => handleRemoveBookmark(item._id)}
                    className="cursor-pointer font-manrope text-[11px] font-extrabold tracking-[0.14em] uppercase text-red-600 transition-opacity hover:opacity-80 disabled:opacity-50 dark:text-red-400"
                  >
                    {isRemoving ? "REMOVING..." : "REMOVE"}
                  </button>

                  <Link
                    href={`/browse-tuition/${item._id}`}
                    className="inline-flex items-center gap-1 rounded-xl bg-brand-orange px-4 py-2 font-manrope text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#141519]"
                  >
                    <span>VIEW & APPLY</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
