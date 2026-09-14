import Link from "next/link";
import { copy } from "@/lib/copy";
import { routes } from "@/lib/routes";

export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="rise font-serif text-6xl tracking-tight text-paper sm:text-8xl">
        {copy.siteName}
      </h1>
      <p className="rise rise-delay mx-auto mt-8 max-w-md text-base leading-relaxed text-mute sm:text-lg">
        {copy.positioning}
      </p>
      <nav
        aria-label={copy.a11y.nav}
        className="rise rise-delay-more mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-mute"
      >
        <Link href={routes.fund} className="transition-colors hover:text-paper">
          {copy.nav.fund}
        </Link>
        <Link href={routes.acquire} className="transition-colors hover:text-paper">
          {copy.nav.acquire}
        </Link>
        <Link href={routes.inquire} className="transition-colors hover:text-paper">
          {copy.nav.inquire}
        </Link>
      </nav>
    </main>
  );
}
