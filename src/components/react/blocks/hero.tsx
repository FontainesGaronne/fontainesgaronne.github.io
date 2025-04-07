import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksHero } from "../../../../tina/__generated__/types";
// import Map from '../../react/map/map';
// import Map from "../../Map.astro";
import { Actions } from "./actions";

export const Hero = ({ data }: { data: PageBlocksHero }) => {

  return (
    <section>
      {data.headline && (
        <h1
          data-tina-field={tinaField(data, "headline")}
          className={`w-full relative mb-10 text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-normal leading-tight title-font`}
        >
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r  ${
              data.color === "primary"
                ? "from-white to-gray-100"
                : "from-yellow-400 to-yellow-600"
            }`}
          >
            {data.headline}
          </span>
        </h1>
      )}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col">
          {data.text && (
            <div
              data-tina-field={tinaField(data, "text")}
              className="prose prose-lg mb-10 !*:text-xl"
            >
              <TinaMarkdown content={data.text} />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {data.text2 && (
          <div className="flex flex-col md:w-1/2">
            <div
              data-tina-field={tinaField(data, "text2")}
              className="prose prose-lg mb-10"
            >
              <TinaMarkdown content={data.text2} />
            </div>
          </div>
        )}
        {data.map?.displayMap && (
        <div
          data-tina-field={tinaField(data.map, "displayMap")}
          className="flex flex-col flex-grow prose prose-lg dark:prose-dark mb-10"
        >
          {data.map.titleMap && (
            <h2 data-tina-field={tinaField(data.map, "titleMap")}>{data.map.titleMap}</h2>
            )}
            <div id="map" className="overflow-hidden rounded-lg flex-grow h-80 md:h-full" />
        </div>
        )}
      </div>
      {data.actions && (
        <div className="mt-10">
          <Actions
            className="justify-center md:justify-start py-2"
            actions={data.actions}
          />
        </div>
      )}
    </section>
  );
};

export const heroBlockSchema: Template = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.",
    },
  },
  fields: [
    {
      type: "string",
      label: "Titre de l'encart",
      name: "headline",
    },
    {
      name: "text",
      label: "Contenu",
      type: "rich-text",
    },
    {
      type: "rich-text",
      label: "Contenu secondaire",
      name: "text2",
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Intitulé de l'action",
          type: "button",
          icon: true,
          link: "/",
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: "Intitulé",
          name: "label",
          type: "string",
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Bouton", value: "button" },
            { label: "Lien", value: "link" },
          ],
        },
        {
          label: "Pictogramme",
          name: "icon",
          type: "boolean",
        },
        {
          label: "Lien",
          name: "link",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      label: "Carte",
      name: "map",
      fields: [
        {
          type: "boolean",
          label: "Afficher la carte du quartier ?",
          name: "displayMap",
        },
        {
          name: "titleMap",
          label: "Titre de l'encart",
          type: "string",
        },
      ],
    },
    {
      type: "string",
      label: "Couleur",
      name: "color",
      options: [
        { label: "Defaul", value: "default" },
        { label: "Teinté", value: "tint" },
        { label: "Principale", value: "primary" },
      ],
    },
  ],
};
