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
  metadataBase: new URL("https://www.bliztic.com"),
  applicationName: copy.siteName,
  title: {
    default: copy.home.title,
    template: `%s | ${copy.siteName}`,
  },
  description: copy.home.description,
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bliztic.com",
    siteName: copy.siteName,
    title: copy.home.title,
    description: copy.home.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: copy.siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.home.title,
    description: copy.home.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
