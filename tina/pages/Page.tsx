import { tinaField, useTina } from "tinacms/dist/react";
import type { PageQuery, PageQueryVariables } from "../__generated__/types";
import { Blocks } from "../../src/components/react/blocks";

type Props = {
  variables: PageQueryVariables;
  data: PageQuery;
  query: string;
};

const TinaPage = (props: Props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const { page } = data;

  return (
    <main className="grow md:grid grid-cols-[1fr_minmax(0,80rem)_1fr] max-w-full place-content-start *:col-2 *:mx-auto mx-auto md:mx-0 px-6 py-4 sm:py-16 lg:py-24">
      <h1
        data-tina-field={tinaField(page, "title")}
        className="mb-6 lg:mb-10 text-3xl sm:text-4xl lg:text-5xl font-extrabold
				tracking-normal text-center title-font bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-yellow-500"
      >
        {page.title}
      </h1>
      <Blocks {...page} />
    </main>
  );
};

export default TinaPage;
