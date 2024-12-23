import React from "react";
import client from "../../tina/__generated__/client";
import ClientPage from "./client-page";
import Layout from "../../components/layout/layout";

export default async function Page({
  params,
}: {
  params: { filename: string[] };
}) {
  const data = await client.queries.page({
    relativePath: `${params.filename}.mdx`,
  });

  const nextData: any = data.data.page.blocks === null ? {
    data: {
      ...data.data,
      page: {
        ...data.data.page,
        blocks: [{
          __typename: "PageBlocksContent",
          body: data.data.page.body,
        }]
      }
    }
  } : data;
  

  return (
    <Layout rawPageData={nextData}>
      <ClientPage {...nextData}></ClientPage>
    </Layout>
  );
}

export async function generateStaticParams() {
  const pages = await client.queries.pageConnection();
  const paths = pages.data?.pageConnection.edges.map((edge) => ({
    filename: edge.node._sys.breadcrumbs,
  }));

  return paths || [];
}
