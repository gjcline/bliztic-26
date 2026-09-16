import { Resend } from "resend";
import { copy, type Intent } from "@/lib/copy";
import type { InquirePayload } from "@/lib/inquire";

const DEFAULT_TO = "grant@dev.bliztic.com";
const DEFAULT_FROM = "Bliztic <onboarding@resend.dev>";

const intentLabel: Record<Intent, string> = {
  fund: copy.inquire.intentFund,
  acquire: copy.inquire.intentAcquire,
  other: copy.inquire.intentOther,
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fieldLines(payload: InquirePayload, receivedAt: string) {
  return [
    `${copy.inquire.intent}: ${intentLabel[payload.intent]}`,
    `${copy.inquire.company}: ${payload.company}`,
    `${copy.inquire.name}: ${payload.name}`,
    `${copy.inquire.email}: ${payload.email}`,
    `${copy.inquire.phone}: ${payload.phone}`,
    `${copy.inquire.note}: ${payload.note}`,
    `${copy.inquire.size}: ${payload.sizeOrStage}`,
    `Received: ${receivedAt}`,
  ];
}

export function inquireSubject(payload: InquirePayload) {
  return `Bliztic inquire: ${intentLabel[payload.intent]} from ${payload.company}`;
}

export function inquireText(payload: InquirePayload, receivedAt: string) {
  return fieldLines(payload, receivedAt).join("\n");
}

export function inquireHtml(payload: InquirePayload, receivedAt: string) {
  const rows = fieldLines(payload, receivedAt)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
  return `<div>${rows}</div>`;
}

export function isProductionRuntime() {
  return process.env.NODE_ENV === "production";
}

export async function notifyInquire(payload: InquirePayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const receivedAt = new Date().toISOString();

  if (!apiKey) {
    if (isProductionRuntime()) {
      return { ok: false as const, status: 500, error: "unavailable" };
    }
    console.info("[inquire]", payload);
    return { ok: true as const };
  }

  const resend = new Resend(apiKey);
  const subject = inquireSubject(payload);
  const text = inquireText(payload, receivedAt);
  const html = inquireHtml(payload, receivedAt);

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM || DEFAULT_FROM,
      to: process.env.INQUIRE_NOTIFY_TO || DEFAULT_TO,
      replyTo: payload.email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[inquire] send failed");
      return { ok: false as const, status: 502, error: "send_failed" };
    }

    return { ok: true as const };
  } catch {
    console.error("[inquire] send failed");
    return { ok: false as const, status: 502, error: "send_failed" };
  }
}
