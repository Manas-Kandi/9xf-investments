import type { Metadata } from "next";
import { Theme } from "@carbon/react";
import "./globals.css";
import { MonitoringProvider } from "@/components/MonitoringProvider";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { AnalyticsConsentBanner } from "@/components/AnalyticsConsentBanner";

export const metadata: Metadata = {
  title: "9xf labs | Invest in startups you believe in",
  description: "Own small pieces of early-stage companies with the same simplicity as buying a coffee. Invest from $50.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme theme="g100">
          <MonitoringProvider />
          <AnalyticsProvider />
          <AnalyticsConsentBanner />
          {children}
        </Theme>
      </body>
    </html>
  );
}
