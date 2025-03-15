"use client";
import Link from "next/link";
import Image from "next/image";
import React, { Fragment } from "react";
import { useLayout } from "@/components/layout/layout-context";
import { components } from "@/components/mdx-components";
import { BsArrowRight } from "react-icons/bs";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import {
  AgendaConnectionQuery,
  AgendaConnectionQueryVariables,
} from "@/tina/__generated__/types";
import { useTina } from "tinacms/dist/react";
import { partition } from "@/lib/utils";
import { BiRightArrowAlt } from "react-icons/bi";

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
interface ClientAgendaProps {
  data: AgendaConnectionQuery;
  variables: AgendaConnectionQueryVariables;
  query: string;
}

export default function AgendaClientPage(props: ClientAgendaProps) {
  const { data } = useTina({ ...props });
  const { theme } = useLayout();

  const posts = data?.agendaConnection.edges;

  if( !posts) {
    return null;
  }

  const [currentAndFutureEvents, pastEvents] = partition(posts, item => {
    const startDate = new Date(item.node.startDate).setHours(0, 0, 0, 0);
    const endDate = new Date(item.node.endDate ?? item.node.startDate).setHours(0, 0, 0, 0);
    const currentDate = new Date().setHours(0, 0, 0, 0);
    return (endDate ?? startDate) > currentDate
  })

  const [currentEvents, futureEvents] = partition(currentAndFutureEvents, item => {
    const startDate = new Date(item.node.startDate).setHours(0, 0, 0, 0);
    const endDate = new Date(item.node.endDate).setHours(0, 0, 0, 0);
    const currentDate = new Date().setHours(0, 0, 0, 0);

    return (startDate === endDate && endDate === currentDate) || (startDate <= currentDate && endDate >= currentDate) 
  })

  const nextData = [{
    title: "C'est en ce moment !",
    data: currentEvents,
  },{
    title: "Les évènements à venir",
    data: futureEvents,
  },{
    title: "Les évènements passés",
    data: pastEvents,
  }].filter(item => item.data.length > 0)

  return (
    <div>
      {nextData.map(section => (
        <Fragment key={section.title}>
        <h2 className={`text-gray-700 dark:text-white text-3xl lg:text-4xl font-semibold title-font mb-5 transition-all duration-150 ease-out ${titleColorClasses[theme.color]}`}>
          {section.title}
        </h2>
        <div className="md:grid gap-6 grid-cols-2 py-10">
          {section.data.map((postData) => {
            const post = postData.node;
            const startDate = new Date(post.startDate);
            const endDate = new Date(post.endDate)
            let formattedStartDate = "";
            if (!isNaN(startDate.getTime())) {
              formattedStartDate = new Intl.DateTimeFormat('fr').format(startDate);
            }
            let formattedEndDate = '';
            if (!isNaN(endDate.getTime())) {
              formattedEndDate = new Intl.DateTimeFormat('fr').format(endDate);
            }
            return (
              <Link
                key={post._sys.filename}
                href={`/agenda/` + post._sys.filename}
                className="group flex block mb-8 last:mb-0 bg-white dark:bg-gray-1000 rounded-md shadow-sm transition duration-150 ease-out hover:shadow-md hover:bg-slate-50 dark:hover:bg-gray-800 focus:shadow-md focus:bg-slate-50 dark:focus:bg-gray-800"
              >
                {post.heroImg && (
                  <Image
                    src={post.heroImg}
                    alt=""
                    className="object-cover"
                    width={300}
                    height={300}
                  />
                )}
                <div className="px-6 sm:px-8 md:px-10 py-10">
                  <h3
                    className={`text-gray-700 dark:text-white text-xl lg:text-2xl font-semibold title-font mb-5 transition-all duration-150 ease-out ${
                      titleColorClasses[theme.color]
                    }`}
                  >
                    {post.title}{" "}
                    <span className="inline-block opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                      <BsArrowRight className="inline-block h-8 -mt-1 ml-1 w-auto opacity-70" aria-hidden />
                    </span>
                  </h3>
                  {post.excerpt && (
                    <div className="prose dark:prose-dark w-full max-w-none mb-5 opacity-70">
                      <TinaMarkdown content={post.excerpt} components={components}/>
                    </div>
                  )}
                  <div className="flex items-center flex-wrap gap-2">
                    <p className="flex gap-1">
                      {formattedStartDate !== "" && (
                        <span className="text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150 whitespace-nowrap">
                          {formattedStartDate}
                        </span>
                      )}
                      {formattedEndDate !== "" && (formattedStartDate !== formattedEndDate) && (
                        <>
                          <BiRightArrowAlt
                            className="size-6 text-gray-200 dark:text-gray-500"
                            aria-hidden
                          />
                          <span className="text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150">
                            {formattedEndDate}
                          </span>
                        </>
                      )}
                      </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Fragment>
      ))}
    </div>
  );
}
