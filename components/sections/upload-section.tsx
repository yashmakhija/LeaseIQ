"use client";

import { useState } from "react";
import { FileUp, CheckCircle2 } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { ExtractButton } from "@/components/extract-button";

const TRUST_BADGES = [
  "SOC 2 compliant",
  "Data encrypted at rest",
  "Auto-deleted after 24h",
];

export function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExtract = async () => {
    if (!file) return;
    setIsLoading(true);
    // TODO: Phase 3 — call /api/extract with the file
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <section id="upload" className="w-full border-b relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-sky-100/20 blur-3xl pointer-events-none" />

      <div className="wrapper border-x py-16 md:py-20 relative">
        {/* Section header */}
        <div className="mb-12 text-center max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-white/70 px-3.5 py-1 mb-4 shadow-xs">
            <FileUp className="h-3 w-3 text-sky-500" />
            <span className="text-xs font-semibold text-sky-700">
              Upload &amp; Extract
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Upload Your Lease
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Drag your PDF into the zone below. We&apos;ll extract every key data
            point and return structured results you can export.
          </p>
        </div>

        {/* Upload card */}
        <div className="mx-auto max-w-2xl rounded-2xl border border-sky-100/80 bg-white p-8 md:p-10 shadow-lg glow-sm">
          <div className="flex flex-col items-center gap-8">
            <UploadZone
              file={file}
              onFileSelect={setFile}
              disabled={isLoading}
            />

            <ExtractButton
              hasFile={!!file}
              isLoading={isLoading}
              onClick={handleExtract}
            />

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {TRUST_BADGES.map((text) => (
                <span
                  key={text}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
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
