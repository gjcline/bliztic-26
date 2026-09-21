import type { Metadata } from "next";
import { GroupShell } from "@/components/group-shell";
import { InquireForm } from "@/components/inquire-form";
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
    <GroupShell active="inquire">
      <section className="sec inquire-sec" aria-labelledby="inquire-title">
        <div className="wrap">
          <InquireForm initialIntent={intent} />
        </div>
      </section>
    </GroupShell>
  );
}
