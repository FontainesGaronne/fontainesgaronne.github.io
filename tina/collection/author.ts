import type { Collection } from "tinacms";

const Author: Collection = {
  label: "Auteurs",
  name: "author",
  path: "src/content/authors",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Nom",
      name: "name",
      isTitle: true,
      required: true,
    },
    {
      type: "image",
      label: "Avatar",
      name: "avatar",
    },
  ],
};
export default Author;
