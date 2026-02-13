import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Twitter, Instagram, Github } from "lucide-react";
import Container from "../ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    {
      href: "https://x.com/codeswithrakib",
      icon: Twitter,
      label: "Twitter/X",
    },
    {
      href: "https://instagram.com/codeswithrakib",
      icon: Instagram,
      label: "Instagram",
    },
    {
      href: "https://github.com/codeswithrakib",
      icon: Github,
      label: "GitHub",
    },
  ];

  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="py-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <p className="text-xs text-muted-foreground order-2 md:order-1">
              © {currentYear} Travelora. All rights reserved.
            </p>

            <div className="flex items-center gap-4 order-1 md:order-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
