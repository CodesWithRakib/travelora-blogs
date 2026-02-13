// Footer.tsx
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
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Brand Section */}
            <div className="md:col-span-5 lg:col-span-6">
              <Link
                href="/"
                className="inline-block transition-opacity hover:opacity-80"
              >
                <h3 className="text-lg font-light tracking-tight">Travelora</h3>
              </Link>
              <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
                Personal travel journal documenting adventures, local cultures,
                hidden gems, and unexpected moments from the road.
              </p>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3 lg:col-span-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Navigation
              </h4>
              <ul className="mt-4 space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="md:col-span-4 lg:col-span-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Follow
              </h4>
              <div className="mt-4 flex items-center gap-4">
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

          <Separator className="my-8 md:my-12" />

          {/* Copyright */}
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Travelora. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
