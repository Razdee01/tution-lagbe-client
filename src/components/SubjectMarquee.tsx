import React from "react";

const defaultSubjects = [
  "Biology",
  "Mathematics",
  "Physics",
  "IELTS",
  "Admission Prep",
  "ICT & Programming",
  "Chemistry",
  "English",
];

interface SubjectMarqueeProps {
  subjects?: string[];
}

function SparkStar() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 shrink-0 fill-current"
      aria-hidden="true"
    >
      <path d="M12 0L14.3 8.1L21.5 3.5L16.9 10.7L24 12L16.9 13.3L21.5 20.5L14.3 15.9L12 24L9.7 15.9L2.5 20.5L7.1 13.3L0 12L7.1 10.7L2.5 3.5L9.7 8.1L12 0Z" />
    </svg>
  );
}

export default function SubjectMarquee({
  subjects = defaultSubjects,
}: SubjectMarqueeProps) {
  const repeatedSubjects = [...subjects, ...subjects];

  return (
    <div
      aria-label="Featured subjects"
      className="w-full overflow-hidden border-y border-[#141519] bg-brand-orange py-3.5 text-[#141519] select-none"
    >
      <div className="animate-marquee-row items-center">
        {repeatedSubjects.map((subject, idx) => (
          <div
            key={`${subject}-${idx}`}
            className="flex shrink-0 flex-row items-center gap-7 px-4 sm:gap-9 sm:px-5"
          >
            <span className="font-heading text-sm font-extrabold tracking-tight whitespace-nowrap sm:text-base">
              {subject}
            </span>
            <SparkStar />
          </div>
        ))}
      </div>
    </div>
  );
}
