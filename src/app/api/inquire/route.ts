import { NextResponse } from "next/server";
import { intents, type Intent } from "@/lib/copy";

type InquireBody = {
  intent?: string;
  company?: string;
  name?: string;
  email?: string;
  note?: string;
  sizeOrStage?: string;
};

function isIntent(value: string | undefined): value is Intent {
  return intents.includes(value as Intent);
}

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
  const note = body.note?.trim() ?? "";
  const sizeOrStage = body.sizeOrStage?.trim() ?? "";

  if (!isIntent(intent) || !company || !name || !email || !note || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Demo stub. Replace this block with a CRM, inbox, or webhook later.
  console.info("[inquire]", { intent, company, name, email, note, sizeOrStage });

  return NextResponse.json({ ok: true });
}
