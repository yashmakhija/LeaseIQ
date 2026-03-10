"use client";

import { useCallback, useRef, useState } from "react";
import { FileUp, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 32 * 1024 * 1024; // 32 MB
const ACCEPTED_TYPE = "application/pdf";

interface UploadZoneProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateFile(file: File): string | null {
  if (file.type !== ACCEPTED_TYPE) return "Only PDF files are supported.";
  if (file.size > MAX_FILE_SIZE) return "File must be under 32 MB.";
  return null;
}

export function UploadZone({ file, onFileSelect, disabled }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (incoming: File) => {
      const err = validateFile(incoming);
      if (err) {
        setError(err);
        return;
      }
      setError(null);
      onFileSelect(incoming);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (selected) handleFile(selected);
      // Reset so the same file can be re-selected
      e.target.value = "";
    },
    [handleFile]
  );

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setError(null);
      onFileSelect(null);
    },
    [onFileSelect]
  );

  return (
    <div className="w-full space-y-2">
      <div
        role="button"
        tabIndex={0}
        onClick={() => !disabled && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        className={cn(
          "group flex w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-12 transition-all duration-300",
          "bg-linear-to-b from-sky-50/40 to-transparent",
          disabled && "pointer-events-none opacity-50",
          isDragging
            ? "border-sky-400 from-sky-50/60 shadow-inner glow-sm"
            : file
              ? "border-sky-300 from-sky-50/50"
              : "border-sky-200/60 hover:border-sky-400 hover:from-sky-50/60 hover:shadow-inner"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleInputChange}
        />

        {file ? (

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-sky-100 to-blue-50 border border-sky-200/40 shadow-sm">
              <FileText className="h-6 w-6 text-sky-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground truncate max-w-[240px]">
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size)} &middot; PDF
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="ml-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (

          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-sky-100 to-blue-50 border border-sky-200/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <FileUp className="h-7 w-7 text-sky-500" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">
                {isDragging
                  ? "Drop your PDF here"
                  : "Drag & drop your lease PDF here"}
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                or click to browse &middot; PDF up to 32 MB
              </p>
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="text-xs font-medium text-destructive text-center">
          {error}
        </p>
      )}
    </div>
  );
}
