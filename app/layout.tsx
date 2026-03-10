import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LeaseExtractor — AI-Powered Lease Data Extraction",
  description:
    "Upload a commercial lease PDF and get structured key terms, financials, and amortization schedules in seconds. Powered by Claude AI.",
  openGraph: {
    title: "LeaseExtractor — AI-Powered Lease Data Extraction",
    description:
      "Upload a commercial lease PDF and get structured key terms, financials, and amortization schedules in seconds.",
    type: "website",
    siteName: "LeaseExtractor",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeaseExtractor — AI-Powered Lease Data Extraction",
    description:
      "Upload a commercial lease PDF and get structured key terms, financials, and amortization schedules in seconds.",
  },
  metadataBase: new URL("https://lease-extractor.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
