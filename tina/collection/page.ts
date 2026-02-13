import type { Collection } from "tinacms";
import { heroBlockSchema } from "../../src/components/react/blocks/hero";
import { contentBlockSchema } from "../../src/components/react/blocks/content";
import { contentHTMLBlockSchema } from "../../src/components/react/blocks/contentHTML";
import { featureBlockSchema } from "../../src/components/react/blocks/features";
import { fullMapBlockSchema } from "../../src/components/react/blocks/fullmap";

const Page: Collection = {
  label: "Pages",
  name: "page",
  path: "src/content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join("/");
      if (filepath === "home") {
        return "/";
      }
      return `/${filepath}`;
    },
  },
  fields: [
    {
      type: "string",
      label: "Titre",
      name: "title",
      description: "Le titre de la page",
      isTitle: true,
      required: true,
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        // @ts-ignore
        featureBlockSchema,
        contentBlockSchema,
        contentHTMLBlockSchema,
        fullMapBlockSchema,
      ],
    },
  ],
};

export default Page;
