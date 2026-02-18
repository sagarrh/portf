import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: {
    default: "Sagar Harsora",
    template: "%s | Sagar Harsora",
  },
  description: "Software engineer in Mumbai.",
  icons: {
    icon: [
      { url: "/static/favicon.ico", sizes: "any" },
      { url: "/static/favicon.png", type: "image/png" },
    ],
    apple: "/static/meta/apple-touch-icon.png",
  },
  manifest: "/static/meta/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.sagarh.com",
    siteName: "Sagar Harsora",
    title: "Sagar Harsora",
    description: "Software engineer in Mumbai.",
    images: [
      {
        url: "https://www.sagarh.com/static/og/default.png",
        alt: "Sagar Harsora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SagarHarsora13",
    creator: "@SagarHarsora13",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col">
        <Nav />
        <main className="flex-1 overflow-hidden">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
