"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Tuition } from "@/type/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const PAGE_SIZE = 9;

// Waits `delay` ms after the value stops changing before updating
function useDebounce<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

const BrowseTuition = () => {
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Read initial filters from the URL (set by the home page search bar)
  const searchParams = useSearchParams();

  // Filter state
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") ?? "",
  );
  const [selectedMode, setSelectedMode] = useState(
    searchParams.get("mode") ?? "ALL",
  );
  const [selectedSubject, setSelectedSubject] = useState(
    searchParams.get("subject") ?? "ALL",
  );
  const [selectedClass, setSelectedClass] = useState(
    searchParams.get("class") ?? "ALL",
  );
  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.get("location") ?? "ALL",
  );

  // Dropdown options (loaded separately so they don't shrink when filtering)
  const [subjects, setSubjects] = useState<string[]>([]);

  // Pagination state
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 400);

  // 1. Load subject options once
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const res = await fetch(`${API_URL}/tuitions/subjects`);
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) setSubjects(data);
      } catch {
        // dropdown just stays with "ALL SUBJECTS"
      }
    };
    loadSubjects();
  }, []);

  // 2. Fetch tuitions whenever a filter or the page changes
  useEffect(() => {
    const controller = new AbortController();

    const fetchTuitions = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_SIZE),
        });
        if (debouncedSearch.trim())
          params.set("search", debouncedSearch.trim());
        if (selectedMode !== "ALL") params.set("mode", selectedMode);
        if (selectedSubject !== "ALL") params.set("subject", selectedSubject);
        if (selectedClass !== "ALL") params.set("class", selectedClass);
        if (selectedLocation !== "ALL")
          params.set("location", selectedLocation);

        const res = await fetch(`${API_URL}/tuitions?${params.toString()}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch tuitions: ${res.status}`);
        }

        const json = await res.json();
        setTuitions(Array.isArray(json.data) ? json.data : []);
        setTotal(json.total ?? 0);
        setTotalPages(json.totalPages ?? 1);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(
          err instanceof Error ? err.message : "Failed to load tuitions",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchTuitions();

    return () => controller.abort();
  }, [
    debouncedSearch,
    selectedMode,
    selectedSubject,
    selectedClass,
    selectedLocation,
    page,
  ]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleModeChange = (value: string) => {
    setSelectedMode(value);
    setPage(1);
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    setPage(1);
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    setPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedMode !== "ALL" ||
    selectedSubject !== "ALL" ||
    selectedClass !== "ALL" ||
    selectedLocation !== "ALL";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedMode("ALL");
    setSelectedSubject("ALL");
    setSelectedClass("ALL");
    setSelectedLocation("ALL");
    setPage(1);
  };

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
            {loading ? "LOADING LISTINGS..." : `${total} ACTIVE LISTINGS`}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-10 grid grid-cols-1 gap-4 rounded-2xl bg-card p-4 sm:p-6 md:grid-cols-12 md:items-center">
          {/* Search Input */}
          <div className="relative md:col-span-6">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by title, subject, location, or tutor..."
              aria-label="Search tuitions"
              className="w-full rounded-xl bg-surface-warm py-3 pr-4 pl-11 font-manrope text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-orange focus:outline-none"
            />
          </div>

          {(selectedClass !== "ALL" || selectedLocation !== "ALL") && (
            <div className="mt-4 flex flex-wrap gap-2 md:col-span-12">
              {selectedClass !== "ALL" && (
                <button
                  type="button"
                  onClick={() => handleClassChange("ALL")}
                  className="rounded-md bg-card px-3 py-1.5 font-manrope text-[10px] font-extrabold tracking-[0.14em] uppercase text-foreground transition-colors hover:text-brand-orange"
                >
                  CLASS: {selectedClass} ✕
                </button>
              )}
              {selectedLocation !== "ALL" && (
                <button
                  type="button"
                  onClick={() => handleLocationChange("ALL")}
                  className="rounded-md bg-card px-3 py-1.5 font-manrope text-[10px] font-extrabold tracking-[0.14em] uppercase text-foreground transition-colors hover:text-brand-orange"
                >
                  LOCATION: {selectedLocation} ✕
                </button>
              )}
            </div>
          )}

          {/* Mode Filter */}
          <div className="md:col-span-3">
            <label htmlFor="mode-filter" className="sr-only">
              Filter by mode
            </label>
            <select
              id="mode-filter"
              value={selectedMode}
              onChange={(e) => handleModeChange(e.target.value)}
              className="w-full cursor-pointer rounded-xl bg-surface-warm px-4 py-3 font-manrope text-xs font-extrabold tracking-[0.12em] uppercase text-foreground focus:ring-2 focus:ring-brand-orange focus:outline-none"
            >
              <option value="ALL">ALL MODES</option>
              <option value="ONLINE">ONLINE</option>
              <option value="OFFLINE">OFFLINE</option>
              <option value="HYBRID">HYBRID</option>
            </select>
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
                onChange={(e) => handleSubjectChange(e.target.value)}
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
        ) : tuitions.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-card p-10 text-center">
            <p className="font-heading text-2xl font-extrabold text-foreground">
              No active tuitions found
            </p>
            <p className="mt-2 font-manrope text-sm text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-brand-orange px-5 py-3 font-manrope text-[11px] font-extrabold tracking-[0.15em] uppercase text-[#141519] transition-opacity hover:opacity-90"
              >
                CLEAR FILTERS
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tuitions.map((item) => {
                const modeLabel = item.mode.toUpperCase();
                const isOnline = modeLabel.includes("ONLINE");
                const metaLine = [
                  item.subject.toUpperCase(),
                  item.classLevel.toUpperCase(),
                ]
                  .filter(Boolean)
                  .join(" / ");

                return (
                  <article
                    key={item._id}
                    className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-card transition-transform duration-200 hover:-translate-y-1"
                  >
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

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-manrope text-xs font-medium text-muted-foreground">
                          <span className="flex items-center gap-1.5 truncate">
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
                            <span className="truncate">{item.location}</span>
                          </span>

                          <span className="flex items-center gap-1.5 shrink-0">
                            <CalendarDays className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
                            <span>{item.daysPerWeek} days/week</span>
                          </span>
                        </div>

                        <div className="mt-5 flex items-baseline gap-1.5 border-t border-foreground/10 pt-4">
                          <span className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
                            ৳{item.monthlyFee.toLocaleString()}
                          </span>
                          <span className="font-manrope text-[10px] font-extrabold tracking-[0.15em] uppercase text-muted-foreground">
                            / MONTH
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-foreground/10 px-6 py-4">
                      <span className="truncate font-manrope text-xs font-medium text-muted-foreground">
                        with{" "}
                        <strong className="font-bold text-foreground">
                          {item.tutorName}
                        </strong>
                      </span>

                      <Link
                        href={`/browse-tuition/${item._id}`}
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

            {totalPages > 1 && (
              <nav
                aria-label="Pagination"
                className="mt-12 flex items-center justify-center gap-4"
              >
                <button
                  type="button"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                  className="inline-flex items-center gap-1 rounded-xl bg-card px-4 py-3 font-manrope text-[11px] font-extrabold tracking-[0.15em] uppercase text-foreground transition-colors hover:text-brand-orange disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" />
                  PREV
                </button>

                <span className="font-manrope text-xs font-extrabold tracking-[0.16em] uppercase text-muted-foreground">
                  PAGE {page} OF {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages}
                  className="inline-flex items-center gap-1 rounded-xl bg-card px-4 py-3 font-manrope text-[11px] font-extrabold tracking-[0.15em] uppercase text-foreground transition-colors hover:text-brand-orange disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-foreground"
                >
                  NEXT
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BrowseTuition;
