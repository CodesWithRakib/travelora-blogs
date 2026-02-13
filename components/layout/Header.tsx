// Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Container from "../ui/Container";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActiveRoute = (href: string) => {
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-75"
          >
            <span className="text-xl font-light tracking-tight text-foreground">
              Travelora
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => {
              const isActive = isActiveRoute(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                    isActive
                      ? "text-foreground after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-foreground after:rounded-full after:content-['']"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 hover:bg-accent"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:w-80 p-0">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                  <SheetTitle className="text-xl font-light tracking-tight">
                    Travelora
                  </SheetTitle>
                  {/* shadcn's built-in close icon is automatically added here */}
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-8">
                  <div className="space-y-1">
                    {navItems.map((item) => {
                      const isActive = isActiveRoute(item.href);
                      return (
                        <SheetTrigger asChild key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center px-4 py-3.5 text-base font-medium rounded-lg transition-all duration-200",
                              isActive
                                ? "bg-accent text-foreground border-l-4 border-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/70",
                            )}
                          >
                            {item.label}
                          </Link>
                        </SheetTrigger>
                      );
                    })}
                  </div>

                  {/* Quick Links */}
                  <div className="mt-12 pt-8 border-t">
                    <p className="px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground/70 mb-3">
                      Quick links
                    </p>
                    <div className="space-y-1">
                      <Link
                        href="/"
                        className={cn(
                          "flex items-center px-4 py-3 text-sm rounded-lg transition-colors",
                          pathname === "/"
                            ? "bg-accent text-foreground border-l-4 border-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/70",
                        )}
                      >
                        Home
                      </Link>
                    </div>
                  </div>
                </nav>

                {/* Footer */}
                <div className="border-t px-6 py-4">
                  <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Travelora
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
