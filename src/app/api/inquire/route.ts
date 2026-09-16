import { NextResponse } from "next/server";
import { isIntent, type InquirePayload } from "@/lib/inquire";
import { notifyInquire } from "@/lib/inquire-notify";

type InquireBody = Partial<InquirePayload>;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: InquireBody;

  try {
    body = (await request.json()) as InquireBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const intent = body.intent?.trim();
  const company = body.company?.trim() ?? "";
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const note = intent === "other" ? (body.note?.trim() ?? "") : "";
  const sizeOrStage = body.sizeOrStage?.trim() ?? "";

  if (!isIntent(intent) || !company || !name || !email || !phone || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const payload: InquirePayload = {
    intent,
    company,
    name,
    email,
    phone,
    note,
    sizeOrStage,
  };

  const result = await notifyInquire(payload);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
