import type { Collection } from "tinacms";

const Agenda: Collection = {
  label: "Évènements",
  name: "agenda",
  path: "content/agenda",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/agenda/${document._sys.filename}`;
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
      name: "heroImg",
      label: "Image de présentation",
    },
    {
      type: "rich-text",
      label: "Extrait",
      name: "excerpt",
    },
    {
      type: "reference",
      label: "Organisateur",
      name: "organizer",
      collections: ["organizer"],
    },
    {
      type: "datetime",
      label: "Date de publication",
      name: "date",
      ui: {
        dateFormat: "DD/MM/YYYY",
      },
    },
    {
      type: "datetime",
      label: "Date de début",
      name: "startDate",
      ui: {
        dateFormat: "DD/MM/YYYY",
      },
      required: true,
    },
    {
      type: "datetime",
      label: "Date de fin",
      name: "endDate",
      ui: {
        dateFormat: "DD/MM/YYYY",
      },
      required: true,
    },
    {
      type: "rich-text",
      label: "Contenu",
      name: "_body",
      templates: [
        {
          name: "DateTime",
          label: "Date & Time",
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
              name: "organizer",
              label: "Organisateur",
              type: "string",
            },
          ],
        },
        {
          name: "NewsletterSignup",
          label: "Formulaire Newsletter",
          fields: [
            {
              name: "children",
              label: "CTA",
              type: "rich-text",
            },
            {
              name: "placeholder",
              label: "Placeholder",
              type: "string",
            },
            {
              name: "buttonText",
              label: "Button Text",
              type: "string",
            },
            {
              name: "disclaimer",
              label: "Disclaimer",
              type: "rich-text",
            },
          ],
          ui: {
            defaultItem: {
              placeholder: "Entrez votre adresse e-mail",
              buttonText: "Tenez moi au courant",
            },
          },
        },
      ],
      isBody: true,
    },
  ],
};

export default Agenda;
