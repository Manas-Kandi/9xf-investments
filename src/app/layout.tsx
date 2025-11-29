import type { Metadata } from "next";
import { Theme } from "@carbon/react";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";
import SessionProvider from "@/components/SessionProvider";
import type { User } from "@/types/database";

export const metadata: Metadata = {
  title: "9xf labs | Invest in startups you believe in",
  description: "Own small pieces of early-stage companies with the same simplicity as buying a coffee. Invest from $50.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  let session = null;
  let profile: User | null = null;

  if (supabase) {
    const {
      data: { session: serverSession },
    } = await supabase.auth.getSession();

    session = serverSession;

    if (serverSession?.user) {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", serverSession.user.id)
        .maybeSingle();

      profile = data ?? null;
    }
  }

  return (
    <html lang="en">
      <body>
        <Theme theme="g100">
          <SessionProvider session={session} profile={profile}>
            {children}
          </SessionProvider>
        </Theme>
      </body>
    </html>
  );
}
