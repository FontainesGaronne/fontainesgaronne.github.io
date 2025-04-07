import type { Collection } from "tinacms";

const Organizer: Collection = {
  label: "Organisateurs",
  name: "organizer",
  path: "src/content/organizers",
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
export default Organizer;
