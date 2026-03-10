"use client";

import { FileUp, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UploadSection() {
  return (
    <section id="upload" className="w-full border-b relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-sky-100/20 blur-3xl pointer-events-none" />

      <div className="wrapper border-x py-16 md:py-20 relative">
        <div className="mb-12 text-center max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-white/70 px-3.5 py-1 mb-4 shadow-xs">
            <FileUp className="h-3 w-3 text-sky-500" />
            <span className="text-xs font-semibold text-sky-700">Upload &amp; Extract</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Upload Your Lease
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Drag your PDF into the zone below. We&apos;ll extract every key data point 
            and return structured results you can export.
          </p>
        </div>

        <div className="mx-auto max-w-2xl rounded-2xl border border-sky-100/80 bg-white p-8 md:p-10 shadow-lg glow-sm">
          <div className="flex flex-col items-center gap-8">
            <div className="group flex w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-sky-200/60 bg-linear-to-b from-sky-50/40 to-transparent p-12 transition-all duration-300 hover:border-sky-400 hover:from-sky-50/60 hover:shadow-inner">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-sky-100 to-blue-50 border border-sky-200/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <FileUp className="h-7 w-7 text-sky-500" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">
                  Drag &amp; drop your lease PDF here
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  or click to browse &middot; PDF up to 32 MB
                </p>
              </div>
            </div>

            <Button
              disabled
              variant="gradient"
              className="w-full max-w-xs gap-2 shadow-md"
              size="lg"
            >
              <Sparkles className="h-4 w-4" />
              Extract Lease Data
            </Button>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {[
                "SOC 2 compliant",
                "Data encrypted at rest",
                "Auto-deleted after 24h",
              ].map((text) => (
                <span key={text} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
