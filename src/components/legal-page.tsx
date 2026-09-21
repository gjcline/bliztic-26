import { PageShell } from "@/components/page-shell";

export function LegalPage({
  title,
  lede,
  body,
}: {
  title: string;
  lede: string;
  body: readonly string[];
}) {
  return (
    <PageShell>
      <h1 className="font-serif text-4xl tracking-tight text-paper sm:text-5xl">{title}</h1>
      <p className="mt-6 text-base leading-relaxed text-mute">{lede}</p>
      <div className="mt-12 space-y-6 text-base leading-relaxed text-mute">
        {body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </PageShell>
  );
}
