"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  BookOpen,
  CreditCard,
  FileText,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  PlusCircle,
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { authHeaders, syncJwtToken } from "@/lib/jwt";

type Role = "student" | "tutor" | "admin";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navByRole: Record<Role, NavItem[]> = {
  student: [
    { label: "Overview", href: "/dashboard/student", icon: LayoutDashboard },
    {
      label: "My Applications",
      href: "/dashboard/student/my-applications",
      icon: FileText,
    },
    {
      label: "Saved Tuitions",
      href: "/dashboard/student/bookmarks",
      icon: Bookmark,
    },
    {
      label: "Update Profile",
      href: "/dashboard/profile",
      icon: UserCog,
    },
  ],
  tutor: [
    { label: "Overview", href: "/dashboard/tutor", icon: LayoutDashboard },
    {
      label: "Post Tuition",
      href: "/dashboard/tutor/post-tuition",
      icon: PlusCircle,
    },
    {
      label: "My Tuitions",
      href: "/dashboard/tutor/my-tuitions",
      icon: BookOpen,
    },
    {
      label: "Applicants",
      href: "/dashboard/tutor/applicants",
      icon: Users,
    },
    {
      label: "Update Profile",
      href: "/dashboard/profile",
      icon: UserCog,
    },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    {
      label: "Tuition Approvals",
      href: "/dashboard/admin/tuitions",
      icon: ShieldCheck,
    },
    {
      label: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: CreditCard,
    },
    {
      label: "Update Profile",
      href: "/dashboard/profile",
      icon: UserCog,
    },
  ],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { data: session, isPending } = authClient.useSession();

  const [dbProfile, setDbProfile] = useState<{
    name?: string;
    plan?: string;
  } | null>(null);

  useEffect(() => {
    const email = session?.user?.email;
    if (!email) return;

    let active = true;

    (async () => {
      await syncJwtToken(email);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile/${encodeURIComponent(email)}`,
        {
          cache: "no-store",
          headers: authHeaders(),
        },
      );
      if (!res.ok) return null;
      return res.json();
    })()
      .then((data) => {
        if (active && data) setDbProfile(data);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [session?.user?.email]);

  const role = session?.user?.role as Role | undefined;

  if (isPending) {
    return <div className="p-6">Loading...</div>;
  }

  if (!role || !(role in navByRole)) {
    return <div className="p-6">Unauthorized</div>;
  }

  const rawPlan =
    dbProfile?.plan ?? (session?.user as { plan?: string })?.plan ?? "Free";
  const formattedPlan = rawPlan.toLowerCase() === "pro" ? "Pro" : "Free";

  const profile = {
    name: dbProfile?.name || session?.user?.name || "User",
    email: session?.user?.email ?? "",
    plan: formattedPlan,
  };

  const links = navByRole[role];

  return (
    <div className="min-h-screen w-full bg-surface-warm text-foreground">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        {sidebarOpen && (
          <aside className="flex w-full shrink-0 flex-col justify-between bg-card p-5 lg:w-[20%] lg:min-w-[230px]">
            <div>
              <div className="flex items-center justify-between gap-2 pb-5">
                <div>
                  <p className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange">
                    {role} MENU
                  </p>
                  <p className="mt-0.5 font-heading text-lg font-extrabold tracking-tight text-foreground">
                    Workspace
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  title="Hide sidebar"
                  aria-label="Hide sidebar"
                  className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-surface-warm text-foreground transition-colors hover:text-brand-orange"
                >
                  <PanelLeftClose className="h-4 w-4 shrink-0" />
                </button>
              </div>

              <nav aria-label="Dashboard navigation" className="space-y-1.5">
                {links.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-manrope text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-brand-orange text-[#141519] font-bold"
                          : "text-foreground/80 hover:bg-surface-warm hover:text-foreground"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 shrink-0 ${
                          isActive ? "text-[#141519]" : "text-brand-orange"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <Link
              href="/dashboard/profile"
              className="mt-8 block rounded-2xl bg-surface-warm p-4 transition-colors hover:bg-surface-warm/80"
            >
              <p className="truncate font-heading text-sm font-extrabold text-foreground">
                {profile.name}
              </p>
              <p className="mt-0.5 truncate font-manrope text-xs text-muted-foreground">
                {profile.email}
              </p>
              <div className="mt-3 flex items-center justify-between gap-2 font-manrope text-[10px] font-extrabold tracking-[0.14em] uppercase">
                <span className="text-brand-orange">{role}</span>
                <span
                  className={`rounded-md px-2 py-1 ${
                    profile.plan === "Pro"
                      ? "bg-brand-orange text-[#141519]"
                      : "bg-card text-foreground"
                  }`}
                >
                  {profile.plan}
                </span>
              </div>
            </Link>
          </aside>
        )}

        <div
          className={`min-w-0 flex-1 ${sidebarOpen ? "lg:w-[80%]" : "w-full"}`}
        >
          <header className="flex flex-wrap items-center justify-between gap-4 px-4 pt-6 pb-4 sm:px-8">
            <div className="flex items-center gap-3">
              {!sidebarOpen && (
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  title="Open sidebar"
                  aria-label="Open sidebar"
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-card text-foreground transition-colors hover:text-brand-orange"
                >
                  <PanelLeftOpen className="h-4 w-4 shrink-0" />
                </button>
              )}

              <span className="font-manrope text-xs font-extrabold tracking-[0.16em] uppercase text-muted-foreground">
                {role} DASHBOARD
              </span>
            </div>

            <Link
              href="/browse-tuition"
              className="rounded-xl bg-card px-4 py-2.5 font-manrope text-xs font-extrabold tracking-[0.12em] uppercase text-foreground transition-colors hover:text-brand-orange"
            >
              BROWSE TUITIONS
            </Link>
          </header>

          <main className="min-w-0 px-4 pb-14 sm:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
