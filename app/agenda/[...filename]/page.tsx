import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import AgendaClientPage from "./client-page";

export default async function PostPage({
  params,
}: {
  params: { filename: string[] };
}) {
  const data = await client.queries.agenda({
    relativePath: `${params.filename.join("/")}.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <AgendaClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  let posts = await client.queries.agendaConnection();
  const allPosts = posts;

  while (posts.data?.agendaConnection.pageInfo.hasNextPage) {
    posts = await client.queries.agendaConnection({
      after: posts.data.agendaConnection.pageInfo.endCursor,
    });
    allPosts.data.agendaConnection.edges.push(...posts.data.agendaConnection.edges);
  }

  const params =
    allPosts.data?.agendaConnection.edges.map((edge) => ({
      filename: edge.node._sys.breadcrumbs,
    })) || [];

  return params;
}
