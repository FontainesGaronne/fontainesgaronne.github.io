import { tinaField } from "tinacms/dist/react";
import { Hero } from "./hero";
import { Content } from "./content";
import { Features } from "./features";
import { ContentHTML } from "./contentHTML";
import type { Page, PageBlocks } from "../../../../tina/__generated__/types";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  return (
    <div className="flex flex-col gap-2 sm:gap-4 lg:gap-8">
      {props.blocks
        ? props.blocks.map(function (block, i) {
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <Block {...block} />
              </div>
            );
          })
        : null}
    </div>
  );
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
    default:
      return null;
  }
};
