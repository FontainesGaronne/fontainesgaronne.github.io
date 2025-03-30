import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "@/app/[...filename]/client-page";

export const revalidate = 300;

export default async function Home() {
  const homeQuery = await client.queries.page({
    relativePath: `home.mdx`,
  });

  const currentAndFutureEventsQuery = await client.queries.agendaConnection({
    sort: 'startDate',
    filter: {
      endDate: {
        after: new Date().toISOString()
      }
    }
  });

  return (
    <Layout rawPageData={{...homeQuery, ...currentAndFutureEventsQuery}}>
      <ClientPage pageQuery={homeQuery} eventsQuery={currentAndFutureEventsQuery} />
    </Layout>
  );
}
