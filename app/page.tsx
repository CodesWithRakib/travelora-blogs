import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, ArrowRight } from "lucide-react";
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
      <section className="bg-gray-50 border-b">
        <Container className="py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center md:text-left md:mx-0">
            <Badge variant="secondary" className="mb-6">
              Travel Stories
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
              Exploring the world,
              <br />
              one story at a time.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Personal travel journal documenting adventures, local cultures,
              hidden gems, and unexpected moments from the road.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/blog">Start Reading</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">About Me</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Latest Posts */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <Badge variant="secondary" className="mb-4">
                Recent
              </Badge>
              <h2 className="text-3xl md:text-4xl font-light">
                Latest stories
              </h2>
            </div>
            <Button variant="ghost" asChild className="group">
              <Link href="/blog" className="gap-2">
                View all
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
            </Button>
          </div>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <Card
                  key={post._id}
                  className="overflow-hidden group hover:shadow-lg transition"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-[16/9] bg-gray-100">
                      {post.mainImage && (
                        <Image
                          src={urlFor(post.mainImage)
                            .width(600)
                            .height(338)
                            .url()}
                          alt={post.mainImage.alt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          priority={index < 3}
                        />
                      )}
                    </div>
                    <CardContent className="p-6">
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
                      <h3 className="text-xl font-medium leading-tight mb-2 group-hover:text-gray-600 transition">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
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
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No posts yet. Check back soon!</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
