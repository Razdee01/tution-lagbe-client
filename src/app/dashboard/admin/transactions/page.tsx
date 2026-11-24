"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { authHeaders, syncJwtToken } from "@/lib/jwt";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

interface PaymentItem {
  _id?: string;
  userName?: string;
  userEmail?: string;
  userRole?: string;
  planName?: string;
  amount?: number;
  transactionId?: string;
  paidAt?: string;
}

export default function AdminTransactionsPage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email ?? "";

  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!email) {
      setLoading(false);
      return;
    }

    const loadTransactions = async () => {
      try {
        setLoading(true);
        await syncJwtToken(email);

        const res = await fetch(`${API_URL}/admin/transactions`, {
          cache: "no-store",
          headers: authHeaders(),
        });

        if (res.ok) {
          const data = await res.json();
          setPayments(Array.isArray(data) ? data : (data?.payments ?? []));
        }
      } catch {
        toast.error("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [email, isPending]);

  return (
    <div>
      <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
        Transactions
      </h1>

      {isPending || loading ? (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-24 animate-pulse rounded-2xl bg-card" />
          ))}
        </div>
      ) : payments.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-card p-8 text-center">
          <p className="font-heading text-xl font-extrabold">
            No transactions yet
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {payments.map((pay, idx) => (
            <div
              key={pay._id || idx}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-card p-5"
            >
              <div>
                <p className="font-heading text-base font-extrabold">
                  {pay.userName || pay.userEmail || "Subscriber"}
                </p>
                <p className="font-manrope text-xs text-muted-foreground">
                  {pay.userEmail} · {(pay.userRole || "user").toUpperCase()} ·{" "}
                  {(pay.planName || "pro").toUpperCase()}
                </p>
                {pay.transactionId && (
                  <p className="mt-1 font-manrope text-[11px] text-muted-foreground">
                    Tx ID: {pay.transactionId}
                  </p>
                )}
              </div>

              <div className="text-right">
                <p className="font-heading text-xl font-extrabold text-brand-orange">
                  ${Number(pay.amount || 0).toLocaleString()}
                </p>
                <p className="font-manrope text-xs text-muted-foreground">
                  {pay.paidAt
                    ? new Date(pay.paidAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Completed"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
