
export interface RenewalOption {
  optionNumber: number;
  termYears: number;
  startDate: string | null;
  endDate: string | null;
  rentRate: string;
  noticeRequiredDays: number | null;
}

/** All fields extracted from a commercial lease PDF via Claude AI. */
export interface LeaseData {
  /* ── Parties & property ── */
  tenantName: string | null;
  landlordName: string | null;
  propertyAddress: string | null;

  /* ── Term ── */
  leaseStartDate: string | null;    // YYYY-MM-DD
  leaseEndDate: string | null;      // YYYY-MM-DD
  leaseTermMonths: number | null;

  /* ── Financial ── */
  monthlyRent: number | null;       // always normalized to monthly
  securityDeposit: number | null;
  escalationRate: number | null;    // decimal, e.g. 0.03 = 3%
  escalationType: string | null;    // "fixed_percent" | "CPI" | "fixed_dollar" | "market_rate" | "stepped"
  camChargesMonthly: number | null;
  totalLeaseValue: number | null;
  currency: string;

  /* ── Payment terms ── */
  paymentDueDay: number | null;
  lateFeePercent: number | null;
  lateFeeGraceDays: number | null;

  /* ── Space & improvements ── */
  rentableAreaSqft: number | null;
  tenantImprovementAllowance: number | null;

  /* ── Lease classification ── */
  leaseType: string | null;         // "NNN" | "Gross" | "Modified Gross" | etc.
  permittedUse: string | null;

  /* ── Termination & renewal ── */
  earlyTerminationPenalty: number | null;
  terminationClause: string | null;
  renewalOptions: RenewalOption[] | null;

  /* ── AI quality metadata ── */
  confidenceScore: number;          // 0.0–1.0
  missingFields: string[];
  warnings: string[];
}


export interface AmortizationRow {
  period: number;
  date: string;          // YYYY-MM-DD
  monthlyRent: number;
  cumulative: number;
}

export interface ExtractionResponse {
  success: boolean;
  data?: LeaseData;
  error?: string;
}
