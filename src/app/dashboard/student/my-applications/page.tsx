import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { ArrowLeft, Calendar, Clock, Mail, User, Wallet } from "lucide-react";
import { auth } from "@/lib/auth";
import CancelApplicationButton from "@/components/CancelApplicationButton";

interface ApplicationItem {
  _id?: string;
  id?: string;
  tuitionId?: string;
  tuitionTitle?: string;
  title?: string;
  tutorName?: string;
  tutorEmail?: string;
  monthlyFee?: number | string;
  appliedAt?: string;
  createdAt?: string;
  status?: string;
  preferredSchedule?: string;
  message?: string;
}

function getStatusBadgeClass(status?: string) {
  const normalized = (status ?? "pending").toLowerCase();
  if (normalized === "accepted") {
    return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400";
  }
  if (normalized === "rejected") {
    return "bg-red-500/15 text-red-700 dark:text-red-400";
  }
  return "bg-brand-orange/20 text-foreground";
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "Recently";
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const MyApplicationspage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const email = session?.user?.email;

  let applications: ApplicationItem[] = [];

  if (email) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/applications/${encodeURIComponent(email)}`,
      { cache: "no-store" },
    );

    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.applications)
          ? data.applications
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.result)
              ? data.result
              : [];
      applications = list;
    }
  }

  return (
    <section className="w-full text-foreground">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link
            href="/dashboard/student"
            className="inline-flex items-center gap-2 font-manrope text-[11px] font-extrabold tracking-[0.14em] uppercase text-muted-foreground transition-colors hover:text-brand-orange"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>BACK TO OVERVIEW</span>
          </Link>

          <p className="mt-3 font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
            STUDENT WORKSPACE
          </p>
          <h1 className="mt-1 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
            My Applications
          </h1>
        </div>

        <Link
          href="/browse-tuition"
          className="rounded-xl bg-brand-orange px-5 py-3 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519] transition-transform hover:-translate-y-0.5"
        >
          BROWSE MORE TUITIONS
        </Link>
      </div>

      {!email ? (
        <div className="mt-8 rounded-2xl bg-card p-8 text-center">
          <p className="font-heading text-xl font-extrabold">
            Sign in to view your applications
          </p>
          <p className="mt-2 font-manrope text-sm text-muted-foreground">
            We couldn&apos;t find an active student session for this request.
          </p>
        </div>
      ) : applications.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-card p-8 text-center">
          <p className="font-heading text-xl font-extrabold">
            No applications yet
          </p>
          <p className="mt-2 font-manrope text-sm text-muted-foreground">
            Explore available tuitions and send your first application.
          </p>
          <Link
            href="/browse-tuition"
            className="mt-5 inline-block rounded-xl bg-brand-orange px-5 py-3 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519]"
          >
            EXPLORE TUITIONS
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {applications.map((app, index) => {
            const appId = String(app._id ?? app.id ?? index);
            const rawStatus = (app.status ?? "pending").toLowerCase();
            const isPending = rawStatus === "pending";
            const statusLabel =
              rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1);
            const tuitionTitle =
              app.tuitionTitle || app.title || "Untitled Tuition";

            return (
              <div
                key={appId}
                className="flex flex-col justify-between rounded-2xl bg-card p-6"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`rounded-md px-3 py-1 font-manrope text-[10px] font-extrabold tracking-[0.14em] uppercase ${getStatusBadgeClass(rawStatus)}`}
                    >
                      {statusLabel}
                    </span>

                    <span className="flex items-center gap-1.5 font-manrope text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 text-brand-orange" />
                      <span>{formatDate(app.appliedAt ?? app.createdAt)}</span>
                    </span>
                  </div>

                  <h2 className="mt-4 font-heading text-xl font-extrabold leading-snug text-foreground">
                    {tuitionTitle}
                  </h2>

                  <div className="mt-4 space-y-2 rounded-xl bg-surface-warm p-4 font-manrope text-xs text-muted-foreground">
                    {app.tutorName && (
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <User className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
                        <span>{app.tutorName}</span>
                      </div>
                    )}
                    {app.tutorEmail && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
                        <span className="truncate">{app.tutorEmail}</span>
                      </div>
                    )}
                    {app.preferredSchedule && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
                        <span>{app.preferredSchedule}</span>
                      </div>
                    )}
                  </div>

                  {app.message && (
                    <p className="mt-3 line-clamp-2 font-manrope text-xs leading-relaxed text-muted-foreground">
                      &ldquo;{app.message}&rdquo;
                    </p>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-foreground/10 pt-4">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-brand-orange" />
                    <span className="font-heading text-lg font-extrabold text-foreground">
                      ৳{Number(app.monthlyFee || 0).toLocaleString()}
                    </span>
                    <span className="font-manrope text-[10px] font-extrabold tracking-[0.12em] uppercase text-muted-foreground">
                      / MO
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {app.tuitionId && (
                      <Link
                        href={`/browse-tuition/${app.tuitionId}`}
                        className="rounded-xl bg-surface-warm px-3.5 py-2 font-manrope text-[11px] font-extrabold tracking-[0.12em] uppercase text-foreground transition-colors hover:text-brand-orange"
                      >
                        VIEW POST
                      </Link>
                    )}

                    {isPending && app._id && (
                      <CancelApplicationButton applicationId={app._id} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MyApplicationspage;
