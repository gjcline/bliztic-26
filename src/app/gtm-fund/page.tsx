import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
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
    <PageShell active="fund">
      <h1 className="font-serif text-4xl tracking-tight text-paper sm:text-5xl">
        {copy.fund.title}
      </h1>
      <p className="mt-6 text-base leading-relaxed text-mute">{copy.fund.lede}</p>
      <div className="mt-16 space-y-14">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-sm text-paper">{section.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-mute">{section.body}</p>
          </section>
        ))}
      </div>
      <p className="mt-16">
        <Link
          href={inquireHref("fund")}
          className="text-paper underline decoration-paper/40 underline-offset-8 transition-colors hover:decoration-paper"
        >
          {copy.fund.cta}
        </Link>
      </p>
    </PageShell>
  );
}
