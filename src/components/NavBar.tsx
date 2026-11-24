"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  GraduationCap,
  LayoutDashboard,
  ShieldCheck,
  UserCheck,
  LogOut,
  Menu,
  Moon,
  Sun,
  UserCog,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { clearStoredToken } from "@/lib/jwt";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "BROWSE TUITIONS", href: "/browse-tuition" },
  { label: "PRICING", href: "/pricing" },
  { label: "HOW IT WORKS", href: "/how-it-works" },
];

// Role badge styled like the selected "Student" card on the sign-up page
function RoleBadge({ role }: { role: string }) {
  const Icon =
    role === "Tutor"
      ? UserCheck
      : role === "Admin"
        ? ShieldCheck
        : GraduationCap;

  return (
    <span className="mt-0.5 inline-flex items-center gap-1.5 bg-[#141519] px-2 py-1 font-manrope text-[10px] font-extrabold tracking-[0.12em] uppercase text-[#FAF8F5]">
      <Icon className="h-3 w-3 text-brand-orange" />
      {role}
      <span className="h-2 w-2 bg-brand-orange" />
    </span>
  );
}

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user as
    | { name: string; image?: string | null; role?: string | null }
    | undefined;
  const role = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
    : "Student";

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

  const handleSignOut = async () => {
    setMobileMenuOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          clearStoredToken();
          toast.success("Signed out successfully.");
          router.push("/sign-in");
        },
        onError: () => {
          toast.error("Could not sign out. Please try again.");
        },
      },
    });
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

          {user ? (
            <>
              {/* Profile trigger + hover dropdown */}
              <div className="group relative">
                <button
                  type="button"
                  aria-haspopup="menu"
                  className="flex items-center gap-3 py-2 text-left"
                >
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange font-manrope text-xs font-bold text-[#141519]">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <div className="flex flex-col items-start leading-tight">
                    <span className="max-w-[140px] truncate font-manrope text-xs font-bold text-foreground">
                      {user.name}
                    </span>
                    <RoleBadge role={role} />
                  </div>
                  <ChevronDown className="h-4 w-4 text-foreground/70 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>

                {/* Dropdown (pt-2 keeps hover alive across the gap) */}
                <div className="invisible absolute right-0 top-full z-50 w-60 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div
                    role="menu"
                    className="border border-border bg-surface-warm py-2 shadow-lg"
                  >
                    <Link
                      href="/dashboard"
                      role="menuitem"
                      className="flex items-center gap-3 px-4 py-3 font-manrope text-xs font-bold tracking-[0.14em] uppercase text-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      role="menuitem"
                      className="flex items-center gap-3 px-4 py-3 font-manrope text-xs font-bold tracking-[0.14em] uppercase text-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
                    >
                      <UserCog className="h-4 w-4" />
                      Update Profile
                    </Link>
                    <div className="my-1 border-t border-border/30" />
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left font-manrope text-xs font-bold tracking-[0.14em] uppercase text-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
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
            {user ? (
              <>
                <div className="flex items-center gap-3 pb-2">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange font-manrope text-xs font-bold text-[#141519]">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <div className="flex flex-col items-start leading-tight">
                    <span className="font-manrope text-sm font-bold text-foreground">
                      {user.name}
                    </span>
                    <RoleBadge role={role} />
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full border border-border py-2.5 text-center font-manrope text-xs font-bold tracking-[0.14em] uppercase text-foreground"
                >
                  DASHBOARD
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full border border-border py-2.5 text-center font-manrope text-xs font-bold tracking-[0.14em] uppercase text-foreground"
                >
                  UPDATE PROFILE
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full bg-foreground py-2.5 text-center font-manrope text-xs font-bold tracking-[0.14em] uppercase text-background"
                >
                  SIGN OUT
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
