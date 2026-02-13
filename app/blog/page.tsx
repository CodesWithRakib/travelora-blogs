import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { paginatedPostsQuery } from "@/sanity/queries";
import { PostPreview } from "@/types/sanity";
import Container from "@/components/ui/Container";
import BlogList from "./components/BlogList ";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "All Blog Posts",
  description:
    "Read all travel stories, adventures, and reflections from around the world.",
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

  return (
    <Container>
      <BlogList initialPosts={initialPosts} />
    </Container>
  );
}
