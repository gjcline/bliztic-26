import Link from "next/link";
import { copy } from "@/lib/copy";
import { routes } from "@/lib/routes";

type Active = "fund" | "acquire" | "inquire";

const links: { href: string; label: string; key: Active }[] = [
  { href: routes.fund, label: copy.nav.fund, key: "fund" },
  { href: routes.acquire, label: copy.nav.acquire, key: "acquire" },
  { href: routes.inquire, label: copy.nav.inquire, key: "inquire" },
];

export function SiteHeader({ active }: { active?: Active }) {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-baseline justify-between gap-8 px-6 pt-8 sm:pt-10">
      <Link
        href={routes.home}
        className="font-serif text-xl tracking-tight text-paper transition-opacity hover:opacity-70"
      >
        {copy.siteName}
      </Link>
      <nav aria-label={copy.a11y.nav} className="flex flex-wrap justify-end gap-x-6 gap-y-2 text-sm">
        {links.map((link) => {
          const current = active === link.key;
          return (
            <Link
              key={link.key}
              href={link.href}
              aria-current={current ? "page" : undefined}
              className={
                current
                  ? "text-paper"
                  : "text-mute transition-colors hover:text-paper"
              }
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export function SkipLink() {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:bg-ink focus:text-paper focus:underline"
    >
      {copy.a11y.skip}
    </a>
  );
}
