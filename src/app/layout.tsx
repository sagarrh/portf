import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sagar Harsora",
    template: "%s | Sagar Harsora",
  },
  twitter: {
    card: "summary_large_image",
    site: "@SagarHarsora13",
    creator: "@SagarHarsora13",
  },
  description: "Software Engineer.",
  icons: "/static/favicon.ico",
  openGraph: {
    type: "website",locale: "en_IN",
    url: "https://www.sagarh.com", siteName: "Sagar Harsora",
    title: "Sagar Harsora",
    description: "Software Engineer.",
    images: [
      {
        url: "https://sagarh.com/static/sagarh.jpg",
        alt: "Sagar Harsora",
      },
    ],
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="flex h-screen flex-col">
      
        <main className="flex-1 overflow-y-auto">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
