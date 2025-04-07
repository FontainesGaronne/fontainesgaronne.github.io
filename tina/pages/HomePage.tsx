import { tinaField, useTina } from "tinacms/dist/react";
import type { Agenda, PageQuery, PageQueryVariables } from "../__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Blocks } from "../../src/components/react/blocks";
import EventDates from "../../src/components/react/eventDates";
import { BsArrowRight } from "react-icons/bs";

type Props = {
	variables: PageQueryVariables;
	data: PageQuery;
	query: string;
	events: {
		id: string;
		data: Agenda;
	}[]
}

const HomePage = (props: Props) => {
	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	});

	const page = data.page;

	const nextData: any = data.page.blocks === null ? {
		...data.page,
		blocks: [{
			__typename: "PageBlocksContent",
			body: data.page.body,
		}]
  } : data.page;
	
	const events = props.events;

	return (
		<main className="max-w-7xl mx-auto px-6 py-4 sm:py-16 lg:py-24">
			<Blocks {...nextData} />
			{events.length > 0 && (
        <section className="sm:px-0 flex flex-wrap gap-x-10 gap-y-8 pt-8 sm:pt-16">
          <h2 className="text-3xl font-semibold title-font">Les prochaines dates dans le quartier à retenir</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 w-full mb-4">
            {events.map(post => {
							return (
								<a
									className="relative overflow-hidden h-full flex flex-col group mb-8 last:mb-0 bg-white rounded-md shadow-sm transition duration-150 ease-out hover:shadow-md focus:shadow-md"
									href={`/agenda/${post.id}`}
								>
									<div className="flex flex-col lg:flex-row flex-grow">
										{post.data.heroImg && (
											<div className="flex justify-center items-center object-cover bg-gray-100 max-h-72 lg:max-h-auto">
												<img
													loading="lazy"
													src={post.data.heroImg}
													className="object-cover h-full"
													alt=""
													width={400}
													height={400}
												/>
											</div>
										)}
										<div className="px-6 sm:px-8 md:px-10 py-10 flex-grow">
											<h3
												className="text-gray-700 text-xl lg:text-2xl font-semibold title-font mb-5 transition-all duration-150 ease-out group-hover:text-yellow-500"
											>
												{post.data.title}
											</h3>
											{post.data.excerpt && (
												<div className="prose mb-5 opacity-70">
													<TinaMarkdown content={post.data.excerpt} />
												</div>
											)}
										</div>
									</div>
									<div className="flex items-center flex-wrap gap-2">
										<EventDates startDate={new Date(post.data.startDate)} endDate={new Date(post.data.endDate)} />
									</div>
								</a>
							)
          	})}
        	</div>
					<div className="flex w-full justify-center md:justify-end">
						<a
							className="md:ml-auto group inline-flex gap-2 items-center font-semibold text-lg transition duration-150 ease-out text-yellow-600  hover:text-yellow-400 "
							href="/agenda"
						>
							Les évènements dans votre quartier
							<BsArrowRight className="size-6 opacity-80" aria-hidden />
						</a>
					</div>
				</section>
			)}
			<div data-tina-field={tinaField(page, "body")}>
				<TinaMarkdown content={page.body} />
			</div>
		</main>
	)
}

export default HomePage;
