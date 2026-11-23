import React from "react";

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

export default async function AdminTransactionsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/transactions`,
    { cache: "no-store" },
  );
  const data = res.ok ? await res.json() : [];
  const payments: PaymentItem[] = Array.isArray(data)
    ? data
    : (data?.payments ?? []);

  return (
    <div>
      <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
        Transactions
      </h1>

      {payments.length === 0 ? (
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
