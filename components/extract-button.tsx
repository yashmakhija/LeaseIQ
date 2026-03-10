"use client";

import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExtractButtonProps {
  hasFile: boolean;
  isLoading: boolean;
  onClick: () => void;
}

export function ExtractButton({
  hasFile,
  isLoading,
  onClick,
}: ExtractButtonProps) {
  return (
    <Button
      variant="gradient"
      size="lg"
      disabled={!hasFile || isLoading}
      onClick={onClick}
      className="w-full max-w-xs gap-2 shadow-md"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Extracting…
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Extract Lease Data
        </>
      )}
    </Button>
  );
}
