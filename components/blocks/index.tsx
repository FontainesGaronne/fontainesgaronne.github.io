import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "@/tina/__generated__/types";
import { Hero } from "@/components/blocks/hero";
import { Content } from "@/components/blocks/content";
import { Features } from "@/components/blocks/features";
import { Testimonial } from "@/components/blocks/testimonial";
import { ContentHTML } from "@/components/blocks/contentHTML";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <Block {...block} />
              </div>
            );
          })
        : null}
    </>
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
    case "PageBlocksTestimonial":
      return <Testimonial data={block} />;
    case "PageBlocksContentHTML":
      return <ContentHTML data={block} />;
    default:
      return null;
  }
};
