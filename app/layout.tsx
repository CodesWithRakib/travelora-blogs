"use client";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// export const metadata: Metadata = {
//   title: {
//     template: "%s | Travel Blog",
//     default: "Travel Blog",
//   },
//   description: "Personal travel journal and stories from around the world.",
//   metadataBase: new URL("https://your-domain.com"),
//   openGraph: {
//     title: "Travel Blog",
//     description: "Personal travel journal and stories from around the world.",
//     url: "https://your-domain.com",
//     siteName: "Travel Blog",
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Travel Blog",
//     description: "Personal travel journal and stories from around the world.",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-gray-900 antialiased flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
