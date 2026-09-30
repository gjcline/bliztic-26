import { SiteHeader, SkipLink } from "@/components/site-header";

export function PageShell({
  active,
  children,
}: {
  active?: "inquire";
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <SiteHeader active={active} />
      <main id="content" className="mx-auto w-full max-w-[34rem] flex-1 px-6 pb-28 pt-20 sm:pt-24">
        {children}
      </main>
    </div>
  );
}
