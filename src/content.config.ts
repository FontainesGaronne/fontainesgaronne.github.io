import { defineCollection, z } from "astro:content";
import client from "../tina/__generated__/client";
import Organizer from "../tina/collection/organizer";

function convertToPosts(array: any[] | null | undefined) {
  if (!array) {
     return [];
  }
  return array
    .filter((p): p is NonNullable<typeof p> => !!p)
    .map((p) => {
      const node = p.node;
      if (!node || !node._sys) throw new Error('Invalid page data');

      return {
        ...node,
        id: node._sys.relativePath.replace(/\.mdx?$/, ""), // Generate clean URLs
        tinaInfo: node._sys, // Include Tina system info if needed
      };
    });
}

const eventSchema = z.object({
  tinaInfo: z.object({
    filename: z.string(),
    basename: z.string(),
    path: z.string(),
    relativePath: z.string(),
  }),
  title: z.string(),
  excerpt: z.any(),
  body: z.string().nullish(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  heroImg: z.string().nullish(),
  organizer: z.any(),
});

const post = defineCollection({
  loader: async () => {
    const postsResponse = await client.queries.postConnection({ sort: 'date', last: -1 });

    // Map Tina posts to the correct format for Astro
    return convertToPosts(postsResponse.data.postConnection.edges)
  },
  schema: z.object({
    tinaInfo: z.object({
      filename: z.string(),
      basename: z.string(),
      path: z.string(),
      relativePath: z.string(),
    }),
    heroImg: z.string().nullish(),
    title: z.string(),
    excerpt: z.any(),
    body: z.string().optional(),
    date: z.coerce.date(),
    author: z.any(),
  }),
});

const page = defineCollection({
  loader: async () => {
    const postsResponse = await client.queries.pageConnection();

    return convertToPosts(postsResponse.data.pageConnection.edges)
  },
  schema: z.object({
    tinaInfo: z.object({
      filename: z.string(),
      basename: z.string(),
      path: z.string(),
      relativePath: z.string(),
    }),
    title: z.string(),
    blocks: z.any(),
    body: z.any(),
  }),
})

const agenda = defineCollection({
  loader: async () => {
    const postsResponse = await client.queries.agendaConnection();

    // Map Tina posts to the correct format for Astro
    return convertToPosts(postsResponse.data.agendaConnection.edges)
  },
  schema: eventSchema,
});

const pastEvents = defineCollection({
  loader: async () => {
    const pastEventsQuery = await client.queries.agendaConnection({
      sort: 'endDate',
      last: -1,
      filter: {
        endDate: {
          before: new Date().toISOString()
        }
      }
    });
    return convertToPosts(pastEventsQuery.data.agendaConnection.edges)
  },
  schema: eventSchema,  
})

const currentEvents = defineCollection({
  loader: async () => {
    const currentEventsQuery = await client.queries.agendaConnection({
      sort: 'endDate',
      filter: {
        startDate: {
          before: new Date().toISOString()
        },
        endDate: {
          after: new Date().toISOString()
        }
      }
    });

    return convertToPosts(currentEventsQuery.data.agendaConnection.edges)
  },
  schema: eventSchema,  
})

const futureEvents = defineCollection({
  loader: async () => {
    const futureEventsQuery = await client.queries.agendaConnection({
      sort: 'startDate',
      filter: {
        startDate: {
          after: new Date().toISOString()
        }
      }
    });
  
    return convertToPosts(futureEventsQuery.data.agendaConnection.edges)
  },
  schema: eventSchema,  
})
export const collections = { post, page, pastEvents, currentEvents, futureEvents, agenda };
