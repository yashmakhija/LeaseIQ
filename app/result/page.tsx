"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import {
  FileText,
  RotateCcw,
  Share2,
  Check,
  AlertCircle,
  TriangleAlert,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LeaseResults } from "@/components/lease-results";
import { Button } from "@/components/ui/button";
import { decompressLeaseData } from "@/lib/compression";

function ResultContent() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const encoded = searchParams.get("d");
  const data = encoded ? decompressLeaseData(encoded) : null;

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!data) {
    return (
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-20 text-center">
        <div className="mx-auto max-w-md space-y-4">
          <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-destructive/10">
            <AlertCircle className="h-7 w-7 text-destructive" />
          </div>
          <h2 className="text-xl font-bold">Invalid or Expired Link</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This result link is invalid or the data could not be decoded.
            Please upload your lease again.
          </p>
          <Link href="/#upload">
            <Button variant="gradient" className="cursor-pointer gap-2 shadow-md mt-2">
              <RotateCcw className="h-4 w-4" />
              Upload New Lease
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (data.warnings?.includes("NOT_A_LEASE")) {
    const otherWarnings = data.warnings.filter((w) => w !== "NOT_A_LEASE");

    return (
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-20 text-center">
        <div className="mx-auto max-w-md space-y-4">
          <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-amber-100 border border-amber-200/60">
            <TriangleAlert className="h-7 w-7 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold">
            This doesn&apos;t look like a lease
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We couldn&apos;t find any lease terms in this document. Please upload
            a commercial lease agreement PDF.
          </p>
          {otherWarnings.length > 0 && (
            <div className="rounded-xl border border-amber-200/60 bg-amber-50/30 px-4 py-3 text-left">
              <p className="text-xs font-semibold text-amber-700 mb-1.5">Details from AI</p>
              {otherWarnings.map((w, i) => (
                <p key={i} className="text-xs text-amber-800/80">&bull; {w}</p>
              ))}
            </div>
          )}
          <Link href="/#upload">
            <Button variant="gradient" className="cursor-pointer gap-2 shadow-md mt-2">
              <RotateCcw className="h-4 w-4" />
              Try another file
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-sky-100/80 bg-white px-6 py-4 shadow-lg glow-sm animate-fade-in-up">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-sky-100 to-blue-50 border border-sky-200/40 shadow-sm">
              <FileText className="h-5 w-5 text-sky-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Lease Extraction Results
              </p>
              <p className="text-xs text-muted-foreground">
                {data.tenantName ?? "Unknown Tenant"} &middot;{" "}
                {data.leaseType ?? "Lease"} &middot; Shareable link
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="cursor-pointer gap-1.5 bg-white/60"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </>
              )}
            </Button>
            <Link href="/#upload">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer gap-1.5 bg-white/60"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Re-upload
              </Button>
            </Link>
          </div>
        </div>

        <LeaseResults data={data} />
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="mx-auto max-w-6xl px-4 md:px-6 py-20 text-center">
              <p className="text-sm text-muted-foreground">Loading results…</p>
            </div>
          }
        >
          <ResultContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
