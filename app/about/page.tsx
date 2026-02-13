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
      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-6">
          About
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
          Hello, I&apos;m Alex
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Designer, traveler, and storyteller based between Lisbon and Southeast
          Asia.
        </p>
      </div>

      {/* Profile Card */}
      <Card className="mb-12">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <Avatar className="h-32 w-32 md:h-40 md:w-40">
              <AvatarImage src="/profile.jpeg" />
              <AvatarFallback className="text-4xl">A</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-light mb-4">Alex Rivera</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>Lisbon / Bali</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Camera className="h-4 w-4" />
                  <span>Photographer</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookOpen className="h-4 w-4" />
                  <span>20+ countries</span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
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

      {/* Travel Philosophy */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-light mb-6 text-center">
          Travel philosophy
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-3">Slow down</h3>
              <p className="text-gray-600">
                I believe in traveling slowly, staying longer in places that
                resonate, and leaving destinations better than I found them.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-3">Stay curious</h3>
              <p className="text-gray-600">
                No rushed itineraries, no tourist traps — just genuine curiosity
                and openness to whatever comes.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-3">Connect locally</h3>
              <p className="text-gray-600">
                Shopping at local markets, eating where locals eat, and having
                conversations with strangers who become friends.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-3">Share stories</h3>
              <p className="text-gray-600">
                Documenting not just the highlights, but the messy, beautiful,
                unexpected moments that make travel meaningful.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Closing */}
      <div className="text-center">
        <p className="text-lg text-gray-600 italic max-w-2xl mx-auto">
          &quot;Thanks for being here. Hope these stories inspire you to take
          the road less traveled, embrace the unknown, and write your own
          adventures.&Quot;
        </p>
        <p className="text-gray-900 font-medium mt-6">— Alex</p>
      </div>
    </Container>
  );
}
