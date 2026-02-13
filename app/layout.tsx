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

export const metadata: Metadata = {
  title: {
    template: "%s | Travelora",
    default: "Travelora",
  },
  description: "Personal travel journal and stories from around the world.",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    title: "Travelora",
    description: "Personal travel journal and stories from around the world.",
    url: "https://your-domain.com",
    siteName: "Travelora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travelora",
    description: "Personal travel journal and stories from around the world.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
