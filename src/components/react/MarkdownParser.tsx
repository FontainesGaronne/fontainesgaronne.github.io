import { BsArrowUpRightSquare } from "react-icons/bs";
import type { Maybe, Scalars } from "tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function MarkdownParser({
  content,
}: {
  content: Maybe<Scalars["JSON"]["output"]>;
}) {
  return (
    <TinaMarkdown
      content={content}
      components={{
        a: ({ url, children }) => {
          if (url.startsWith("http")) {
            return (
              <a
                rel="noopener noreferrer"
                target="_blank"
                className="inline flex-wrap align-baseline no-underline"
                href={url}
              >
                <span className="underline">{children}</span>{" "}
                <BsArrowUpRightSquare className="inline align-baseline" />
                <span className="sr-only">
                  (lien externe, ouverture dans une nouvelle fenêtre)
                </span>
              </a>
            );
          }
          return <a href={url}>{children}</a>;
        },
      }}
    />
  );
}
