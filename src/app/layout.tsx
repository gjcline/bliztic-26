import type { Metadata, Viewport } from "next";
import { Geist, Host_Grotesk, Instrument_Serif, Martian_Mono, Petrona } from "next/font/google";
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

const petrona = Petrona({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-petrona",
});

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-host",
});

const martianMono = Martian_Mono({
  subsets: ["latin"],
  weight: ["200", "400", "500"],
  variable: "--font-martian",
});

export const metadata: Metadata = {
  title: {
    default: copy.home.title,
    template: `%s | ${copy.siteName}`,
  },
  description: copy.home.description,
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#07131D",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrument.variable} ${petrona.variable} ${hostGrotesk.variable} ${martianMono.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
