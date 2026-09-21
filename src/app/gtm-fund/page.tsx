import type { Metadata } from "next";
import { GroupArticle } from "@/components/group-article";
import { GroupShell } from "@/components/group-shell";
import { copy } from "@/lib/copy";
import { inquireHref } from "@/lib/routes";

export const metadata: Metadata = {
  title: copy.fund.title,
  description: copy.fund.description,
};

const sections = [
  { title: copy.fund.whatTitle, body: copy.fund.whatBody },
  { title: copy.fund.whoTitle, body: copy.fund.whoBody },
  { title: copy.fund.coverTitle, body: copy.fund.coverBody },
  { title: copy.fund.qualifyTitle, body: copy.fund.qualifyBody },
];

export default function GtmFundPage() {
  return (
    <GroupShell active="fund">
      <GroupArticle
        title={copy.fund.title}
        lede={copy.fund.lede}
        sections={sections}
        ctaHref={inquireHref("fund")}
        ctaLabel={copy.fund.cta}
      />
    </GroupShell>
  );
}
