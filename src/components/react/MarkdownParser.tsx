import { ExternalLink } from "lucide-react";
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
        h2: (props) => {
          const id = props?.children.props.content.map(item => item.text?.split(' ').join('-').trim().toLowerCase()).join('-')
          return (
          <h2 id={id} className="scroll-mt-20"> 
            <a href={`#${id}`} className="no-underline hover:after:content-['#'] after:ms-2 after:text-foreground/60">{props.children}</a>
          </h2>
        )},
        h3: (props) => {
          const id = props?.children.props.content.map(item => item.text?.split(' ').join('-').trim().toLowerCase()).join('-')
          return (
          <h3 id={id} className="scroll-mt-20"> 
            <a href={`#${id}`} className="no-underline hover:after:content-['#'] after:ms-1 after:text-foreground/60">{props.children}</a>
          </h3>
        )},
        a: ({ url, children }) => {
          if (url.startsWith("http")) {
            return (
              <a
                rel="noopener noreferrer"
                target="_blank"
                className="inline flex-wrap align-baseline no-underline"
                href={url}
              >
                <span className="underline [&>img]:inline">{children}</span>{" "}
                <ExternalLink
                  className="size-4 inline align-baseline"
                  aria-hidden
                />
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
