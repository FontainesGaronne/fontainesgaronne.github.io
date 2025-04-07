import React from "react";

import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksContentHtml } from "../../../../tina/__generated__/types";

export const ContentHTML = ({ data }: { data: PageBlocksContentHtml }) => {
  return (
    <section
      data-tina-field={tinaField(data, "HTMLContent")}
    >
      {data.headline && (
        <h3
          data-tina-field={tinaField(data, "headline")}
          className={`w-full relative mb-10 text-3xl font-extrabold tracking-normal leading-tight title-font`}
        >
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600"
          >
            {data.headline}
          </span>
        </h3>
      )}

      <div dangerouslySetInnerHTML={{__html: data.HTMLContent ?? '' }} />
    </section>
  );
};

export const contentHTMLBlockSchema: Template = {
  name: "contentHTML",
  label: "Contenu HTML",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      HTMLContent: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "string",
      label: "Titre de l'encart",
      name: "headline",
    },
    {
      type: "string",
      label: "Contenu HTML (iframe)",
      name: "HTMLContent",
      ui: {
        component:"textarea"
      }
    }
  ],
};


