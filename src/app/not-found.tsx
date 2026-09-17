import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { copy } from "@/lib/copy";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <PageShell>
      <h1 className="font-serif text-4xl tracking-tight text-paper sm:text-5xl">
        {copy.notFound.body}
      </h1>
      <p className="mt-10">
        <Link
          href={routes.home}
          className="text-paper underline decoration-paper/40 underline-offset-8 hover:decoration-paper"
        >
          {copy.notFound.home}
        </Link>
      </p>
    </PageShell>
  );
}
