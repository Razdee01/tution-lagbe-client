"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "ICT & Programming",
  "IELTS",
  "Admission Prep",
];

const CLASSES = [
  "Class 6 - 8",
  "Class 9 - 10 (SSC)",
  "Class 11 - 12 (HSC)",
  "O / A Levels",
  "University Admission",
  "Skill & Language",
];

const MODES = ["Online", "Offline (Home Tuition)", "Hybrid"];

const LOCATIONS = [
  "Dhaka - Dhanmondi",
  "Dhaka - Uttara",
  "Dhaka - Mirpur",
  "Dhaka - Gulshan & Banani",
  "Dhaka - Mohammadpur",
  "Chattogram",
  "Sylhet",
  "Remote / Online",
];

export default function TuitionSearchBar() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [mode, setMode] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (subject) params.set("subject", subject);
    if (studentClass) params.set("class", studentClass);
    if (mode) params.set("mode", mode);
    if (location) params.set("location", location);

    const queryString = params.toString();
    router.push(queryString ? `/tuitions?${queryString}` : "/tuitions");
  };

  return (
    <section className="w-full bg-[#141519] py-12 text-[#FAF8F5] dark:bg-[#0D0E11] sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header Row */}
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-[#FAF8F5] sm:text-3xl">
            Who are you looking for?
          </h2>
          <span className="font-manrope text-xs font-extrabold tracking-[0.16em] uppercase text-brand-orange">
            850+ OPEN TUITIONS
          </span>
        </div>

        {/* Segmented Filter Bar */}
        <form
          onSubmit={handleSearch}
          className="mt-6 grid grid-cols-1 border border-white/15 bg-[#191B20] sm:grid-cols-2 lg:grid-cols-12"
        >
          {/* 1. SUBJECT */}
          <div className="relative border-b border-white/15 px-5 py-4 sm:border-r lg:col-span-3 lg:border-b-0">
            <label
              htmlFor="filter-subject"
              className="block font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange"
            >
              SUBJECT
            </label>
            <div className="relative mt-1.5 flex items-center">
              <select
                id="filter-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full appearance-none bg-transparent pr-6 font-manrope text-sm font-semibold text-[#FAF8F5] focus:outline-none"
              >
                <option value="" className="bg-[#141519] text-[#FAF8F5]">
                  Any subject
                </option>
                {SUBJECTS.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="bg-[#141519] text-[#FAF8F5]"
                  >
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-[#FAF8F5]/70" />
            </div>
          </div>

          {/* 2. CLASS */}
          <div className="relative border-b border-white/15 px-5 py-4 lg:col-span-2 lg:border-r lg:border-b-0">
            <label
              htmlFor="filter-class"
              className="block font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange"
            >
              CLASS
            </label>
            <div className="relative mt-1.5 flex items-center">
              <select
                id="filter-class"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="w-full appearance-none bg-transparent pr-6 font-manrope text-sm font-semibold text-[#FAF8F5] focus:outline-none"
              >
                <option value="" className="bg-[#141519] text-[#FAF8F5]">
                  Any class
                </option>
                {CLASSES.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="bg-[#141519] text-[#FAF8F5]"
                  >
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-[#FAF8F5]/70" />
            </div>
          </div>

          {/* 3. MODE */}
          <div className="relative border-b border-white/15 px-5 py-4 sm:border-r lg:col-span-3 lg:border-b-0">
            <label
              htmlFor="filter-mode"
              className="block font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange"
            >
              MODE
            </label>
            <div className="relative mt-1.5 flex items-center">
              <select
                id="filter-mode"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full appearance-none bg-transparent pr-6 font-manrope text-sm font-semibold text-[#FAF8F5] focus:outline-none"
              >
                <option value="" className="bg-[#141519] text-[#FAF8F5]">
                  Online or offline
                </option>
                {MODES.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="bg-[#141519] text-[#FAF8F5]"
                  >
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-[#FAF8F5]/70" />
            </div>
          </div>

          {/* 4. LOCATION */}
          <div className="relative border-b border-white/15 px-5 py-4 sm:border-b-0 lg:col-span-2">
            <label
              htmlFor="filter-location"
              className="block font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange"
            >
              LOCATION
            </label>
            <div className="relative mt-1.5 flex items-center">
              <select
                id="filter-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full appearance-none bg-transparent pr-6 font-manrope text-sm font-semibold text-[#FAF8F5] focus:outline-none"
              >
                <option value="" className="bg-[#141519] text-[#FAF8F5]">
                  Anywhere
                </option>
                {LOCATIONS.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="bg-[#141519] text-[#FAF8F5]"
                  >
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-[#FAF8F5]/70" />
            </div>
          </div>

          {/* 5. SUBMIT BUTTON */}
          <button
            type="submit"
            className="flex min-h-[64px] cursor-pointer items-center justify-center gap-2 bg-brand-orange px-6 py-4 font-manrope text-xs font-extrabold tracking-[0.16em] uppercase text-[#141519] transition-colors hover:bg-[#ff7242] sm:col-span-2 lg:col-span-2"
          >
            <span>SEARCH</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
