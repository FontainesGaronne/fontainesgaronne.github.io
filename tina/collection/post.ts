import type { Collection } from "tinacms";

const Post: Collection = {
  label: "Blog Posts",
  name: "post",
  path: "content/posts",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/posts/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      label: "Titre",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      type: "image",
      name: "Image",
      label: "Hero Image",
    },
    {
      type: "rich-text",
      label: "Extrait",
      name: "excerpt",
    },
    {
      type: "reference",
      label: "Auteur",
      name: "author",
      collections: ["author"],
    },
    {
      type: "datetime",
      label: "Date de publication",
      name: "date",
      ui: {
        dateFormat: "MMMM DD YYYY",
        timeFormat: "hh:mm A",
      },
    },
    {
      type: "rich-text",
      label: "Contenu",
      name: "_body",
      templates: [
        {
          name: "DateTime",
          label: "Date & Heure",
          inline: true,
          fields: [
            {
              name: "format",
              label: "Format",
              type: "string",
              options: ["utc", "iso", "local"],
            },
          ],
        },
        {
          name: "BlockQuote",
          label: "Bloc de citation",
          fields: [
            {
              name: "children",
              label: "Citation",
              type: "rich-text",
            },
            {
              name: "authorName",
              label: "Auteur",
              type: "string",
            },
          ],
        },
        {
          name: "NewsletterSignup",
          label: "Encart d'insciption Newsletter",
          fields: [
            {
              name: "children",
              label: "Bouton d'action",
              type: "rich-text",
            },
            {
              name: "placeholder",
              label: "Placeholder",
              type: "string",
            },
            {
              name: "buttonText",
              label: "Intitulé du bouton",
              type: "string",
            },
            {
              name: "disclaimer",
              label: "Clause de non responsabilité",
              type: "rich-text",
            },
          ],
          ui: {
            defaultItem: {
              placeholder: "e-mail",
              buttonText: "Souscrire",
            },
          },
        },
      ],
      isBody: true,
    },
  ],
};

export default Post;
