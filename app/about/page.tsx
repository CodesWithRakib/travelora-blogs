// app/about/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MapPin, Camera, BookOpen } from "lucide-react";
import Container from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";

// === CONFIGURATION – change these values to update site information ===
const SITE_NAME = "goshomik";
const BASE_URL = "https://goshomik.com";
const AUTHOR_NAME = "Ashiqur Rahaman";
const AUTHOR_LOCATION = "11 East Goran, Khilgaon, Dhaka – 1219, Bangladesh";
// ======================================================================

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about the person behind the travels and the story of this blog. Meet Ashiqur Rahaman, a designer, traveler, and storyteller.",
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description:
      "Learn more about the person behind the travels and the story of this blog.",
    url: `${BASE_URL}/about`,
  },
};

export default function AboutPage() {
  // Structured data for AboutPage and Person
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: `About ${SITE_NAME}`,
        description: metadata.description,
        url: `${BASE_URL}/about`,
        mainEntity: {
          "@type": "Person",
          name: AUTHOR_NAME,
          description:
            "Completed BSc Engineering from Dhaka University. Designer, traveler, and storyteller based between Lisbon and Southeast Asia.",
          address: {
            "@type": "PostalAddress",
            streetAddress: AUTHOR_LOCATION.split(",")[0],
            addressLocality: "Dhaka",
            addressRegion: "Dhaka",
            postalCode: "1219",
            addressCountry: "BD",
          },
          knowsAbout: ["Travel", "Photography", "Design", "Storytelling"],
          countryVisited: "20+ countries",
        },
      },
    ],
  };

  return (
    <>
      <Container className="max-w-4xl py-16">
        {/* Header Section */}
        <section aria-labelledby="about-heading" className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-6 border-accent/20 bg-accent/5 text-accent-foreground"
          >
            About
          </Badge>
          <h1
            id="about-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-6"
          >
            Hello, I&apos;m {AUTHOR_NAME}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Completed BSc Engineering from Dhaka University. Designer, traveler,
            and storyteller based between Lisbon and Southeast Asia.
          </p>
        </section>

        {/* Profile Card */}
        <Card className="mb-12 hover:border-foreground/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <Avatar className="h-32 w-32 md:h-40 md:w-40 border-2 border-border">
                <AvatarImage
                  src="/profile.jpeg"
                  alt={`${AUTHOR_NAME} profile picture`}
                />
                <AvatarFallback className="text-4xl bg-muted text-muted-foreground">
                  {AUTHOR_NAME.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-light mb-4">{AUTHOR_NAME}</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <address className="not-italic">{AUTHOR_LOCATION}</address>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Camera className="h-4 w-4" />
                    <span>Photographer</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>20+ countries</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  This blog started in 2020 as a personal journal to document
                  slow travel, local food, and unexpected detours. What began as
                  a way to share stories with friends and family has grown into
                  a community of fellow travelers who believe in wandering with
                  purpose.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Travel Philosophy Section */}
        <section aria-labelledby="philosophy-heading" className="mb-12">
          <h2
            id="philosophy-heading"
            className="text-2xl md:text-3xl font-light mb-6 text-center"
          >
            Travel philosophy
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Slow down",
                text: "I believe in traveling slowly, staying longer in places that resonate, and leaving destinations better than I found them.",
              },
              {
                title: "Stay curious",
                text: "No rushed itineraries, no tourist traps — just genuine curiosity and openness to whatever comes.",
              },
              {
                title: "Connect locally",
                text: "Shopping at local markets, eating where locals eat, and having conversations with strangers who become friends.",
              },
              {
                title: "Share stories",
                text: "Documenting not just the highlights, but the messy, beautiful, unexpected moments that make travel meaningful.",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="hover:border-foreground/20 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Quote Section */}
        <section aria-label="Personal quote" className="text-center">
          <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
            &quot;Thanks for being here. Hope these stories inspire you to take
            the road less traveled, embrace the unknown, and write your own
            adventures.&quot;
          </p>
          <p className="text-foreground font-medium mt-6">— {AUTHOR_NAME}</p>
        </section>
      </Container>

      {/* Structured data for SEO */}
      <Script
        id="about-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
