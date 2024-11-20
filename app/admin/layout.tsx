import { SessionHandler } from "@/components/SessionHandler";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SessionHandler>{children}</SessionHandler>;
}
