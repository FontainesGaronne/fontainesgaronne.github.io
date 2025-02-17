import { Container } from "@/components/layout/container";
import Layout from "@/components/layout/layout";
import client from "@/tina/__generated__/client";
import AgendaClientPage from "./client-page";

export default async function PostsPage() {
  const posts = await client.queries.agendaConnection();

  if (!posts) {
    return null;
  }

  return (
    <Layout rawPageData={posts.data}>
      <Container size="large" width="large">
        <AgendaClientPage {...posts} />
      </Container>
    </Layout>
  );
}
