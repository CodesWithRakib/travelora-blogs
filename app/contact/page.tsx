import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Instagram, Twitter, Github } from "lucide-react";
import Container from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch via email, WhatsApp, or social media.",
};

export default function ContactPage() {
  return (
    <Container className="max-w-4xl py-16 ">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-6">
          Contact
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
          Get in touch
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          I&apos;d love to hear from you. For collaborations, questions, travel
          tips, or just to say hello.
        </p>
      </div>

      {/* Contact Cards - 3 column grid on desktop */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Email Card */}
        <Card className="text-center hover:shadow-md transition">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-gray-700" />
            </div>
            <h2 className="text-lg font-medium mb-2">Email</h2>
            <Button
              variant="link"
              className="p-0 h-auto text-gray-600 hover:text-gray-900"
              asChild
            >
              <Link href="mailto:hello@travelblog.com">
                hello@travelblog.com
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-2">Reply within 24-48h</p>
          </CardContent>
        </Card>

        {/* WhatsApp Card */}
        <Card className="text-center hover:shadow-md transition">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-gray-700" />
            </div>
            <h2 className="text-lg font-medium mb-2">WhatsApp</h2>
            <Button
              variant="link"
              className="p-0 h-auto text-gray-600 hover:text-gray-900"
              asChild
            >
              <Link href="https://wa.me/351912345678" target="_blank">
                +351 912 345 678
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-2">Available 9am-6pm GMT</p>
          </CardContent>
        </Card>

        {/* Location Card */}
        <Card className="text-center hover:shadow-md transition">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-gray-700" />
            </div>
            <h2 className="text-lg font-medium mb-2">Current location</h2>
            <p className="text-gray-900">Lisbon, Portugal</p>
            <p className="text-sm text-gray-500 mt-2">
              Next: Bali • March 2024
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Social Media Section */}
      <div className="max-w-2xl mx-auto">
        <Card className="border-0 bg-gray-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-light mb-6">
              Find me on social media
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className="gap-3 bg-white hover:bg-gray-50"
                asChild
              >
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                  @travelblog
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-3 bg-white hover:bg-gray-50"
                asChild
              >
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                  @travelblog
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-3 bg-white hover:bg-gray-50"
                asChild
              >
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                  @travelblog
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-12" />

      {/* Quick Response Footer */}
      <div className="text-center">
        <p className="text-gray-600">
          Prefer instant replies?{" "}
          <span className="font-medium text-gray-900">
            WhatsApp is fastest.
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          For business inquiries only: hello@travelblog.com
        </p>
      </div>
    </Container>
  );
}
