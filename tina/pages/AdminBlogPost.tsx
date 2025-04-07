import React from 'react';
import { tinaField, useTina } from "tinacms/dist/react";
import type { PostQuery, PostQueryVariables } from '../__generated__/types.ts';
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import FormattedDate from '../../src/components/react/FormattedDate.tsx';


type Props = {
	variables: PostQueryVariables;
	data: PostQuery;
	query: string;
}

export default function AdminBlogPost(props: Props) {

	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	const post = data.post;

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
          data-tina-field={tinaField(post, "author")}
          className="flex items-center justify-center mb-16"
        >
          {post.author && (
            <>
						 {post.author.avatar && (
								<div className="flex-shrink-0 mr-4">
									<img
										data-tina-field={tinaField(post.author, "avatar")}
										className="h-14 w-14 object-cover rounded-full shadow-sm"
										src={post.author.avatar}
										alt={post.author.name}
										width={500}
										height={500}
									/>
								</div>
							)}
              <p
                data-tina-field={tinaField(post.author, "name")}
                className="text-base font-medium text-gray-600 group-hover:text-gray-800"
              >
                {post.author.name}
              </p>
              <span className="font-bold text-gray-200 dark:text-gray-500 mx-2">
                —
              </span>
            </>
          )}
          <p
            data-tina-field={tinaField(post, "date")}
            className="text-base text-gray-400 group-hover:text-gray-500 "
          >
            <FormattedDate date={post.date} />
          </p>
        </div>

        {post.heroImg && (
          <div className="px-4 w-full">
            <div
              data-tina-field={tinaField(post, "heroImg")}
              className="relative max-w-4xl lg:max-w-5xl mx-auto"
            >
              <img
                src={post.heroImg}
                alt={post.title}
                className="absolute block rounded-lg w-full h-auto blur-2xl brightness-150 contrast-[0.9] saturate-200 opacity-50 mix-blend-multiply"
                aria-hidden="true"
                width={500}
                height={500}
              />
              <img
                src={post.heroImg}
                alt={post.title}
                width={500}
                height={500}
                className="relative z-10 mb-14 block rounded-lg w-full h-auto opacity-100"
              />
            </div>
          </div>
        )}

        <div
          data-tina-field={tinaField(post, "_body")}
          className="prose m-auto"
        >
          <TinaMarkdown content={post._body} />
        </div>
		</article>
	);
}
