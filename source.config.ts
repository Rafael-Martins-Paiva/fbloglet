import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    providerImportSource: "@/mdx-components",
  },
});

export const { docs: blogDocs, meta: blogMeta } = defineDocs({
  dir: "blog/content",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string(),
      tags: z.array(z.string()).optional(),
      featured: z.boolean().optional().default(false),
      readTime: z.string().optional(),
      author: z.string().optional(),
      thumbnail: z.string().optional(),
    }),
  },
});

export const { docs: courseDocs, meta: courseMeta } = defineDocs({
  dir: "courses/content",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string(),
      videoUrl: z.string().optional(),
    }),
  },
});
