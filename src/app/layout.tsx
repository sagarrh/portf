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
        url: "https://instagram.fbom36-1.fna.fbcdn.net/v/t51.2885-19/629355398_18070089518632325_5023492646030343554_n.jpg?stp=dst-jpg_s320x320_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fbom36-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QG5ZAGQqKIAgwzBX2tEE51nVfFJH4WawlwWSrw8DNyr540REOtlBCtLa1CIBvtSPGI&_nc_ohc=NeQgyefL_CgQ7kNvwHtm66S&_nc_gid=IpHYPRnHiXSmsqKTRKwVIQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Afu-epe3kqQ8-bwLIOYmgZffH-FgXW1DdzREhxfYU1Hefw&oe=699C95F0&_nc_sid=8b3546",
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
