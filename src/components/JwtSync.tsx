"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { clearStoredToken, getStoredToken, syncJwtToken } from "@/lib/jwt";

export default function JwtSync() {
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    const email = session?.user?.email;
    if (!email) {
      clearStoredToken();
      return;
    }

    if (!getStoredToken()) {
      syncJwtToken(email).catch(() => {});
    }
  }, [session?.user?.email, isPending]);

  return null;
}
