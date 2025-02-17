import client from "@/tina/__generated__/client";

export default async function sitemap() {
  const [pages, posts, agenda] = await Promise.all([
    client.queries.pageConnection(),
    client.queries.postConnection(),
    client.queries.agendaConnection()
  ]);
  const links = [];
  if ((pages.data?.pageConnection.edges ?? []).length > 0) {
    links.push(...pages.data.pageConnection.edges.map(
      (edge) => {
        const breadcrumbs = edge.node._sys.breadcrumbs.join("/");
        return { url: `/` + breadcrumbs !== "home" ? breadcrumbs : "" }
      }
    ));
  }
  if ((posts.data?.postConnection.edges ?? []).length > 0) {
    links.push(...posts.data.postConnection.edges.map(
      (edge) => (
        { url: `/post/` + edge.node._sys.breadcrumbs.join("/") }
      )
    ));
  }
  if ((agenda.data?.agendaConnection.edges ?? []).length > 0) {
    links.push(...agenda.data.agendaConnection.edges.map(
      (edge) => (
        { url: `/agenda/` + edge.node._sys.breadcrumbs.join("/") }
      )
    ));
  }
  return links;
}