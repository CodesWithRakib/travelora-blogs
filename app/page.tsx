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
      {/* Hero */}
      <section className="border-b border-border">
        <Container className="py-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Badge
                variant="outline"
                className="w-fit px-4 py-1.5 text-xs font-medium uppercase tracking-wider border-border text-muted-foreground"
              >
                <Compass className="w-3.5 h-3.5 mr-1.5 inline-block" />
                Travel Stories
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-foreground">
                  Exploring the world,
                  <br />
                  <span className="font-normal">one story at a time.</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Personal travel journal documenting adventures, local
                  cultures, hidden gems, and unexpected moments from the road.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-foreground text-background hover:bg-foreground/90  px-8 rounded-full"
                >
                  <Link href="/blog">
                    Start Reading
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full px-8"
                >
                  <Link href="/about">About Me</Link>
                </Button>
              </div>
            </div>

            {/* Quote box */}
            <div className="hidden lg:flex flex-col items-center justify-center">
              <div className="border border-border p-8 max-w-xs">
                <p className="text-4xl font-light text-foreground mb-4">
                  &quot;
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Not all those who wander are lost, but some of us are just
                  really bad at reading maps.
                </p>
                <p className="text-xs text-muted-foreground/60 mt-4">
                  — 20+ countries explored
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Latest Posts */}
      <section className="py-20 bg-background">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div className="space-y-4 max-w-2xl">
              <Badge
                variant="outline"
                className="w-fit px-4 py-1.5 text-xs font-medium uppercase tracking-wider border-border text-muted-foreground"
              >
                Recent adventures
              </Badge>
              <h2 className="text-3xl md:text-4xl font-light text-foreground">
                Latest stories from the road
              </h2>
              <p className="text-muted-foreground">
                Fresh perspectives and recent discoveries from my travels
              </p>
            </div>
            <Button
              variant="ghost"
              asChild
              className="group gap-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-none px-4"
            >
              <Link href="/blog">
                View all posts
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <Card
                  key={post._id}
                  className="group hover:border-foreground/20 transition-colors p-0 overflow-hidden"
                >
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="relative aspect-[16/9] border-b border-border bg-muted overflow-hidden">
                      {post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage)
                            .width(600)
                            .height(338)
                            .quality(90)
                            .url()}
                          alt={post.mainImage.alt || post.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          priority={index < 3}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <MapPin className="h-12 w-12 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
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

                      <h3 className="text-xl font-medium leading-tight text-foreground group-hover:text-muted-foreground transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    </CardContent>

                    <CardFooter className="p-6 pt-0 border-t border-border">
                      {post.author && (
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-border">
                            {post.author.image ? (
                              <AvatarImage
                                src={urlFor(post.author.image)
                                  .width(32)
                                  .height(32)
                                  .url()}
                                alt={post.author.name}
                              />
                            ) : null}
                            <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                              {post.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-foreground">
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
            <div className="text-center py-20 border border-border bg-muted">
              <Compass className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground mb-2">No posts yet</p>
              <p className="text-sm text-muted-foreground/70">
                Check back soon for new travel stories!
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
