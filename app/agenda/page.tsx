import { Container } from "@/components/layout/container";
import Layout from "@/components/layout/layout";
import client from "@/tina/__generated__/client";
import AgendaClientPage from "./client-page";

export const revalidate = 300;

export default async function PostsPage() {
  const currentEventsQuery = await client.queries.agendaConnection({
    sort: 'endDate',
    filter: {
      startDate: {
        before: new Date().toISOString()
      },
      endDate: {
        after: new Date().toISOString()
      }
    }
  });

  const futureEventsQuery = await client.queries.agendaConnection({
    sort: 'startDate',
    filter: {
      startDate: {
        after: new Date().toISOString()
      }
    }
  });

  const pastEventsQuery = await client.queries.agendaConnection({
    sort: 'endDate',
    last: -1,
    filter: {
      endDate: {
        before: new Date().toISOString()
      }
    }
  });

  if (!currentEventsQuery && !futureEventsQuery && !pastEventsQuery) {
    return null;
  } 
  

  return (
    <Layout rawPageData={{
      ...currentEventsQuery.data ?? {},
      ...futureEventsQuery.data ?? {},
      ...pastEventsQuery.data ?? {}
    }}>
      <Container size="large" width="large">
        <AgendaClientPage
          currentEventsQuery={currentEventsQuery}
          futureEventsQuery={futureEventsQuery}
          pastEventsQuery={pastEventsQuery}
        />
      </Container>
    </Layout>
  );
}
