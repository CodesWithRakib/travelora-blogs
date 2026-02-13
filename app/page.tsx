// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, ArrowRight, MapPin, Compass } from "lucide-react";
import { PostPreview } from "@/types/sanity";
import { client } from "@/sanity/lib/client";
import { homePostsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import Container from "@/components/ui/Container";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";

export const revalidate = 60;

async function getPosts(): Promise<PostPreview[]> {
  return await client.fetch(homePostsQuery);
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white border-b">
        <Container className="py-16 ">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge
                variant="secondary"
                className="w-fit px-4 py-1.5 text-xs font-medium uppercase tracking-wider"
              >
                <Compass className="w-3.5 h-3.5 mr-1.5 inline-block" />
                Travel Stories
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
                Exploring the world,
                <br />
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  one story at a time.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Personal travel journal documenting adventures, local cultures,
                hidden gems, and unexpected moments from the road.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild className="group">
                  <Link href="/blog">
                    Start Reading
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">About Me</Link>
                </Button>
              </div>
            </div>

            {/* Decorative element for larger screens */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full animate-pulse" />
                <div className="absolute inset-4 bg-white rounded-full shadow-xl flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Latest Posts */}
      <section className="py-10 bg-white">
        <Container>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div className="space-y-4">
              <Badge
                variant="outline"
                className="w-fit px-4 py-1.5 text-xs font-medium uppercase tracking-wider"
              >
                Recent adventures
              </Badge>
              <h2 className="text-3xl md:text-4xl font-light">
                Latest stories from the road
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Fresh perspectives and recent discoveries from my travels
              </p>
            </div>
            <Button variant="ghost" asChild className="group gap-2">
              <Link href="/blog">
                View all posts
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
            </Button>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <Card
                  key={post._id}
                  className="group overflow-hidden border-0 bg-white  transition-all duration-300 p-0"
                >
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    {/* Image Container */}
                    <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200">
                      {post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage)
                            .width(600)
                            .height(338)
                            .quality(90)
                            .url()}
                          alt={post.mainImage.alt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-700"
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          priority={index < 3}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <MapPin className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                    </div>

                    {/* Content - Removed default padding from CardContent */}
                    <CardContent className="p-6">
                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4 shrink-0" />
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

                      {/* Title */}
                      <h3 className="text-xl font-medium leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    </CardContent>

                    {/* Footer - Removed default padding from CardFooter */}
                    <CardFooter className="p-6 pt-0">
                      {post.author && (
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 ring-2 ring-background">
                            {post.author.image ? (
                              <AvatarImage
                                src={urlFor(post.author.image)
                                  .width(32)
                                  .height(32)
                                  .url()}
                                alt={post.author.name}
                              />
                            ) : null}
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {post.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {post.author.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Traveler & Writer
                            </span>
                          </div>
                        </div>
                      )}
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <Compass className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg text-muted-foreground mb-2">No posts yet</p>
              <p className="text-sm text-muted-foreground">
                Check back soon for new travel stories!
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
