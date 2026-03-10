import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import type { LeaseData } from "@/lib/types";


export function compressLeaseData(data: LeaseData): string {
  return compressToEncodedURIComponent(JSON.stringify(data));
}


export function decompressLeaseData(encoded: string): LeaseData | null {
  try {
    const json = decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return JSON.parse(json) as LeaseData;
  } catch {
    return null;
  }
}
