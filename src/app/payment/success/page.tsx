"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [verifying, setVerifying] = useState(true);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setVerifying(false);
      setErrorMsg("Missing Stripe session ID.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/verify-session`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          },
        );

        const data = await res.json();
        if (!res.ok || !data?.success) {
          throw new Error(data?.message || "Payment verification failed");
        }

        setTransactionId(data.transactionId);
        toast.success("Upgraded to Pro Plan!");
      } catch (err) {
        setErrorMsg(
          err instanceof Error ? err.message : "Could not verify payment",
        );
      } finally {
        setVerifying(false);
      }
    };

    verify();
  }, [sessionId]);

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-4 py-16">
      <div className="w-full rounded-2xl bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-orange" />

        {verifying ? (
          <>
            <h1 className="mt-4 font-heading text-2xl font-extrabold">
              Confirming your Pro upgrade...
            </h1>
            <p className="mt-2 font-manrope text-sm text-muted-foreground">
              Syncing your payment with MentorLagbe.
            </p>
          </>
        ) : errorMsg ? (
          <>
            <h1 className="mt-4 font-heading text-2xl font-extrabold">
              Verification Issue
            </h1>
            <p className="mt-2 font-manrope text-sm text-muted-foreground">
              {errorMsg}
            </p>
          </>
        ) : (
          <>
            <p className="mt-4 font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange">
              PAYMENT SUCCESSFUL
            </p>
            <h1 className="mt-1 font-heading text-3xl font-extrabold">
              Welcome to Pro!
            </h1>
            <p className="mt-2 font-manrope text-sm text-muted-foreground">
              Your account plan has been upgraded to{" "}
              <strong className="text-foreground">PRO</strong>.
            </p>
            {transactionId && (
              <p className="mt-3 rounded-xl bg-surface-warm px-4 py-2.5 font-manrope text-xs text-muted-foreground">
                Transaction ID:{" "}
                <span className="font-bold text-foreground">
                  {transactionId}
                </span>
              </p>
            )}
          </>
        )}

        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-xl bg-brand-orange px-6 py-3 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519]"
          >
            GO TO DASHBOARD
          </Link>
        </div>
      </div>
    </section>
  );
}
