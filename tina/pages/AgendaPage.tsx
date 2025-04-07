import React from 'react';
import { tinaField, useTina } from "tinacms/dist/react";
import type { AgendaQuery, AgendaQueryVariables } from '../__generated__/types.ts';
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import EventDates from '../../src/components/react/eventDates.tsx';


type Props = {
	variables: AgendaQueryVariables;
	data: AgendaQuery;
	query: string;
}

export default function AdminBlogPost(props: Props) {

	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	const post = data.agenda;

	return (
		<article>
      <h1
        data-tina-field={tinaField(post, "title")}
        className="mb-6 lg:mb-10 text-3xl sm:text-4xl lg:text-5xl font-extrabold
				tracking-normal text-center title-font bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-500"
      >
        {post.title}
      </h1>
      <div
        data-tina-field={tinaField(post, "organizer")}
        className="mb-16 border bg-white border-gray-100 rounded-lg overflow-hidden"
      >
        {post.organizer && (
          <p className="flex items-center gap-2 px-4 py-2">
            <span>Organisé par : </span>
              {post.organizer.avatar && (
                <img
                  data-tina-field={tinaField(post.organizer, "avatar")}
                  loading='lazy'
                  className="size-14 object-cover rounded-full shadow-sm"
                  src={post.organizer.avatar}
                  alt=""
                  width={100}
                  height={100}
                />
              )}
            <span
              data-tina-field={tinaField(post.organizer, "name")}
              className="text-base font-medium text-gray-600 group-hover:text-gray-800"
            >
              {post.organizer.name}
            </span>
          </p>
        )}
        <EventDates
          startDate={new Date(post.startDate)}
          endDate={new Date(post.endDate)}
          tinaFieldStartDate={tinaField(post, "startDate")}
          tinaFieldEndDate={tinaField(post, "endDate")}
        />
      </div>

      
      <div className="md:flex gap-4">
        {post.heroImg && (
          <div className="px-4 w-full">
            <div
              data-tina-field={tinaField(post, "heroImg")}
              className="relative max-w-4xl lg:max-w-5xl mx-auto"
            >
              <img
                src={post.heroImg}
                alt=""
                className="absolute block rounded-lg w-full h-auto blur-2xl brightness-150 contrast-[0.9] saturate-200 opacity-50 mix-blend-multiply"
                width={500}
                height={500}
              />
              <img
                src={post.heroImg}
                alt=""
                width={500}
                height={500}
                className="relative z-10 mb-14 block rounded-lg w-full h-auto opacity-100"
              />
            </div>
          </div>
        )}
        {post._body.children.length > 0 && (
          <div
            data-tina-field={tinaField(post, "_body")}
            className="prose m-auto"
          >
            <TinaMarkdown content={post._body} />
          </div>
        )}
      </div>
		</article>
	);
}
