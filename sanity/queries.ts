import { groq } from "next-sanity";

export const postFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "mainImage": mainImage {
    asset->,
    alt
  },
  author-> {
    name,
    image
  },
  categories[]-> {
    title
  }
`;

export const homePostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...6] {
    ${postFields}
  }
`;

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    ${postFields}
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const paginatedPostsQuery = groq`
  *[_type == "post"]
  | order(publishedAt desc)[$start...$end] {
    ${postFields}
  }
`;
