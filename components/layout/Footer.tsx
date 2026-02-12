import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Twitter, Instagram, Github } from "lucide-react";
import Container from "../ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-light mb-4">Travelora</h3>
              <p className="text-sm text-gray-600 max-w-md">
                Personal travel journal documenting adventures, local cultures,
                hidden gems, and unexpected moments from the road.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/blog" className="hover:text-gray-900 transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-gray-900 transition"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-gray-900 transition"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">Follow</h4>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 transition"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 transition"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 transition"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <p className="text-sm text-gray-500 text-center">
            © {currentYear} Travelora. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
