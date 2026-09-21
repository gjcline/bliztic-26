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
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV === "production";
  }
  return process.env.NODE_ENV === "production";
}

export function parseNotifyTo(value: string | undefined) {
  const recipients = (value ?? "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return recipients.length > 0 ? recipients : [DEFAULT_TO];
}

const SENSITIVE_KEY =
  /api[_-]?key|authorization|password|secret|token|bearer|cookie|headers/i;
const PAYLOAD_KEY =
  /^(company|email|phone|note|sizeOrStage|intent|text|html|subject|from|to|replyTo)$/;

function redactSecrets(value: string) {
  return value.replace(/\bre_[A-Za-z0-9]+\b/g, "[redacted]");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function pickErrorFields(value: unknown): Record<string, unknown> {
  if (value instanceof Error) {
    const details: Record<string, unknown> = {
      name: value.name,
      message: redactSecrets(value.message),
    };
    const extra = value as Error & { statusCode?: unknown };
    if (extra.statusCode != null) {
      details.statusCode = extra.statusCode;
    }
    return details;
  }

  if (isRecord(value)) {
    const details: Record<string, unknown> = {};

    for (const [key, field] of Object.entries(value)) {
      if (SENSITIVE_KEY.test(key) || PAYLOAD_KEY.test(key)) {
        continue;
      }
      if (typeof field === "string") {
        details[key] = redactSecrets(field);
      } else if (
        typeof field === "number" ||
        typeof field === "boolean" ||
        field === null
      ) {
        details[key] = field;
      }
    }

    for (const nestedKey of ["error", "body"]) {
      const nested = value[nestedKey];
      if (!isRecord(nested)) {
        continue;
      }
      for (const [key, field] of Object.entries(pickErrorFields(nested))) {
        if (!(key in details)) {
          details[key] = field;
        }
      }
    }

    return details;
  }

  if (typeof value === "string") {
    return { message: redactSecrets(value) };
  }

  return { message: "unknown" };
}

export function serializeSendError(error: unknown) {
  const details = pickErrorFields(error);
  if (
    details.name == null &&
    details.message == null &&
    details.statusCode == null
  ) {
    return { message: "unknown" };
  }
  return details;
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
      to: parseNotifyTo(process.env.INQUIRE_NOTIFY_TO),
      replyTo: payload.email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[inquire] send failed", serializeSendError(error));
      return { ok: false as const, status: 502, error: "send_failed" };
    }

    return { ok: true as const };
  } catch (error) {
    console.error("[inquire] send failed", serializeSendError(error));
    return { ok: false as const, status: 502, error: "send_failed" };
  }
}
