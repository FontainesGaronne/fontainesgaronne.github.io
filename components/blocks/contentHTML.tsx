"use client";
import React from "react";

import type { Template } from "tinacms";
import { PageBlocksContentHtml } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export const ContentHTML = ({ data }: { data: PageBlocksContentHtml }) => {
  const headlineColorClasses = {
    blue: "from-blue-400 to-blue-600",
    teal: "from-teal-400 to-teal-600",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
    purple: "from-purple-400 to-purple-600",
    orange: "from-orange-300 to-orange-600",
    yellow: "from-yellow-400 to-yellow-600",
  };

  return (
    <Section color={data.color}>
      <Container
        className={`prose prose-lg ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tina-field={tinaField(data, "HTMLContent")}
        size="large"
        width="medium"
      >
        {data.headline && (
            <h3
              data-tina-field={tinaField(data, "headline")}
              className={`w-full relative mb-10 text-3xl font-extrabold tracking-normal leading-tight title-font`}
            >
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r  ${
                  data.color === "primary"
                    ? `from-white to-gray-100`
                    : headlineColorClasses["blue"]
                }`}
              >
                {data.headline}
              </span>
            </h3>
        )}

        <div dangerouslySetInnerHTML={{__html: data.HTMLContent }} />
      </Container>
    </Section>
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


