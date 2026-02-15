import { groq } from 'next-sanity';

// Query to get all posts (Weekly Updates)
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title_zh,
  title_en,
  "slug": slug.current,
  category,
  publishedAt,
  excerpt_zh,
  excerpt_en,
  mainImage
}`;

// Query to get a single post by ID
export const postByIdQuery = groq`*[_type == "post" && _id == $id][0] {
  _id,
  title_zh,
  title_en,
  category,
  publishedAt,
  body_zh,
  body_en,
  mainImage
}`;

// Query to get all gallery items
export const galleryQuery = groq`*[_type == "gallery"] | order(eventDate desc) {
  _id,
  title_zh,
  title_en,
  type,
  category,
  image,
  videoUrl,
  eventDate
}`;
