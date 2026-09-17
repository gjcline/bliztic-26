import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { copy } from "@/lib/copy";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: {
    default: copy.siteName,
    template: `%s | ${copy.siteName}`,
  },
  description: copy.positioning,
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${instrument.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
