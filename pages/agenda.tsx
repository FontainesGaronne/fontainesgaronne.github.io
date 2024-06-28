import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { AgendaList } from "../components/agenda";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { InferGetStaticPropsType } from "next";

export default function AgendaPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const data = props.data.agendaConnection.edges;

  return (
    <Layout>
      <Section className="flex-1">
        <Container size="large" width="large">
          <AgendaList data={data} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.agendaQuery();
  return {
    props: {
      ...tinaProps,
    },
  };
};

export type AgendaType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["agendaConnection"]["edges"][number];
