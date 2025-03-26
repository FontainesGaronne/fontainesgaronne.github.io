import React from "react";
import client from "@/tina/__generated__/client";
import ClientPage from "./client-page";
import Layout from "@/components/layout/layout";

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
  let pages = await client.queries.pageConnection();
  const allPages = pages;

  if (!allPages.data.pageConnection.edges) {
    return [];
  }

  while (pages.data.pageConnection.pageInfo.hasNextPage) {
    pages = await client.queries.pageConnection({
      after: pages.data.pageConnection.pageInfo.endCursor,
    });

    if (!pages.data.pageConnection.edges) {
      break;
    }
    allPages.data.pageConnection.edges.push(...pages.data.pageConnection.edges);
  }

  const params = allPages.data?.pageConnection.edges
    .map((edge) => ({
      filename: edge?.node?._sys.breadcrumbs || [],
    }))
    .filter((x) => x.filename.length > 0)
    .filter((x) => !x.filename.every((x) => x === 'home')); // exclude the home page
  return params;
}
