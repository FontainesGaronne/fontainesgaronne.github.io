import { tinaField } from "tinacms/dist/react";
import { Hero } from "./hero";
import { Content } from "./content";
import { Features } from "./features";
import { ContentHTML } from "./contentHTML";
import type { Page, PageBlocks } from "../../../../tina/__generated__/types";
import { FullMap } from "./fullmap";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  if (!props.blocks?.length) {
    return null;
  }
  return props.blocks.map(function (block, i) {
    return <Block {...block} key={i} data-tina-field={tinaField(block)} />;
  });
};

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksContentHTML":
      return <ContentHTML data={block} />;
    case "PageBlocksFullmap":
      return <FullMap data={block} />;
    default:
      return null;
  }
};
