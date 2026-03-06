// app/blog/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import { client } from "@/sanity/lib/client";
import { paginatedPostsQuery } from "@/sanity/queries";
import { PostPreview } from "@/types/sanity";
import Container from "@/components/ui/Container";
import BlogList from "./components/BlogList ";
import { urlFor } from "@/sanity/lib/image";

// === CONFIGURATION – change these values to update site information ===
const SITE_NAME = "goshomik";
const BASE_URL = "https://goshomik.com";
// ======================================================================

export const revalidate = 60;

export const metadata: Metadata = {
  title: "All Blog Posts",
  description:
    "Read all travel stories, adventures, and reflections from around the world.",
  openGraph: {
    title: `All Blog Posts | ${SITE_NAME}`,
    description:
      "Read all travel stories, adventures, and reflections from around the world.",
    url: `${BASE_URL}/blog`,
  },
};

const POSTS_PER_PAGE = 6;

async function getInitialPosts(): Promise<PostPreview[]> {
  return await client.fetch(paginatedPostsQuery, {
    start: 0,
    end: POSTS_PER_PAGE,
  });
}

export default async function BlogPage() {
  const initialPosts = await getInitialPosts();

  // Structured data for the blog listing page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    description: metadata.description,
    url: `${BASE_URL}/blog`,
    blogPost: initialPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${BASE_URL}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      description: post.excerpt,
      ...(post.mainImage && {
        image: {
          "@type": "ImageObject",
          url: urlFor(post.mainImage).width(1200).url(),
        },
      }),
      author: post.author
        ? {
            "@type": "Person",
            name: post.author.name,
          }
        : undefined,
    })),
  };

  return (
    <>
      <main>
        <Container>
          <BlogList initialPosts={initialPosts} />
        </Container>
      </main>

      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
