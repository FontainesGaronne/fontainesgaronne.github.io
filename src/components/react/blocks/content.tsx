"use client";
import React from "react";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksContent } from "../../../../tina/__generated__/types";


export const Content = ({ data }: { data: PageBlocksContent }) => {
  return (
    <section
        className="prose"
        data-tina-field={tinaField(data, "body")}
      >
        <TinaMarkdown content={data.body} />
    </section>
  );
};

export const contentBlockSchema: Template = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "rich-text",
      label: "Body",
      name: "body",
    }
  ],
};
