// app/blog/components/BlogList.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import { PostPreview } from "@/types/sanity";
import { client } from "@/sanity/lib/client";
import { paginatedPostsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";

// === CONFIGURATION – change this to update site name ===
const SITE_NAME = "goshomik";
// =======================================================

const POSTS_PER_PAGE = 6;

interface Props {
  initialPosts: PostPreview[];
}

export default function BlogList({ initialPosts }: Props) {
  const [posts, setPosts] = useState<PostPreview[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    initialPosts.length === POSTS_PER_PAGE,
  );

  const loadMore = async () => {
    setLoading(true);
    const newPosts: PostPreview[] = await client.fetch(paginatedPostsQuery, {
      start: posts.length,
      end: posts.length + POSTS_PER_PAGE,
    });
    setPosts((prev) => [...prev, ...newPosts]);
    setHasMore(newPosts.length === POSTS_PER_PAGE);
    setLoading(false);
  };

  return (
    <section aria-labelledby="blog-heading" className="py-16">
      {/* Header */}
      <header className="text-center md:text-left mb-16">
        <Badge
          variant="outline"
          className="mb-6 border-accent/20 bg-accent/5 text-accent-foreground"
        >
          Blog
        </Badge>
        <h1
          id="blog-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-light mb-6"
        >
          All stories
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0">
          A collection of travel stories, reflections, and adventures from the
          road.
        </p>
      </header>

      {/* Posts List */}
      <div className="pb-20 space-y-12">
        {posts.map((post, index) => (
          <article
            key={post._id}
            className="group animate-in fade-in slide-in-from-bottom-4 duration-700"
            aria-labelledby={`post-title-${post._id}`}
          >
            <div className="grid md:grid-cols-12 gap-8">
              {/* Image Column */}
              <div className="md:col-span-5 lg:col-span-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                  aria-labelledby={`post-title-${post._id}`}
                >
                  <div className="relative aspect-[16/9] md:aspect-[4/3] bg-muted rounded-lg overflow-hidden border border-border">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage)
                          .width(600)
                          .height(450)
                          .quality(90)
                          .url()}
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 768px) 40vw, 100vw"
                        priority={index < 3} // lazy load others
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                        <span>No image</span>
                      </div>
                    )}
                  </div>
                </Link>
              </div>

              {/* Content Column */}
              <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>

                <h2
                  id={`post-title-${post._id}`}
                  className="text-2xl md:text-3xl lg:text-4xl font-light mb-4"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-muted-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  {post.author && (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border border-border">
                        {post.author.image && (
                          <AvatarImage
                            src={urlFor(post.author.image)
                              .width(32)
                              .height(32)
                              .url()}
                            alt={post.author.name}
                          />
                        )}
                        <AvatarFallback className="bg-muted text-muted-foreground">
                          {post.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {post.author.name}
                      </span>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    asChild
                    className="gap-2 hover:bg-accent hover:text-accent-foreground"
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      aria-label={`Read full story: ${post.title}`}
                    >
                      Read full story
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center pt-10">
            <Button
              onClick={loadMore}
              disabled={loading}
              variant="outline"
              className="border-border hover:bg-accent hover:text-accent-foreground transition-all min-w-[200px]"
              aria-label="Load more blog posts"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}