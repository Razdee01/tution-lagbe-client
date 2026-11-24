"use client";

import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import ApplyModal from "@/components/ApplyModal";
import type { Tuition } from "@/type/type";

export default function ApplyGate({ tuition }: { tuition: Tuition }) {
  const { data: session, isPending } = authClient.useSession();
  const role = String(
    (session?.user as { role?: string } | undefined)?.role ?? "",
  ).toLowerCase();

  if (isPending) {
    return (
      <button
        type="button"
        disabled
        className="cursor-not-allowed rounded-xl bg-muted px-6 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-muted-foreground"
      >
        Checking access...
      </button>
    );
  }

  if (!session) {
    return (
      <Link
        href="/sign-in"
        className="inline-flex items-center justify-center rounded-xl bg-brand-orange px-6 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519] transition-transform duration-150 hover:-translate-y-0.5"
      >
        Sign in to apply
      </Link>
    );
  }

  if (role !== "student") {
    return (
      <div
        role="status"
        className="flex items-center gap-2 rounded-xl border border-brand-orange/30 bg-card px-4 py-3 font-manrope text-xs font-semibold text-muted-foreground"
      >
        <LockKeyhole className="h-4 w-4 shrink-0 text-brand-orange" />
        Only student accounts can apply for tuition.
      </div>
    );
  }

  return <ApplyModal tuition={tuition} />;
}
