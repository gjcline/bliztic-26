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
  openGraph: {
    title: copy.home.title,
    description: copy.home.description,
    url: "https://www.bliztic.com",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: copy.siteName }],
  },
  twitter: {
    title: copy.home.title,
    description: copy.home.description,
    images: ["/og.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: homeMarkup }} />
      <Script src="/home.js" strategy="afterInteractive" />
    </>
  );
}
