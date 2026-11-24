import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

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

const FeaturedTuition = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/tuitions`;
  const res = await fetch(apiUrl, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch tuitions: ${res.status}`);
  }

  const data = await res.json();

  const rawList: TuitionItem[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.tuitions)
      ? data.tuitions
      : Array.isArray(data?.data)
        ? data.data
        : [];

  // Strictly limit to 6 items (3 columns x 2 rows)
  const featuredTuitions = rawList.slice(0, 6);

  return (
    <section
      aria-labelledby="featured-tuitions-heading"
      className="w-full bg-surface-warm py-16 text-foreground transition-colors duration-200 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
              FEATURED TUITIONS
            </p>
            <h2
              id="featured-tuitions-heading"
              className="mt-3 font-heading text-4xl leading-[1.03] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Good opportunities
              <br />
              don&apos;t wait.
            </h2>
          </div>

          <Link
            href="/browse-tuition"
            className="inline-flex items-center gap-1.5 font-manrope text-[11px] font-extrabold tracking-[0.16em] uppercase text-foreground transition-colors hover:text-brand-orange"
          >
            <span>BROWSE ALL</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Equal-Size 3 Columns x 2 Rows Rounded Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredTuitions.map((item, index) => {
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

                    <h3 className="mt-2 line-clamp-2 font-heading text-2xl leading-snug font-extrabold tracking-tight text-foreground">
                      {item.title}
                    </h3>

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
                    href={`/browse-tuition/${cardId}`}
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
      </div>
    </section>
  );
};

export default FeaturedTuition;
