import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock } from "lucide-react";
import { Post } from "@/types/sanity";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import Container from "@/components/ui/Container";
import { RichText } from "@/components/sanity/RichText";

export const revalidate = 60;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getPost(slug: string): Promise<Post | null> {
  return await client.fetch(postBySlugQuery, { slug });
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(postSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [imageUrl] : [],
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const readingTime = Math.ceil(
    post.body.reduce((acc, block) => {
      if (block._type === "block" && block.children) {
        return (
          acc +
          block.children.reduce(
            (sum, child) => sum + (child.text?.split(" ").length || 0),
            0,
          )
        );
      }
      return acc;
    }, 0) / 200,
  );

  return (
    <article className="pb-20">
      {post.mainImage && (
        <div className="relative h-[60vh] min-h-[500px] w-full bg-muted">
          <Image
            src={urlFor(post.mainImage).width(2000).height(1200).url()}
            alt={post.mainImage.alt || post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
      )}

      <Container className="max-w-3xl -mt-32 relative z-10">
        <div className="bg-background border border-border p-8 md:p-12">
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category) => (
                <Badge
                  key={category.title}
                  variant="outline"
                  className="border-border"
                >
                  {category.title}
                </Badge>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {post.author && (
            <>
              <Separator className="my-6" />
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border border-border">
                  {post.author.image && (
                    <AvatarImage
                      src={urlFor(post.author.image).width(48).height(48).url()}
                    />
                  )}
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">
                    {post.author.name}
                  </p>
                  <p className="text-sm text-muted-foreground">Author</p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-12 p-8 bg-muted border-l-4 border-foreground/20">
          <p className="text-xl text-muted-foreground italic leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-12 prose prose-lg max-w-none prose-custom">
          <PortableText value={post.body} components={RichText} />
        </div>
      </Container>
    </article>
  );
}
