"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";

interface TuitionItem {
  _id?: string;
  id?: string | number;
  title: string;
  subject?: string;
  level?: string;
  class?: string;
  mode?: string;
  location?: string;
  salary?: number | string;
  tutorName?: string;
  bannerImage?: string;
}

const BrowseTuition = () => {
  const [tuitions, setTuitions] = useState<TuitionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter / search UI state placeholders for your implementation
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMode, setSelectedMode] = useState("ALL");
  const [selectedSubject, setSelectedSubject] = useState("ALL");

  useEffect(() => {
    const fetchAllTuitions = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/tuitions`;
        const res = await fetch(apiUrl, { cache: "no-store" });

        if (!res.ok) {
          throw new Error(`Failed to fetch tuitions: ${res.status}`);
        }

        const data = await res.json();
        const list: TuitionItem[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.tuitions)
            ? data.tuitions
            : Array.isArray(data?.data)
              ? data.data
              : [];

        setTuitions(list);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load tuitions",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllTuitions();
  }, []);

  // Derive unique subjects dynamically from API data for your filter dropdown
  const subjects = Array.from(
    new Set(
      tuitions
        .map((item) => item.subject?.trim())
        .filter((subj): subj is string => Boolean(subj)),
    ),
  );

  // Plug your custom search & filter logic here when ready
  const displayedTuitions = tuitions;

  return (
    <section
      aria-labelledby="browse-tuitions-heading"
      className="w-full bg-surface-warm py-16 text-foreground transition-colors duration-200 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Editorial Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
              ACTIVE TUITIONS
            </p>
            <h1
              id="browse-tuitions-heading"
              className="mt-3 font-heading text-4xl leading-[1.03] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Find your next
              <br />
              right match.
            </h1>
          </div>

          <p className="font-manrope text-xs font-extrabold tracking-[0.16em] uppercase text-muted-foreground">
            {loading
              ? "LOADING LISTINGS..."
              : `${displayedTuitions.length} ACTIVE LISTINGS`}
          </p>
        </div>

        {/* Search & Filter Bar (UI Ready for Your Logic) */}
        <div className="mt-10 grid grid-cols-1 gap-4 rounded-2xl bg-card p-4 sm:p-6 md:grid-cols-12 md:items-center">
          {/* Search Input */}
          <div className="relative md:col-span-6">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, subject, location, or tutor..."
              aria-label="Search tuitions"
              className="w-full rounded-xl bg-surface-warm py-3 pr-4 pl-11 font-manrope text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-orange focus:outline-none"
            />
          </div>

          {/* Mode Filter */}
          <div className="md:col-span-3">
            <label htmlFor="mode-filter" className="sr-only">
              Filter by mode
            </label>
            <div className="relative">
              <select
                id="mode-filter"
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full cursor-pointer rounded-xl bg-surface-warm px-4 py-3 font-manrope text-xs font-extrabold tracking-[0.12em] uppercase text-foreground focus:ring-2 focus:ring-brand-orange focus:outline-none"
              >
                <option value="ALL">ALL MODES</option>
                <option value="ONLINE">ONLINE</option>
                <option value="OFFLINE">OFFLINE</option>
                <option value="HYBRID">HYBRID</option>
              </select>
            </div>
          </div>

          {/* Subject Filter */}
          <div className="md:col-span-3">
            <label htmlFor="subject-filter" className="sr-only">
              Filter by subject
            </label>
            <div className="relative flex items-center">
              <SlidersHorizontal className="pointer-events-none absolute left-4 h-3.5 w-3.5 text-brand-orange" />
              <select
                id="subject-filter"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full cursor-pointer rounded-xl bg-surface-warm py-3 pr-4 pl-10 font-manrope text-xs font-extrabold tracking-[0.12em] uppercase text-foreground focus:ring-2 focus:ring-brand-orange focus:outline-none"
              >
                <option value="ALL">ALL SUBJECTS</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading / Error / Listings */}
        {loading ? (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-96 animate-pulse rounded-2xl bg-card"
              />
            ))}
          </div>
        ) : error ? (
          <div className="mt-10 rounded-2xl bg-card p-8 text-center">
            <p className="font-heading text-xl font-extrabold text-foreground">
              Could not load tuitions
            </p>
            <p className="mt-2 font-manrope text-sm text-muted-foreground">
              {error}
            </p>
          </div>
        ) : displayedTuitions.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-card p-10 text-center">
            <p className="font-heading text-2xl font-extrabold text-foreground">
              No active tuitions found
            </p>
            <p className="mt-2 font-manrope text-sm text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayedTuitions.map((item, index) => {
              const cardId = String(item._id ?? item.id ?? index);
              const modeLabel = String(item.mode ?? "ONLINE").toUpperCase();
              const isOnline = modeLabel.includes("ONLINE");
              const metaLine = [
                item.subject?.toUpperCase(),
                (item.level || item.class)?.toUpperCase(),
              ]
                .filter(Boolean)
                .join(" / ");

              return (
                <article
                  key={cardId}
                  className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-card transition-transform duration-200 hover:-translate-y-1"
                >
                  {/* Top Media + Details */}
                  <div>
                    <div className="relative h-48 w-full overflow-hidden rounded-t-2xl bg-muted">
                      {item.bannerImage && (
                        <Image
                          src={item.bannerImage}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                      <span
                        className={`absolute top-3 left-3 z-10 rounded-md px-2.5 py-1 font-manrope text-[10px] font-extrabold tracking-[0.14em] uppercase ${
                          isOnline
                            ? "bg-brand-orange text-[#141519]"
                            : "bg-[#141519] text-[#FAF8F5]"
                        }`}
                      >
                        {modeLabel}
                      </span>
                    </div>

                    <div className="p-6">
                      {metaLine && (
                        <p className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange">
                          {metaLine}
                        </p>
                      )}

                      <h2 className="mt-2 line-clamp-2 font-heading text-2xl leading-snug font-extrabold tracking-tight text-foreground">
                        {item.title}
                      </h2>

                      {item.location && (
                        <p className="mt-3 flex items-center gap-1.5 font-manrope text-xs font-medium text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
                          <span className="truncate">{item.location}</span>
                        </p>
                      )}

                      {item.salary !== undefined && (
                        <div className="mt-5 flex items-baseline gap-1.5 border-t border-foreground/10 pt-4">
                          <span className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
                            ৳{item.salary}
                          </span>
                          <span className="font-manrope text-[10px] font-extrabold tracking-[0.15em] uppercase text-muted-foreground">
                            / MONTH
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between border-t border-foreground/10 px-6 py-4">
                    <span className="truncate font-manrope text-xs font-medium text-muted-foreground">
                      {item.tutorName ? (
                        <>
                          with{" "}
                          <strong className="font-bold text-foreground">
                            {item.tutorName}
                          </strong>
                        </>
                      ) : (
                        "Verified Listing"
                      )}
                    </span>

                    <Link
                      href={`/tuitions/${cardId}`}
                      className="inline-flex shrink-0 items-center gap-1 font-manrope text-[10px] font-extrabold tracking-[0.15em] uppercase text-foreground transition-colors group-hover:text-brand-orange"
                    >
                      <span>VIEW DETAILS</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowseTuition;
