import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
  }),
});

const servicosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
    image: z.string().optional(),
  }),
});

const bairrosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    heroPrefix: z.string(),
    heroHighlight: z.string(),
    desc: z.string(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'servicos': servicosCollection,
  'bairros': bairrosCollection,
};
