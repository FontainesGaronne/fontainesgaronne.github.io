import { defineConfig } from "tinacms";

import Post from "./collection/post";
import Agenda from "./collection/agenda";
import Global from "./collection/global";
import Author from "./collection/author";
import Organizer from "./collection/organizer";
import Page from "./collection/page";

const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN!,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  search: {
    tina: {
      indexerToken: process.env.NEXT_PUBLIC_TINA_SEARCH_TOKEN!,
      stopwordLanguages: ['fra'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema: {
    collections: [Post, Agenda, Global, Author, Organizer, Page],
  },
});

export default config;
