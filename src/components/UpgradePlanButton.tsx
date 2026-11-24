"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function UpgradePlanButton({
  targetRole,
  price,
  label,
}: {
  targetRole: "student" | "tutor";
  price: number;
  label?: string;
}) {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    const email = session?.user?.email;
    if (!email) {
      toast.error("Please sign in first to upgrade your plan.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: email,
            userName: session?.user?.name ?? "",
            userRole: targetRole,
            planTier: targetRole === "tutor" ? "tutor_pro" : "student_pro",
          }),
        },
      );

      const data = await res.json();
      if (!res.ok || !data?.url) {
        throw new Error(data?.message || "Could not start Stripe checkout");
      }

      window.location.href = data.url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className="cursor-pointer rounded-xl bg-brand-orange px-5 py-3 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
    >
      {loading ? "REDIRECTING..." : label || `SUBSCRIBE ($${price})`}
    </button>
  );
}
