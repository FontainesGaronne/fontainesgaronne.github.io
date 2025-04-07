import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import type { PageQuery, PageQueryVariables } from "../__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Blocks } from "../../src/components/react/blocks";

type Props = {
	variables: PageQueryVariables;
	data: PageQuery;
	query: string;
}

const TinaPage = (props: Props) => {
	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	const page = data.page;
	const nextData: any = data.page.blocks === null ? {
		...data.page,
		blocks: [{
			__typename: "PageBlocksContent",
			body: data.page.body,
		}]
  } : data.page;

	return (
		<main className="max-w-7xl mx-auto px-6 py-4 sm:py-16 lg:py-24">
			
			<h1
				data-tina-field={tinaField(page, "title")}
				className="mb-6 lg:mb-10 text-3xl sm:text-4xl lg:text-5xl font-extrabold
				tracking-normal text-center title-font bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-500"
			>
					{page.title}
			</h1>
			{/* {page.blocks && page.blocks.map((block, inde	x) => {	
				return (
					<div key={index} data-tina-field={tinaField(page, `blocks.${index}`)}>
						{block}
					</div>
				)
			})} */}
			<Blocks {...nextData} />
			<div className="prose" data-tina-field={tinaField(page, "body")}>
				<TinaMarkdown content={page.body} />
			</div>
		</main>
	)
}

export default TinaPage;
