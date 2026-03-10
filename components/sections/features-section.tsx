import {
  Brain,
  CalendarRange,
  Link2,
  Calculator,
  ShieldCheck,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "AI-Powered Extraction",
    description:
      "Claude AI reads your lease and extracts 25+ structured data points — tenants, rent, escalation, renewal options, and more.",
    accent: "from-sky-100 to-blue-50",
    iconColor: "text-sky-600",
  },
  {
    icon: CalendarRange,
    title: "Amortization Schedule",
    description:
      "Auto-computed month-by-month payment schedule with escalation tracking and cumulative totals built in.",
    accent: "from-violet-100 to-purple-50",
    iconColor: "text-violet-600",
  },
  {
    icon: Calculator,
    title: "ASC 842 Ready",
    description:
      "Straight-line rent expense calculated automatically — the foundation for lease accounting compliance.",
    accent: "from-emerald-100 to-green-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Link2,
    title: "Shareable Results",
    description:
      "Every extraction generates a unique shareable link. No database needed — data lives in the URL.",
    accent: "from-amber-100 to-yellow-50",
    iconColor: "text-amber-600",
  },
  {
    icon: ShieldCheck,
    title: "Confidence Scoring",
    description:
      "Every extraction includes an AI confidence score and highlights missing fields so you know what to verify.",
    accent: "from-rose-100 to-pink-50",
    iconColor: "text-rose-600",
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description:
      "Upload a PDF and get structured results in under 30 seconds. No manual data entry, no spreadsheet wrangling.",
    accent: "from-sky-100 to-cyan-50",
    iconColor: "text-sky-600",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="w-full border-b relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-100/15 blur-3xl rounded-full pointer-events-none" />

      <div className="wrapper border-x py-16 md:py-24 relative">
        <div className="mb-14 text-center max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-white/70 px-3.5 py-1 mb-4 shadow-xs">
            <Zap className="h-3 w-3 text-sky-500" />
            <span className="text-xs font-semibold text-sky-700">
              Features
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Everything you need to{" "}
            <span className="gradient-text bg-linear-to-r from-sky-500 to-blue-600">
              decode a lease
            </span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            From raw PDF to structured data in seconds. No manual entry, no
            spreadsheet wrangling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, description, accent, iconColor }, i) => (
            <div
              key={title}
              className="group rounded-2xl border border-sky-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:glow-sm animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br ${accent} border border-sky-200/30 shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1.5">
                {title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
