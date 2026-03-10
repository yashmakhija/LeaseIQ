import { NextRequest, NextResponse } from "next/server";
import { EXTRACTION_PROMPT } from "@/lib/extraction-prompt";
import type { LeaseData, ExtractionResponse } from "@/lib/types";

const PROXY_URL = process.env.CLAUDE_PROXY_URL;
const API_KEY = process.env.CLAUDE_API_KEY;

function sanitizeJSON(raw: string): string {
  return raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

export async function POST(req: NextRequest) {
  if (!PROXY_URL || !API_KEY) {
    return NextResponse.json<ExtractionResponse>(
      { success: false, error: "Server is missing API configuration." },
      { status: 500 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file || file.type !== "application/pdf") {
    return NextResponse.json<ExtractionResponse>(
      { success: false, error: "A valid PDF file is required." },
      { status: 400 }
    );
  }

  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  try {
    const response = await fetch(`${PROXY_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "document",
                source: {
                  type: "base64",
                  media_type: "application/pdf",
                  data: base64,
                },
              },
              { type: "text", text: EXTRACTION_PROMPT },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("Claude proxy error:", response.status, body);
      return NextResponse.json<ExtractionResponse>(
        { success: false, error: "AI extraction failed. Please try again." },
        { status: 502 }
      );
    }

    const result = await response.json();
    const rawText: string = result.content?.[0]?.text ?? "";
    const cleaned = sanitizeJSON(rawText);
    const data: LeaseData = JSON.parse(cleaned);

    return NextResponse.json<ExtractionResponse>({ success: true, data });
  } catch (err) {
    console.error("Extraction error:", err);
    return NextResponse.json<ExtractionResponse>(
      { success: false, error: "Failed to process the lease. Please try again." },
      { status: 500 }
    );
  }
}
