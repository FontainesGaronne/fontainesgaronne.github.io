import React from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const Feature = ({
  data,
}: {
  data: any;
}) => {
  return (
    <div
      data-tina-field={tinaField(data)}
      className="flex-1 flex flex-col gap-6 text-center items-center lg:items-start lg:text-left max-w-xl mx-auto"
    >
      {data.title && (
        <h3
          data-tina-field={tinaField(data, "title")}
          className="text-2xl font-semibold title-font"
        >
          {data.title}
        </h3>
      )}
      {data.text && (
        <div
          data-tina-field={tinaField(data, "text")}
          className="text-base opacity-80 leading-relaxed"
        >
          <TinaMarkdown content={data.text} />
        </div>
      )}
    </div>
  );
};

export const Features = ({ data }: { data: any }) => {
  return (
    <section
      className="flex-1 relative transition duration-150 ease-out body-font sm:-mx-6 rounded-lg overflow-hidden text-gray-900 bg-gray-100"
    >
      <div
        className="max-w-7xl mx-auto px-6 py-4 sm:py-16 lg:py-24 flex flex-wrap gap-x-10 gap-y-8 text-left"
      >
        {data.items?.map((block, i) => {
            return <Feature key={i} data={block} />;
          })}
      </div>
    </section>
  );
};

const defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
  icon: {
    color: "",
    style: "float",
    name: "",
  },
};

export const featureBlockSchema = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      items: [defaultFeature, defaultFeature, defaultFeature],
    },
  },
  fields: [
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultFeature,
        },
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text",
        },
      ],
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};
