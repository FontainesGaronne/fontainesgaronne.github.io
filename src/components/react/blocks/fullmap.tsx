import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksFullmap } from "../../../../tina/__generated__/types";
import { cn } from "@/lib/utils";
export const FullMap = ({ data }: { data: PageBlocksFullmap }) => {
  return (
    <section
      className={cn(
        "flex flex-col grow prose prose-lg dark:prose-dark mb-10",
        data.largeFullMap && "col-span-full! max-w-7xl! w-full"
      )}
    >
      {data.titleFullMap && (
        <h2 data-tina-field={tinaField(data, "titleFullMap")}>
          {data.titleFullMap}
        </h2>
      )}
      <div id="map" className="overflow-hidden rounded-lg grow h-100" />
      {data.legendFullMap && (
        <span
          className="text-gray-500 text-end text-sm mt-3"
          data-tina-field={tinaField(data, "legendFullMap")}
        >
          {data.legendFullMap}
        </span>
      )}
    </section>
  );
};

export const fullMapBlockSchema: Template = {
  name: "fullmap",
  label: "Carte du quartier",
  ui: {
    previewSrc: "/blocks/map.png",
    defaultItem: {
      titleFullMap: "Carte du quartier",
    },
  },
  fields: [
    {
      name: "titleFullMap",
      label: "Titre de la carte",
      type: "string",
    },
    {
      name: "legendFullMap",
      label: "Légende de la carte",
      type: "string",
    },
    {
      name: "largeFullMap",
      label: "Pleine largeur",
      type: "boolean",
    },
  ],
};
