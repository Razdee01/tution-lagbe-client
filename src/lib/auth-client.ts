import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";
export const authClient = createAuthClient({
  // Same-origin: /api/auth is served by this Next app's catch-all route handler.
  plugins: [inferAdditionalFields<typeof auth>()],
});
