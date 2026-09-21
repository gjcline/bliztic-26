import type { ReactNode } from "react";
import Script from "next/script";
import { GroupChrome } from "@/components/group-chrome";
import "@/app/home.css";

export function GroupShell({
  active,
  children,
}: {
  active?: "inquire";
  children: ReactNode;
}) {
  return (
    <>
      <GroupChrome active={active}>{children}</GroupChrome>
      <Script src="/home.js" strategy="afterInteractive" />
    </>
  );
}
