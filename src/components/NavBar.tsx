"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "BROWSE TUITIONS", href: "/tuitions" },
  { label: "PRICING", href: "/pricing" },
  { label: "HOW IT WORKS", href: "/how-it-works" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Sync theme state on mount
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface-warm/95 backdrop-blur-sm transition-colors duration-200">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mentor Lagbe Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-1.5 font-heading text-2xl font-extrabold tracking-tight text-foreground select-none"
        >
          <span>Mentor</span>
          <span className="inline-block -rotate-6 bg-brand-orange px-2 py-0.5 text-[#141519] transition-transform duration-200 group-hover:rotate-0">
            Lagbe
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-8 md:flex lg:gap-10"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-manrope text-xs font-bold tracking-[0.14em] uppercase transition-colors ${
                  isActive
                    ? "text-brand-orange"
                    : "text-foreground/85 hover:text-brand-orange"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Theme Toggle + Auth Buttons */}
        <div className="hidden items-center gap-5 md:flex">
          {/* Light / Dark Mode Switch */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-9 w-9 items-center justify-center border border-border/30 bg-background text-foreground transition-colors hover:border-brand-orange hover:text-brand-orange"
          >
            {mounted ? (
              isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )
            ) : (
              <span className="h-4 w-4" />
            )}
          </button>

          <Link
            href="/sign-in"
            className="font-manrope text-xs font-bold tracking-[0.14em] uppercase text-foreground transition-colors hover:text-brand-orange"
          >
            SIGN IN
          </Link>

          <Link
            href="/sign-up"
            className="bg-foreground px-5 py-3 font-manrope text-xs font-bold tracking-[0.14em] uppercase text-background transition-colors hover:bg-brand-orange hover:text-[#141519]"
          >
            SIGN UP
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-9 w-9 items-center justify-center border border-border/30 bg-background text-foreground"
          >
            {mounted &&
              (isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              ))}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className="flex h-9 w-9 items-center justify-center border border-border bg-background text-foreground"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-surface-warm px-4 pt-4 pb-6 md:hidden">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-manrope text-xs font-bold tracking-[0.14em] uppercase ${
                    isActive
                      ? "text-brand-orange"
                      : "text-foreground hover:text-brand-orange"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 flex flex-col gap-3 border-t border-border/30 pt-4">
            <Link
              href="/sign-in"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full border border-border py-2.5 text-center font-manrope text-xs font-bold tracking-[0.14em] uppercase text-foreground"
            >
              SIGN IN
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-foreground py-2.5 text-center font-manrope text-xs font-bold tracking-[0.14em] uppercase text-background"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
