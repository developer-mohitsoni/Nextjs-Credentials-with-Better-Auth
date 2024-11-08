import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://next-secure-ashen.vercel.app/", // the base url of your auth server
});
