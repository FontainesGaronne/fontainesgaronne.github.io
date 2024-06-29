import React from "react";
import { InferGetStaticPropsType } from "next";
import { Blocks } from "../components/blocks-renderer";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../components/layout";
import { client } from "../tina/__generated__/client";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina(props);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nextData: any = data.page.blocks === null ? {
    ...data,
    page: {
      ...data.page,
      blocks: [{
        __typename: "PageBlocksContent",
        body: data.page.body,
      }]
    }
  } : data;

  return (
    <Layout rawData={nextData} data={nextData.global}>
      <Blocks {...nextData.page} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `${params.filename}.md`,
  });
  const props = {
    ...tinaProps,
    enableVisualEditing: process.env.VERCEL_ENV === "preview",
  };
  return {
    props,
  };
};

export const getStaticPaths = async () => {
  const pagesListData = await client.queries.pageConnection();
  return {
    paths: pagesListData.data.pageConnection?.edges?.map((page) => ({
      params: { filename: page?.node?._sys.filename },
    })),
    fallback: false,
  };
};
