const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const TOKEN_KEY = "mentorlagbe_token";
let inflightSync: Promise<string> | null = null;

export function getStoredToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(TOKEN_KEY) ?? "";
}

export function clearStoredToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

export function authHeaders(extra: Record<string, string> = {}) {
  const token = getStoredToken();
  return {
    ...extra,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function syncJwtToken(email: string): Promise<string> {
  if (!email || typeof window === "undefined") return "";

  const existing = getStoredToken();
  if (existing) return existing;

  if (inflightSync) return inflightSync;

  inflightSync = (async () => {
    try {
      const res = await fetch(`${API_URL}/jwt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) return "";
      const data = await res.json();
      if (data?.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        return data.token;
      }
      return "";
    } finally {
      inflightSync = null;
    }
  })();

  return inflightSync;
}
