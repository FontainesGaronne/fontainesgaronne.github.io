import { Container } from "@/components/layout/container";
import Layout from "@/components/layout/layout";
import client from "@/tina/__generated__/client";
import PostsClientPage from "./client-page";

export default async function PostsPage() {
  const posts = await client.queries.postConnection({ sort: 'date', last: -1 });

  if (!posts) {
    return null;
  }

  return (
    <Layout rawPageData={posts.data}>
      <Container size="large" width="small">
        <PostsClientPage {...posts} />
      </Container>
    </Layout>
  );
}
