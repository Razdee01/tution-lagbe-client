import React from "react";

export default function GlobalLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-[70vh] w-full bg-surface-warm py-16 text-foreground sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header Skeleton */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-3">
            <div className="h-3 w-32 animate-pulse rounded-md bg-brand-orange/30" />
            <div className="h-10 w-64 animate-pulse rounded-xl bg-card sm:h-12 sm:w-96" />
          </div>
          <div className="h-4 w-36 animate-pulse rounded-md bg-card" />
        </div>

        {/* Filter / Stats Bar Skeleton */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="h-28 animate-pulse rounded-2xl bg-card p-6"
            >
              <div className="h-3 w-24 rounded-md bg-surface-warm" />
              <div className="mt-4 h-7 w-16 rounded-lg bg-surface-warm" />
            </div>
          ))}
        </div>

        {/* Cards Grid Skeleton */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl bg-card">
              <div className="h-44 w-full animate-pulse bg-muted" />
              <div className="space-y-3 p-6">
                <div className="h-3 w-28 animate-pulse rounded-md bg-brand-orange/25" />
                <div className="h-6 w-4/5 animate-pulse rounded-lg bg-surface-warm" />
                <div className="h-4 w-3/5 animate-pulse rounded-md bg-surface-warm" />
                <div className="mt-4 border-t border-foreground/10 pt-4">
                  <div className="h-6 w-24 animate-pulse rounded-lg bg-surface-warm" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <span className="sr-only">Loading MentorLagbe content...</span>
      </div>
    </div>
  );
}
