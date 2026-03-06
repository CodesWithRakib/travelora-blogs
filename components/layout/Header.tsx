// components/layout/Header.tsx
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

// === CONFIGURATION – change this value to update site name everywhere ===
const SITE_NAME = "goshomik";
// ========================================================================

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
            aria-label={`${SITE_NAME} homepage`}
          >
            <span className="text-xl font-light tracking-tight text-foreground">
              {SITE_NAME}
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
                    "relative px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-foreground after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-foreground after:rounded-full"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                  )}
                  aria-current={isActive ? "page" : undefined}
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
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:w-80 p-0">
              <div className="flex flex-col h-full">
                <div className="border-b px-6 py-4">
                  <SheetTitle className="text-left text-xl font-light tracking-tight">
                    {SITE_NAME}
                  </SheetTitle>
                </div>

                <nav className="flex-1 px-4 py-8">
                  <div className="space-y-1">
                    {navItems.map((item) => {
                      const isActive = isActiveRoute(item.href);
                      return (
                        <SheetTrigger asChild key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors",
                              isActive
                                ? "bg-accent text-accent-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                            )}
                            aria-current={isActive ? "page" : undefined}
                          >
                            {item.label}
                          </Link>
                        </SheetTrigger>
                      );
                    })}
                    <SheetTrigger asChild>
                      <Link
                        href="/"
                        className={cn(
                          "flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors md:hidden",
                          pathname === "/"
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                        )}
                        aria-current={pathname === "/" ? "page" : undefined}
                      >
                        Home
                      </Link>
                    </SheetTrigger>
                  </div>
                </nav>

                <div className="border-t px-6 py-4">
                  <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} {SITE_NAME}
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
