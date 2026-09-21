import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: copy.privacy.title,
  description: copy.privacy.description,
};

export default function PrivacyPage() {
  return <LegalPage title={copy.privacy.title} lede={copy.privacy.lede} body={copy.privacy.body} />;
}
