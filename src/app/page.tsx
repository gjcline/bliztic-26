import type { ReactNode } from "react";
import Link from "next/link";
import { SkipLink } from "@/components/site-header";
import AnimatedGradient from "@/components/ui/animated-gradient";
import { copy } from "@/lib/copy";
import { routes } from "@/lib/routes";

const linkClass = "transition-colors hover:text-paper";
const quietLinkClass =
  "text-paper underline decoration-paper/40 underline-offset-8 transition-colors hover:decoration-paper";

export default function HomePage() {
  return (
    <div className="relative isolate">
      <AnimatedGradient config={{ preset: "Prism" }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-ink/65"
      />
      <div className="relative z-10">
        <SkipLink />
        <main>
          <section className="flex min-h-dvh flex-col items-center justify-center px-6 py-20 text-center">
            <h1 className="rise font-serif text-6xl tracking-tight text-paper sm:text-8xl">
              {copy.siteName}
            </h1>
            <p className="rise rise-delay mx-auto mt-8 max-w-md text-base leading-relaxed text-mute sm:text-lg">
              {copy.positioning}
            </p>
            <nav
              aria-label={copy.a11y.nav}
              className="rise rise-delay-more mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-sm text-mute"
            >
              <Link href={routes.fund} className={linkClass}>
                {copy.nav.fund}
              </Link>
              <span aria-hidden="true" className="text-mute/40">
                ·
              </span>
              <Link href={routes.acquire} className={linkClass}>
                {copy.nav.acquire}
              </Link>
              <span aria-hidden="true" className="text-mute/40">
                ·
              </span>
              <Link href={routes.inquire} className={linkClass}>
                {copy.nav.inquire}
              </Link>
            </nav>
          </section>

          <div id="content" className="mx-auto w-full max-w-[34rem] px-6">
            <HomeSection title={copy.home.whatTitle}>
              <p>{copy.home.whatBody}</p>
              <p>{copy.home.whatMore}</p>
            </HomeSection>

            <HomeSection title={copy.home.workTitle}>
              <p>{copy.home.workBody}</p>
            </HomeSection>

            <HomeSection title={copy.home.capitalTitle}>
              <p>{copy.home.capitalBody}</p>
              <p>{copy.home.capitalMore}</p>
              <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3 text-sm">
                <Link href={routes.fund} className={quietLinkClass}>
                  {copy.nav.fund}
                </Link>
                <span aria-hidden="true" className="text-mute/40">
                  ·
                </span>
                <Link href={routes.acquire} className={quietLinkClass}>
                  {copy.nav.acquire}
                </Link>
              </p>
            </HomeSection>

            <HomeSection title={copy.home.absentTitle}>
              <p>{copy.home.absentBody}</p>
            </HomeSection>
          </div>

          <section className="flex flex-col items-center px-6 py-16 text-center sm:py-20">
            <p className="max-w-[34rem] font-serif text-3xl leading-snug tracking-tight text-paper sm:text-4xl">
              {copy.home.closeBody}
            </p>
            <p className="mt-10">
              <Link href={routes.inquire} className={quietLinkClass}>
                {copy.home.cta}
              </Link>
            </p>
            <p className="mt-16 font-serif text-xl tracking-tight text-paper">{copy.siteName}</p>
          </section>
        </main>
      </div>
    </div>
  );
}

function HomeSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="py-14 sm:py-16">
      <h2 className="font-serif text-4xl tracking-tight text-paper sm:text-5xl">{title}</h2>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-mute sm:mt-10">{children}</div>
    </section>
  );
}
