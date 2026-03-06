// components/sanity/RichText.tsx
import Image from "next/image";
import Link from "next/link";
import { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Separator } from "@/components/ui/separator";

interface ImageValue {
  asset: SanityImageSource;
  alt?: string;
  caption?: string;
}

export const RichText: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      return (
        <figure className="my-8 md:my-12">
          <div className="relative aspect-[16/9] w-full bg-muted rounded-lg overflow-hidden">
            <Image
              src={urlFor(value.asset).width(1200).height(675).url()}
              alt={value.alt || ""}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-sm text-muted-foreground mt-2 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-light mt-12 mb-4 text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <>
        <h2 className="text-2xl md:text-3xl font-light mt-12 mb-4 text-foreground">
          {children}
        </h2>
        <Separator className="mb-8 bg-border" />
      </>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-light mt-10 mb-3 text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-medium mt-8 mb-2 text-foreground">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent/20 pl-4 md:pl-6 py-2 my-8 text-muted-foreground italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value?.href?.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      const href = value?.href || "#";

      if (href.startsWith("/")) {
        return (
          <Link
            href={href}
            className="text-foreground underline decoration-border underline-offset-2 hover:decoration-accent transition"
          >
            {children}
          </Link>
        );
      }

      return (
        <a
          href={href}
          rel={rel}
          target="_blank"
          className="text-foreground underline decoration-border underline-offset-2 hover:decoration-accent transition"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-muted-foreground">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-muted-foreground">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-muted-foreground">{children}</li>
    ),
  },
};
