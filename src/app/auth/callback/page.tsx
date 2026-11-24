"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { syncJwtToken } from "@/lib/jwt";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await authClient.getSession();
      if (!data?.user?.email) {
        toast.error("Google sign in failed.");
        router.replace("/sign-in");
        return;
      }
      await syncJwtToken(data.user.email);
      toast.success("Signed in successfully!");
      router.replace("/");
    })();
  }, [router]);

  return <p className="p-10 text-center">Signing you in…</p>;
}
