import type { Metadata } from "next";
import { GroupArticle } from "@/components/group-article";
import { GroupShell } from "@/components/group-shell";
import { copy } from "@/lib/copy";
import { inquireHref } from "@/lib/routes";

export const metadata: Metadata = {
  title: copy.acquire.title,
  description: copy.acquire.description,
};

const sections = [
  { title: copy.acquire.lookTitle, body: copy.acquire.lookBody },
  { title: copy.acquire.startTitle, body: copy.acquire.startBody },
  { title: copy.acquire.operateTitle, body: copy.acquire.operateBody },
];

export default function AcquirePage() {
  return (
    <GroupShell active="acquire">
      <GroupArticle
        title={copy.acquire.title}
        lede={copy.acquire.lede}
        sections={sections}
        ctaHref={inquireHref("acquire")}
        ctaLabel={copy.acquire.cta}
      />
    </GroupShell>
  );
}
