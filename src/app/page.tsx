import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Script from "next/script";
import { copy } from "@/lib/copy";
import "./home.css";

const homeMarkup = readFileSync(join(process.cwd(), "src/content/home.html"), "utf8");

export const metadata: Metadata = {
  title: { absolute: copy.home.title },
  description: copy.home.description,
};

export default function HomePage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: homeMarkup }} />
      <Script src="/home.js" strategy="afterInteractive" />
    </>
  );
}
