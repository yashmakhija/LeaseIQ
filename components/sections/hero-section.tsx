import { ArrowRight, Clock, FileCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="w-full border-b overflow-hidden relative">

      <div className="absolute inset-0 bg-linear-to-br from-sky-50/80 via-blue-50/30 to-transparent pointer-events-none" />
      <div className="absolute top-20 -right-32 w-96 h-96 rounded-full bg-sky-200/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-24 w-72 h-72 rounded-full bg-blue-100/30 blur-3xl pointer-events-none" />

      <div className="wrapper border-x relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 py-16 md:py-24">

          <div className="flex flex-col justify-center gap-7">
            <div className="flex items-center gap-2.5 w-fit rounded-full border border-sky-200/60 bg-white/70 backdrop-blur-sm px-4 py-1.5 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
              </span>
              <span className="text-xs font-semibold text-sky-700">
                AI-Powered Extraction
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-[3.25rem] leading-[1.08]">
              Stop reading leases.
              <br />
              <span className="gradient-text bg-linear-to-r from-sky-500 via-blue-500 to-sky-600">
                Start extracting data.
              </span>
            </h1>

            <p className="text-base text-muted-foreground max-w-md leading-relaxed">
              Upload a commercial lease PDF and get structured key terms, 
              dates, and financials in seconds — not hours.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button variant="gradient" size="lg" className="gap-2 shadow-md glow-sm">
                Start Extracting
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="bg-white/60 backdrop-blur-sm">
                See How It Works
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-3">
              {[
                { icon: Clock, text: "Under 30 seconds" },
                { icon: ShieldCheck, text: "99% accuracy" },
                { icon: FileCheck, text: "Any PDF format" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-100">
                    <Icon className="h-3 w-3 text-sky-600" />
                  </span>
                  {text}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute -top-8 -right-8 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-blue-100/40 blur-3xl" />

              <div className="relative rounded-2xl border border-sky-100/80 bg-white p-6 shadow-xl glow-md">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-sky-100 to-blue-50">
                      <FileCheck className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Lease_2026_Q1.pdf</p>
                      <p className="text-xs text-muted-foreground">2.4 MB &middot; Processed</p>
                    </div>
                    <div className="ml-auto flex h-6 items-center rounded-full bg-emerald-50 px-2.5 border border-emerald-200/60">
                      <span className="text-[10px] font-semibold text-emerald-600">Complete</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: "Tenant", value: "Acme Corp" },
                      { label: "Monthly Rent", value: "$12,500" },
                      { label: "Lease Start", value: "Jan 1, 2026" },
                      { label: "Term Length", value: "36 months" },
                      { label: "Security Deposit", value: "$25,000" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-sm py-0.5">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-semibold text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2.5 pt-3 border-t">
                    <div className="h-2 flex-1 rounded-full bg-sky-100 overflow-hidden">
                      <div className="h-full w-full rounded-full bg-linear-to-r from-sky-400 via-blue-500 to-sky-500 animate-pulse" />
                    </div>
                    <span className="text-xs font-bold text-sky-600">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
