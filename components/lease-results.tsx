"use client";

import { useMemo } from "react";
import {
  CheckCircle,
  Shield,
  Gauge,
  AlertTriangle,
} from "lucide-react";
import { SummaryStats } from "@/components/summary-stats";
import { AmortizationTable } from "@/components/amortization-table";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { calculateAmortization } from "@/lib/amortization";
import { fmtCurrency, fmtDate, fmtPercent } from "@/lib/format";
import type { LeaseData } from "@/lib/types";


function getConfidenceMeta(score: number) {
  if (score >= 0.8)
    return { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200/60", label: "High" };
  if (score >= 0.5)
    return { color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200/60", label: "Medium" };
  return { color: "text-red-500", bg: "bg-red-50", border: "border-red-200/60", label: "Low" };
}

function DataRow({ label, value }: { label: string; value: string }) {
  const isMissing = value === "—";
  const isLong = value.length > 50;

  if (isLong && !isMissing) {
    return (
      <div className="py-2.5 border-b border-dashed border-sky-100/60 last:border-0 space-y-1">
        <span className="text-sm text-muted-foreground">{label}</span>
        <p className="text-sm font-semibold text-foreground leading-relaxed">
          {value}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 py-2.5 border-b border-dashed border-sky-100/60 last:border-0">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span className={`text-sm font-semibold text-right ${isMissing ? "text-muted-foreground/50" : "text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}

const CARD = "rounded-2xl border border-sky-100/80 bg-white p-6 shadow-lg glow-sm";


interface LeaseResultsProps {
  data: LeaseData;
}

export function LeaseResults({ data }: LeaseResultsProps) {
  const amortization = useMemo(() => calculateAmortization(data), [data]);
  const confidence = getConfidenceMeta(data.confidenceScore);

  return (
    <div className="space-y-6">
      <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Extraction Complete</AlertTitle>
        <AlertDescription>
          Confidence score: {(data.confidenceScore * 100).toFixed(0)}%.
          {data.missingFields.length > 0 &&
            ` ${data.missingFields.length} field${data.missingFields.length > 1 ? "s" : ""} not found in document.`}
        </AlertDescription>
      </Alert>

      <div className="flex flex-wrap gap-3">
        <div className={`inline-flex items-center gap-2 rounded-full border ${confidence.border} ${confidence.bg} px-3.5 py-1.5 shadow-xs`}>
          <Gauge className={`h-3.5 w-3.5 ${confidence.color}`} />
          <span className={`text-xs font-semibold ${confidence.color}`}>
            {confidence.label} Confidence — {(data.confidenceScore * 100).toFixed(0)}%
          </span>
        </div>
        {data.leaseType && (
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-sky-50/50 px-3.5 py-1.5 shadow-xs">
            <Shield className="h-3.5 w-3.5 text-sky-600" />
            <span className="text-xs font-semibold text-sky-700">{data.leaseType}</span>
          </div>
        )}
        {data.currency && (
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-sky-50/50 px-3.5 py-1.5 shadow-xs">
            <span className="text-xs font-semibold text-sky-700">{data.currency}</span>
          </div>
        )}
      </div>

      <SummaryStats
        rows={amortization}
        termMonths={data.leaseTermMonths}
        currency={data.currency}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={CARD}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Parties &amp; Property
          </h3>
          <DataRow label="Tenant" value={data.tenantName ?? "—"} />
          <DataRow label="Landlord" value={data.landlordName ?? "—"} />
          <DataRow label="Property" value={data.propertyAddress ?? "—"} />
          <DataRow label="Rentable Area" value={data.rentableAreaSqft ? `${data.rentableAreaSqft.toLocaleString()} sqft` : "—"} />
          <DataRow label="Permitted Use" value={data.permittedUse ?? "—"} />
        </div>

        <div className={CARD}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Lease Term
          </h3>
          <DataRow label="Start Date" value={fmtDate(data.leaseStartDate)} />
          <DataRow label="End Date" value={fmtDate(data.leaseEndDate)} />
          <DataRow label="Term" value={data.leaseTermMonths ? `${data.leaseTermMonths} months` : "—"} />
          <DataRow label="Termination Clause" value={data.terminationClause ?? "—"} />
          <DataRow label="Early Exit Penalty" value={fmtCurrency(data.earlyTerminationPenalty, data.currency)} />
        </div>

        <div className={CARD}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Financial Terms
          </h3>
          <DataRow label="Monthly Rent" value={fmtCurrency(data.monthlyRent, data.currency)} />
          <DataRow label="Security Deposit" value={fmtCurrency(data.securityDeposit, data.currency)} />
          <DataRow label="CAM Charges" value={fmtCurrency(data.camChargesMonthly, data.currency)} />
          <DataRow label="TI Allowance" value={fmtCurrency(data.tenantImprovementAllowance, data.currency)} />
          <DataRow label="Total Lease Value" value={fmtCurrency(data.totalLeaseValue, data.currency)} />
        </div>

        <div className={CARD}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Escalation &amp; Payment
          </h3>
          <DataRow label="Escalation Rate" value={fmtPercent(data.escalationRate)} />
          <DataRow label="Escalation Type" value={data.escalationType?.replace(/_/g, " ") ?? "—"} />
          <DataRow label="Payment Due Day" value={data.paymentDueDay ? `${data.paymentDueDay}th of month` : "—"} />
          <DataRow label="Late Fee" value={fmtPercent(data.lateFeePercent)} />
          <DataRow label="Grace Period" value={data.lateFeeGraceDays ? `${data.lateFeeGraceDays} days` : "—"} />
        </div>
      </div>

      {data.renewalOptions && data.renewalOptions.length > 0 && (
        <div className={CARD}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Renewal Options
          </h3>
          <div className="space-y-3">
            {data.renewalOptions.map((opt) => (
              <div key={opt.optionNumber} className="flex flex-wrap items-center gap-x-6 gap-y-1 py-2.5 border-b border-dashed border-sky-100/60 last:border-0 text-sm">
                <span className="font-semibold text-foreground">Option {opt.optionNumber}</span>
                <span className="text-muted-foreground">{opt.termYears} yr{opt.termYears > 1 ? "s" : ""}</span>
                <span className="text-muted-foreground">{opt.rentRate}</span>
                {opt.noticeRequiredDays && (
                  <span className="text-muted-foreground">{opt.noticeRequiredDays}-day notice</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {amortization.length > 0 && (
        <AmortizationTable rows={amortization} currency={data.currency} />
      )}

      {data.warnings.length > 0 && (
        <div className="rounded-2xl border border-amber-200/60 bg-amber-50/30 p-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <h3 className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
              Warnings
            </h3>
          </div>
          <ul className="space-y-1.5">
            {data.warnings.map((w, i) => (
              <li key={i} className="text-sm text-amber-800/80">&bull; {w}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
