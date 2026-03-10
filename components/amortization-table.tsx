"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, TrendingUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { fmtCurrency, fmtDateShort } from "@/lib/format";
import type { AmortizationRow } from "@/lib/types";

const COLLAPSED_ROWS = 24;

interface AmortizationTableProps {
  rows: AmortizationRow[];
  currency?: string;
}

export function AmortizationTable({ rows, currency }: AmortizationTableProps) {
  const [expanded, setExpanded] = useState(false);

  if (rows.length === 0) return null;

  const canCollapse = rows.length > COLLAPSED_ROWS;
  const visible = expanded ? rows : rows.slice(0, COLLAPSED_ROWS);
  const total = rows[rows.length - 1].cumulative;

  return (
    <div className="rounded-2xl border border-sky-100/80 bg-white shadow-lg glow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-sky-100/60">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-sky-100 to-blue-50 border border-sky-200/40">
            <TrendingUp className="h-4.5 w-4.5 text-sky-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Amortization Schedule
            </h3>
            <p className="text-xs text-muted-foreground">
              {rows.length} months &middot; Escalation applied at year marks
            </p>
          </div>
        </div>
      </div>


      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="w-20 text-xs font-semibold uppercase tracking-wider">
                Period
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">
                Date
              </TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wider">
                Monthly Rent
              </TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wider">
                Cumulative
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((row, i) => {
              const isEscalation = row.period > 1 && (row.period - 1) % 12 === 0;
              const prevRent = i > 0 ? visible[i - 1].monthlyRent : row.monthlyRent;
              const rentChanged = isEscalation && row.monthlyRent !== prevRent;

              return (
                <TableRow
                  key={row.period}
                  className={rentChanged ? "bg-sky-50/50" : ""}
                >
                  <TableCell className="font-medium text-muted-foreground">
                    {row.period}
                  </TableCell>
                  <TableCell>{fmtDateShort(row.date)}</TableCell>
                  <TableCell className="text-right font-semibold">
                    <span className="flex items-center justify-end gap-1.5">
                      {fmtCurrency(row.monthlyRent, currency)}
                      {rentChanged && (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-sky-100 px-1.5 py-0.5 text-[10px] font-bold text-sky-700">
                          <TrendingUp className="h-2.5 w-2.5" />
                          Escalation
                        </span>
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {fmtCurrency(row.cumulative, currency)}
                  </TableCell>
                </TableRow>
              );
            })}

            <TableRow className="bg-muted/40 font-semibold hover:bg-muted/40">
              <TableCell colSpan={2} className="text-xs uppercase tracking-wider text-muted-foreground">
                Total Obligation
              </TableCell>
              <TableCell />
              <TableCell className="text-right text-base font-bold text-foreground">
                {fmtCurrency(total, currency)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {canCollapse && (
        <div className="flex justify-center border-t border-sky-100/60 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="cursor-pointer gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            {expanded ? (
              <>
                Show less <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                Show all {rows.length} months <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
