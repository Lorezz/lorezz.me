import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const pages = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content', pattern: 'pages.json' }),
	// Type-check frontmatter using a schema
	schema: () =>
			z.array(z.object({
			title: z.string(),
			slug: z.string(),
			categories: z.array(z.string()).optional(),
			body: z.string(),
		})),
});


const categories = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content', pattern: 'cats.json' }),
	// Type-check frontmatter using a schema
	schema: () =>
		z.array(z.object({
			title: z.string(),
			slug: z.string(),
		})),
});

export const collections = { blog,pages,categories };
