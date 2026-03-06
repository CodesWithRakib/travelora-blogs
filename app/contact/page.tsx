// app/contact/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Instagram, Twitter, Github } from "lucide-react";
import Container from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";

// === CONFIGURATION – change these values to update site information ===
const SITE_NAME = "goshomik";
const BASE_URL = "https://goshomik.com";
const EMAIL = "hello@travelblog.com"; // Replace with actual email if desired
const WHATSAPP_NUMBER = "+8801681563383";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;
const LOCATION = "11 East Goran, Khilgaon, Dhaka – 1219, Bangladesh";
// ======================================================================

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch via email, WhatsApp, or social media. I'd love to hear from you about collaborations, questions, travel tips, or just to say hello.",
  openGraph: {
    title: "Contact | goshomik",
    description: "Get in touch via email, WhatsApp, or social media.",
    url: `${BASE_URL}/contact`,
  },
};

export default function ContactPage() {
  // Structured data for ContactPage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact goshomik",
    description:
      "Get in touch with the travel blogger via email, WhatsApp, or social media.",
    url: `${BASE_URL}/contact`,
    mainEntity: {
      "@type": "Person",
      name: "Rakib", // Assuming author name from social links
      email: EMAIL,
      telephone: WHATSAPP_NUMBER,
      address: {
        "@type": "PostalAddress",
        streetAddress: LOCATION.split(",")[0],
        addressLocality: "Dhaka",
        addressRegion: "Dhaka",
        postalCode: "1219",
        addressCountry: "BD",
      },
      sameAs: [
        "https://instagram.com/codeswithrakib",
        "https://x.com/codeswithrakib",
        "https://github.com/codeswithrakib",
      ],
    },
  };

  return (
    <>
      <Container className="max-w-4xl py-16">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-6 border-accent/20 bg-accent/5 text-accent-foreground"
          >
            Contact
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Get in touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I&apos;d love to hear from you. For collaborations, questions,
            travel tips, or just to say hello.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Email Card */}
          <Card className="text-center hover:border-foreground/20 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-accent-foreground" />
              </div>
              <h2 className="text-lg font-medium mb-2">Email</h2>
              <Button
                variant="link"
                className="p-0 h-auto text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link href={`mailto:${EMAIL}`}>{EMAIL}</Link>
              </Button>
              <p className="text-sm text-muted-foreground/70 mt-2">
                Reply within 24-48h
              </p>
            </CardContent>
          </Card>

          {/* WhatsApp Card */}
          <Card className="text-center hover:border-foreground/20 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-accent-foreground" />
              </div>
              <h2 className="text-lg font-medium mb-2">WhatsApp</h2>
              <Button
                variant="link"
                className="p-0 h-auto text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {WHATSAPP_NUMBER}
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground/70 mt-2">
                Available 9am-6pm GMT+6
              </p>
            </CardContent>
          </Card>

          {/* Location Card */}
          <Card className="text-center hover:border-foreground/20 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-accent-foreground" />
              </div>
              <h2 className="text-lg font-medium mb-2">Current location</h2>
              <address className="not-italic text-foreground">
                {LOCATION}
              </address>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 bg-muted/30">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-light mb-6">
                Find me on social media
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-3 bg-background hover:bg-accent hover:text-accent-foreground border-border transition-all"
                  asChild
                >
                  <Link
                    href="https://instagram.com/codeswithrakib"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="h-5 w-5" />
                    @codeswithrakib
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-3 bg-background hover:bg-accent hover:text-accent-foreground border-border transition-all"
                  asChild
                >
                  <Link
                    href="https://x.com/codeswithrakib"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-5 w-5" />
                    @codeswithrakib
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-3 bg-background hover:bg-accent hover:text-accent-foreground border-border transition-all"
                  asChild
                >
                  <Link
                    href="https://github.com/codeswithrakib"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                    @codeswithrakib
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        <div className="text-center">
          <p className="text-muted-foreground">
            Prefer instant replies?{" "}
            <span className="font-medium text-foreground">
              WhatsApp is fastest.
            </span>
          </p>
          <p className="text-sm text-muted-foreground/70 mt-2">
            For business inquiries only:{" "}
            <Link href={`mailto:${EMAIL}`} className="hover:underline">
              {EMAIL}
            </Link>
          </p>
        </div>
      </Container>

      {/* Structured data for SEO */}
      <Script
        id="contact-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
