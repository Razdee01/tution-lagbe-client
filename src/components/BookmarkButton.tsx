"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const FREE_BOOKMARK_LIMIT = 5;

export default function BookmarkButton({ tuitionId }: { tuitionId: string }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email ?? "";
  const userRole = String(
    (session?.user as { role?: string } | undefined)?.role ?? "",
  ).toLowerCase();

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [userPlan, setUserPlan] = useState<string>("free");
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    if (!userEmail) {
      setBookmarkedIds([]);
      setUserPlan("free");
      return;
    }

    fetch(`${API_URL}/users/profile/${encodeURIComponent(userEmail)}`, {
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        setUserPlan(String(data.plan || "free").toLowerCase());
        setBookmarkedIds(
          Array.isArray(data.bookmarkedTuitionIds)
            ? data.bookmarkedTuitionIds
            : [],
        );
      })
      .catch(() => {});
  }, [userEmail]);

  const isBookmarked = bookmarkedIds.includes(tuitionId);

  const handleToggle = async () => {
    if (!userEmail) {
      toast.error("Please sign in as a student to bookmark tuitions.");
      router.push("/sign-in");
      return;
    }

    if (userRole && userRole !== "student") {
      toast.error("Only student accounts can bookmark tuitions.");
      return;
    }

    if (
      !isBookmarked &&
      userPlan !== "pro" &&
      bookmarkedIds.length >= FREE_BOOKMARK_LIMIT
    ) {
      toast.error(
        `Free students can bookmark up to ${FREE_BOOKMARK_LIMIT} tuitions. Upgrade to Pro for unlimited bookmarks!`,
      );
      return;
    }

    try {
      setToggling(true);
      const res = await fetch(`${API_URL}/users/bookmarks/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, tuitionId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to update bookmark");
      }

      const updatedIds = Array.isArray(data.bookmarkedTuitionIds)
        ? data.bookmarkedTuitionIds
        : isBookmarked
          ? bookmarkedIds.filter((id) => id !== tuitionId)
          : [...bookmarkedIds, tuitionId];

      setBookmarkedIds(updatedIds);
      toast.success(
        isBookmarked ? "Removed from saved tuitions" : "Saved to bookmarks",
      );
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not update bookmark",
      );
    } finally {
      setToggling(false);
    }
  };

  return (
    <button
      type="button"
      disabled={toggling}
      onClick={handleToggle}
      aria-pressed={isBookmarked}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase transition-colors disabled:opacity-60 ${
        isBookmarked
          ? "bg-brand-orange text-[#141519]"
          : "bg-card text-foreground hover:text-brand-orange"
      }`}
    >
      <Bookmark
        className={`h-4 w-4 shrink-0 ${isBookmarked ? "fill-current" : ""}`}
      />
      <span>{isBookmarked ? "SAVED" : "BOOKMARK"}</span>
    </button>
  );
}
