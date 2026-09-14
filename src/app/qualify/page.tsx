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
      <h1 className="font-serif text-4xl tracking-tight text-paper sm:text-5xl">
        {copy.inquire.title}
      </h1>
      <p className="mt-6 mb-14 text-base leading-relaxed text-mute">{copy.inquire.lede}</p>
      <InquireForm initialIntent={intent} />
    </PageShell>
  );
}
