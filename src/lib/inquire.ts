import { intents, type Intent } from "@/lib/copy";

export type InquirePayload = {
  intent: Intent;
  company: string;
  name: string;
  email: string;
  phone: string;
  note: string;
  sizeOrStage: string;
};

export function isIntent(value: string | undefined): value is Intent {
  return intents.includes(value as Intent);
}
