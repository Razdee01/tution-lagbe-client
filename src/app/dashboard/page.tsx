"use client";


import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardIndexPage() {
  const router = useRouter();

 
  

  const { data: session } = authClient.useSession();
  const role=session?.user?.role
  
      if (role === "admin") {
            router.replace("/dashboard/admin");
            return;
          }
      if (role === "student") {
            router.replace("/dashboard/student");
            return;
          }
          if (role === "tutor") {
            router.replace("/dashboard/tutor");
            return;
          }
  
  return (
    <div className="flex min-h-[50vh] items-center justify-center font-manrope text-xs font-extrabold tracking-[0.16em] uppercase text-muted-foreground">
      LOADING DASHBOARD...
    </div>
  );
}
