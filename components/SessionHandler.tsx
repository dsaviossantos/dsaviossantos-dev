"use client";

import { SessionProvider } from "next-auth/react";

export function SessionHandler({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
