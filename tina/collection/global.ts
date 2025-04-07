import type { Collection } from "tinacms";
import { ColorPickerInput } from "../fields/color";

const Global: Collection = {
  label: "Global",
  name: "global",
  path: "src/content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      label: "Entête de page",
      name: "header",
      fields: [
        {
          type: "string",
          label: "Nom",
          name: "name",
        },
        {
          type: "string",
          label: "Couleur",
          name: "color",
          options: [
            { label: "Defaut", value: "default" },
            { label: "Principale", value: "primary" },
          ],
        },
        {
          type: "object",
          label: "Lien du menu de navigation",
          name: "nav",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              href: "home",
              label: "Page d'accueil",
            },
          },
          fields: [
            {
              type: "string",
              label: "Lien",
              name: "href",
            },
            {
              type: "string",
              label: "Intitulé",
              name: "label",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Pied de page",
      name: "footer",
      fields: [
        {
          type: "string",
          label: "Couleur",
          name: "color",
          options: [
            { label: "Defaut", value: "default" },
            { label: "Principale", value: "primary" },
          ],
        },
        {
          type: "object",
          label: "Liens réseaux sociaux",
          name: "social",
          fields: [
            {
              type: "string",
              label: "Facebook",
              name: "facebook",
            },
            {
              type: "string",
              label: "Twitter",
              name: "twitter",
            },
            {
              type: "string",
              label: "Instagram",
              name: "instagram",
            },
            {
              type: "string",
              label: "Github",
              name: "github",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      fields: [
        {
          type: "string",
          label: "Couleur principale",
          name: "color",
          ui: {
            // @ts-ignore next-line
            component: ColorPickerInput,
          },
        },
        {
          type: "string",
          name: "font",
          label: "Typographie",
          options: [
            {
              label: "System Sans",
              value: "sans",
            },
            {
              label: "Nunito",
              value: "nunito",
            },
            {
              label: "Lato",
              value: "lato",
            },
          ],
        },
        {
          type: "string",
          name: "darkMode",
          label: "Préférence d'affichage",
          options: [
            {
              label: "System",
              value: "system",
            },
            {
              label: "Clair",
              value: "light",
            },
            {
              label: "Sombre",
              value: "dark",
            },
          ],
        },
      ],
    },
  ],
};

export default Global;
