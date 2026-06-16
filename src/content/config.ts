import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    date: z.coerce.date().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
