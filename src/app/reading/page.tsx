import type { Metadata } from "next";
import ReadingClient from "@/app/reading/reading-client";

export const metadata: Metadata = {
  title: "Reading",
  openGraph: {
    title: "Reading | Sagar Harsora",
  },
};

export default function ReadingPage() {
  return <ReadingClient />;
}
