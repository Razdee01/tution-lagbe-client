"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardIndexPage() {
  const router = useRouter();

  useEffect(() => {
    const redirectByRole = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/auth/get-session`,
          {
            cache: "no-store",
            credentials: "include",
          },
        );

        if (res.ok) {
          const data = await res.json();
          const role = String(
            data?.user?.role ?? data?.session?.user?.role ?? "student",
          ).toLowerCase();

          if (role === "admin") {
            router.replace("/dashboard/admin");
            return;
          }
          if (role === "tutor") {
            router.replace("/dashboard/tutor");
            return;
          }
        }
      } catch {
        // Fall through to student dashboard if session check fails
      }

      router.replace("/dashboard/student");
    };

    redirectByRole();
  }, [router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center font-manrope text-xs font-extrabold tracking-[0.16em] uppercase text-muted-foreground">
      LOADING DASHBOARD...
    </div>
  );
}
