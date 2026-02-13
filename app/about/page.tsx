import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MapPin, Camera, BookOpen } from "lucide-react";
import Container from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about the person behind the travels and the story of this blog.",
};

export default function AboutPage() {
  return (
    <Container className="max-w-4xl py-16">
      <div className="text-center mb-12">
        <Badge
          variant="outline"
          className="mb-6 border-border text-muted-foreground"
        >
          About
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
          Hello, I&apos;m Ashiqur Rahaman
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Completed BSc Engineering from Dhaka University. Designer, traveler,
          and storyteller based between Lisbon and Southeast Asia.
        </p>
      </div>

      <Card className="mb-12">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-2 border-border">
              <AvatarImage src="/profile.jpeg" />
              <AvatarFallback className="text-4xl bg-muted text-muted-foreground">
                A
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-light mb-4">Ashiqur Rahaman</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>11 East Goran, Khilgaon, Dhaka – 1219, Bangladesh</span>
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
                This blog started in 2020 as a personal journal to document slow
                travel, local food, and unexpected detours. What began as a way
                to share stories with friends and family has grown into a
                community of fellow travelers who believe in wandering with
                purpose.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-light mb-6 text-center">
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
            <Card key={item.title}>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      <div className="text-center">
        <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
          &quot;Thanks for being here. Hope these stories inspire you to take
          the road less traveled, embrace the unknown, and write your own
          adventures.&quot;
        </p>
        <p className="text-foreground font-medium mt-6">— Ashiqur Rahman</p>
      </div>
    </Container>
  );
}
