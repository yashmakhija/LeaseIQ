"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between border-x px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-sky-400 to-blue-600 shadow-sm transition-shadow group-hover:glow-sm">
            <span className="text-sm font-bold text-white leading-none">L</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Lease<span className="text-sky-600">Extractor</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/#features"
            className="relative cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-sky-500 after:transition-all hover:after:w-full"
          >
            Features
          </Link>
          <Link
            href="/#upload"
            className="relative cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-sky-500 after:transition-all hover:after:w-full"
          >
            Upload
          </Link>
        </div>

        <Link href="/#upload">
          <Button variant="gradient" size="sm" className="cursor-pointer shadow-sm">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
}
