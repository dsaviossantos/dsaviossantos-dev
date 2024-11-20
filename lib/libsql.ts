import { createClient } from "@libsql/client";
export const client = createClient({
  url: process.env.TURSO_DATABASE_URL! as string,
  authToken: process.env.TURSO_DATABASE_AUTH_TOKEN as string,
});
