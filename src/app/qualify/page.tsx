import type { Metadata } from "next";
import { InquireForm } from "@/components/inquire-form";
import { PageShell } from "@/components/page-shell";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: copy.inquire.title,
  description: copy.inquire.description,
};

export default async function QualifyPage({
  searchParams,
}: PageProps<"/qualify">) {
  const params = await searchParams;
  const intent = typeof params.intent === "string" ? params.intent : undefined;

  return (
    <PageShell active="inquire">
      <InquireForm initialIntent={intent} />
    </PageShell>
  );
}
