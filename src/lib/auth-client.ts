import { createAuthClient } from "better-auth/react";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.BETTER_AUTH_URL // Production URL from .env.production
    : process.env.BETTER_AUTH_URL; // Development URL from .env.local

export const authClient = createAuthClient({
  baseURL, // the base url of your auth server
});
