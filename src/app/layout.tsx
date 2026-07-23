import type { Metadata } from "next";
import { Dosis, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dosis = Dosis({
  variable: "--font-dosis",
  subsets: ["latin"],
  weight: "600",
});

export const metadata: Metadata = {
  title: "MemoGrafter | Lifecycle-managed memory for AI agents",
  description:
    "Structured, versioned memory for TypeScript agents with lifecycle controls, graph-native recall, CLI tooling, and Studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${dosis.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
