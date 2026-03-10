"use client";

import { DollarSign, CalendarClock, TrendingUp } from "lucide-react";
import { fmtCurrency, fmtTerm } from "@/lib/format";
import type { AmortizationRow } from "@/lib/types";
import { getTotalObligation, getStraightLineExpense } from "@/lib/amortization";

interface SummaryStatsProps {
  rows: AmortizationRow[];
  termMonths: number | null;
  currency?: string;
}

const CARD = "rounded-2xl border border-sky-100/80 bg-white p-6 shadow-lg glow-sm";

export function SummaryStats({ rows, termMonths, currency }: SummaryStatsProps) {
  const total = getTotalObligation(rows);
  const straightLine = getStraightLineExpense(rows);

  const stats = [
    {
      icon: DollarSign,
      label: "Total Lease Value",
      value: fmtCurrency(total, currency),
    },
    {
      icon: CalendarClock,
      label: "Lease Term",
      value: fmtTerm(termMonths),
    },
    {
      icon: TrendingUp,
      label: "Straight-Line Rent",
      value: fmtCurrency(straightLine, currency),
      sublabel: "ASC 842 monthly",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map(({ icon: Icon, label, value, sublabel }) => (
        <div key={label} className={CARD}>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-sky-100 to-blue-50 border border-sky-200/40">
              <Icon className="h-4.5 w-4.5 text-sky-600" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {label}
            </span>
          </div>
          <p className="text-2xl font-bold tracking-tight text-foreground">
            {value}
          </p>
          {sublabel && (
            <p className="mt-0.5 text-xs text-muted-foreground">{sublabel}</p>
          )}
        </div>
      ))}
    </div>
  );
}
