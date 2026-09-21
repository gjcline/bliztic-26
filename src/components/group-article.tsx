import Link from "next/link";

export function GroupArticle({
  title,
  lede,
  sections,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  lede: string;
  sections: readonly { title: string; body: string }[];
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <section className="sec article-sec" aria-labelledby="article-title">
      <div className="wrap">
        <h1 id="article-title" className="display article-h">
          {title}
        </h1>
        <p className="article-lede mute">{lede}</p>
        <div className="article-blocks">
          {sections.map((section) => (
            <section key={section.title} className="article-block">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
        <p className="article-cta">
          <Link className="cta" href={ctaHref}>
            {ctaLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
