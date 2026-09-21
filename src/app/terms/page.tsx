import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: copy.terms.title,
  description: copy.terms.description,
};

export default function TermsPage() {
  return <LegalPage title={copy.terms.title} lede={copy.terms.lede} body={copy.terms.body} />;
}
