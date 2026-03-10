import type { LeaseData, AmortizationRow } from "@/lib/types";


export function calculateAmortization(data: LeaseData): AmortizationRow[] {
  const { monthlyRent, leaseTermMonths, leaseStartDate, escalationRate } = data;

  if (!monthlyRent || !leaseTermMonths || !leaseStartDate) return [];

  const start = new Date(leaseStartDate + "T00:00:00");
  const rate = escalationRate ?? 0;
  const rows: AmortizationRow[] = [];

  let rent = monthlyRent;
  let cumulative = 0;

  for (let i = 0; i < leaseTermMonths; i++) {
    if (i > 0 && i % 12 === 0) {
      rent *= 1 + rate;
    }

    cumulative += rent;

    const date = new Date(start);
    date.setMonth(date.getMonth() + i);

    rows.push({
      period: i + 1,
      date: date.toISOString().split("T")[0],
      monthlyRent: Math.round(rent * 100) / 100,
      cumulative: Math.round(cumulative * 100) / 100,
    });
  }

  return rows;
}

/** Total obligation across all periods. */
export function getTotalObligation(rows: AmortizationRow[]): number {
  return rows.length > 0 ? rows[rows.length - 1].cumulative : 0;
}

/**
 * Straight-line monthly expense (ASC 842 concept).
 * Total obligation spread evenly across all months.
 */
export function getStraightLineExpense(rows: AmortizationRow[]): number {
  if (rows.length === 0) return 0;
  return Math.round((getTotalObligation(rows) / rows.length) * 100) / 100;
}
