"use client";
import Link from "next/link";
import Image from "next/image";
import { useTina } from "tinacms/dist/react";
import { Blocks } from "@/components/blocks";
import { AgendaConnectionQuery, AgendaConnectionQueryVariables, PageQuery } from "@/tina/__generated__/types";
import { useLayout } from "@/components/layout/layout-context";
import { components } from "@/components/mdx-components";
import { BsArrowRight } from "react-icons/bs";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import EventDates from "@/components/eventDates";

interface ClientPageProps {
  pageQuery: {
    data: {
      page: PageQuery["page"];
    };
    variables: {
      relativePath: string;
    };
    query: string;
  }
  eventsQuery?: {
    data: AgendaConnectionQuery;
    variables: AgendaConnectionQueryVariables;
    query: string;
  }
}

const titleColorClasses = {
  blue: "group-hover:text-blue-600 dark:group-hover:text-blue-300",
  teal: "group-hover:text-teal-600 dark:group-hover:text-teal-300",
  green: "group-hover:text-green-600 dark:group-hover:text-green-300",
  red: "group-hover:text-red-600 dark:group-hover:text-red-300",
  pink: "group-hover:text-pink-600 dark:group-hover:text-pink-300",
  purple: "group-hover:text-purple-600 dark:group-hover:text-purple-300",
  orange: "group-hover:text-orange-600 dark:group-hover:text-orange-300",
  yellow: "group-hover:text-yellow-500 dark:group-hover:text-yellow-300",
};

export default function ClientPage({ pageQuery, eventsQuery }: ClientPageProps) {
  const { data: pageData } = useTina({...pageQuery});
  const { data: eventsData } = useTina({ ...eventsQuery });
  const { theme } = useLayout();
  return (
    <>
      <Blocks {...pageData?.page} />
      {eventsData?.agendaConnection.edges?.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 sm:px-0 py-4 sm:py-16 lg:py-24 flex flex-wrap gap-x-10 gap-y-8 text-left">
          <h2 className="text-2xl font-semibold title-font">Les prochaines dates dans le quartier à retenir</h2>
          <div className="md:grid gap-6 grid-cols-2 mb-4 py-10">
            {eventsData.agendaConnection.edges.map(({ node }) => {
                return (
                  <Link
                    key={node._sys.filename}
                    href={`/agenda/` + node._sys.filename}
                    className="relative overflow-hidden flex flex-col group mb-8 last:mb-0 bg-white dark:bg-gray-1000 rounded-md shadow-sm transition duration-150 ease-out hover:shadow-md hover:bg-slate-50 dark:hover:bg-gray-800 focus:shadow-md focus:bg-slate-50 dark:focus:bg-gray-800"
                  >
                    <div className="flex flex-col lg:flex-row flex-grow">
                      {node.heroImg && (
                        <div className="flex justify-center items-center object-cover bg-gray-100 max-h-72 lg:max-h-auto">
                          <Image
                            src={node.heroImg}
                            className="object-cover h-full"
                            alt=""
                            width={400}
                            height={400}
                          />
                        </div>
                      )}
                      <div className="px-6 sm:px-8 md:px-10 py-10 flex-grow">
                        <h3
                          className={`text-gray-700 dark:text-white text-xl lg:text-2xl font-semibold title-font mb-5 transition-all duration-150 ease-out ${
                            titleColorClasses[theme.color]
                          }`}
                        >
                          {node.title}{" "}
                          <span className="inline-block opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                            <BsArrowRight className="inline-block h-8 -mt-1 ml-1 w-auto opacity-70" aria-hidden />
                          </span>
                        </h3>
                        {node.excerpt && (
                          <div className="prose dark:prose-dark w-full max-w-none mb-5 opacity-70">
                            <TinaMarkdown content={node.excerpt} components={components}/>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center flex-wrap gap-2">
                      <EventDates startDate={node.startDate} endDate={node.endDate} />
                    </div>
                  </Link>
                );
            })}
          </div>
          <div className="flex w-full justify-center md:justify-end">
            <Link
              className="md:ml-auto group inline-flex gap-2 items-center font-semibold text-lg transition duration-150 ease-out text-yellow-600 dark:text-yellow-400 hover:text-yellow-400 dark:hover:text-yellow-200"
              href="/agenda"
            >
              Les évènements dans votre quartier
              <BsArrowRight className="size-6 opacity-80" aria-hidden />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
