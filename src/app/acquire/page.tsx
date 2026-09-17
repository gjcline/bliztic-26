import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
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
    <PageShell active="acquire">
      <h1 className="font-serif text-4xl tracking-tight text-paper sm:text-5xl">
        {copy.acquire.title}
      </h1>
      <p className="mt-6 text-base leading-relaxed text-mute">{copy.acquire.lede}</p>
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
          href={inquireHref("acquire")}
          className="text-paper underline decoration-paper/40 underline-offset-8 transition-colors hover:decoration-paper"
        >
          {copy.acquire.cta}
        </Link>
      </p>
    </PageShell>
  );
}
