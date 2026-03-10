
export function fmtCurrency(value: number | null, currency?: string): string {
  if (value === null) return "—";
  const symbol = currency === "USD" || !currency ? "$" : currency + " ";
  return `${symbol}${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function fmtDate(value: string | null): string {
  if (!value) return "—";
  const d = new Date(value + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}


export function fmtDateShort(value: string): string {
  const d = new Date(value + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function fmtPercent(value: number | null): string {
  if (value === null) return "—";
  return `${(value * 100).toFixed(1)}%`;
}

export function fmtTerm(months: number | null): string {
  if (!months) return "—";
  const yr = Math.floor(months / 12);
  const mo = months % 12;
  if (yr === 0) return `${mo} mo`;
  if (mo === 0) return `${yr} yr${yr > 1 ? "s" : ""}`;
  return `${yr} yr${yr > 1 ? "s" : ""} ${mo} mo`;
}
