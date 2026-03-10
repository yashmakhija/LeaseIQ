import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-linear-to-b from-transparent to-sky-50/20">
      <div className="wrapper py-8 flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-linear-to-br from-sky-400 to-blue-600">
              <span className="text-[10px] font-bold text-white leading-none">L</span>
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Lease<span className="text-sky-600">Extractor</span>
            </span>
          </Link>
          <span className="text-xs text-muted-foreground">
            &copy; 2026 Lease Extractor. All rights reserved.
          </span>
        </div>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((link) => (
            <Link
              key={link}
              href={`/${link.toLowerCase()}`}
              className="cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
