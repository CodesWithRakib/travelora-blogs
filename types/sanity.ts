import { ImageAsset, Slug } from "sanity";
import { PortableTextBlock } from "@portabletext/react";
export interface Author {
  _id: string;
  name: string;
  slug: Slug;
  image?: ImageAsset;
  bio?: PortableTextBlock[];
}

export interface Category {
  _id: string;
  title: string;
  slug: Slug;
  description?: string;
}

export interface Post {
  _id: string;
  _type: "post";
  title: string;
  slug: Slug;
  author?: Author;
  mainImage?: {
    asset: ImageAsset;
    alt: string;
  };
  excerpt: string;
  categories?: Category[];
  publishedAt: string;
  body: PortableTextBlock[];
}

export interface PostPreview {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  mainImage?: {
    asset: ImageAsset;
    alt: string;
  };
  author?: {
    name: string;
    image?: ImageAsset;
  };
  categories?: {
    title: string;
  }[];
}
