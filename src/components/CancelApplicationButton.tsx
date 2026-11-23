"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CancelApplicationButton({
  applicationId,
}: {
  applicationId: string;
}) {
  const router = useRouter();
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    try {
      setCancelling(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/applications/${applicationId}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.message || "Failed to cancel application");
      }

      toast.success("Application cancelled.");
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not cancel application",
      );
    } finally {
      setCancelling(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCancel}
      disabled={cancelling}
      className="cursor-pointer rounded-xl bg-red-500/15 px-3.5 py-2 font-manrope text-[11px] font-extrabold tracking-[0.12em] uppercase text-red-700 transition-colors hover:bg-red-500/25 disabled:opacity-60 dark:text-red-400"
    >
      {cancelling ? "CANCELLING..." : "CANCEL"}
    </button>
  );
}
