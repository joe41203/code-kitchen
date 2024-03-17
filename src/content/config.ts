import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
  schema: ({ image }) => z.object({
    title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
    cover: image(),
    tags: z.array(z.string()).optional(),
    index: z.number()
  }),
});

export const collections = { articles };
