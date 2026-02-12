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
          <div className="relative aspect-[16/9] w-full bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={urlFor(value.asset).width(1200).height(675).url()}
              alt={value.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-sm text-gray-500 mt-2 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-light mt-12 mb-4 text-gray-900">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <>
        <h2 className="text-2xl md:text-3xl font-light mt-12 mb-4 text-gray-900">
          {children}
        </h2>
        <Separator className="mb-8" />
      </>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-light mt-10 mb-3 text-gray-900">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-medium mt-8 mb-2 text-gray-900">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 md:pl-6 py-2 my-8 text-gray-600 italic">
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
            className="text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900 transition"
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
          className="text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900 transition"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-gray-900">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-900">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-gray-700">{children}</li>,
    number: ({ children }) => <li className="text-gray-700">{children}</li>,
  },
};
