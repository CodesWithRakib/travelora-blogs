import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, ArrowRight } from "lucide-react";
import { PostPreview } from "@/types/sanity";
import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import Container from "@/components/ui/Container";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "All Blog Posts",
  description:
    "Read all travel stories, adventures, and reflections from around the world.",
};

async function getPosts(): Promise<PostPreview[]> {
  return await client.fetch(allPostsQuery);
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <Container>
      {/* Header */}
      <div className="py-16 md:py-20 text-center md:text-left">
        <Badge variant="secondary" className="mb-6">
          Blog
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
          All stories
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto md:mx-0">
          A collection of travel stories, reflections, and adventures from the
          road.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="pb-20">
        {posts.length > 0 ? (
          <div className="space-y-12">
            {posts.map((post, index) => (
              <article key={post._id} className="group">
                <div className="grid md:grid-cols-12 gap-8">
                  {/* Image */}
                  <div className="md:col-span-5 lg:col-span-4">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative aspect-[16/9] md:aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                        {post.mainImage && (
                          <Image
                            src={urlFor(post.mainImage)
                              .width(600)
                              .height(450)
                              .url()}
                            alt={post.mainImage.alt || post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-500"
                            sizes="(min-width: 768px) 40vw, 100vw"
                            priority={index < 3}
                          />
                        )}
                      </div>
                    </Link>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-7 lg:col-span-8">
                    <div className="flex flex-col h-full justify-center">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </time>
                      </div>

                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-gray-600 transition"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between flex-wrap gap-4">
                        {post.author && (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              {post.author.image && (
                                <AvatarImage
                                  src={urlFor(post.author.image)
                                    .width(32)
                                    .height(32)
                                    .url()}
                                />
                              )}
                              <AvatarFallback>
                                {post.author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">
                              {post.author.name}
                            </span>
                          </div>
                        )}

                        <Button variant="ghost" asChild className="group">
                          <Link href={`/blog/${post.slug}`} className="gap-2">
                            Read full story
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </Container>
  );
}
