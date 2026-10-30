import type { ReactElement, ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import type { Maybe, Scalars } from "tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { slugify } from "./utils";

function getText(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(getText).join("");
  }

  if (!value || typeof value !== "object") {
    return "";
  }

  const node = value as {
    text?: unknown;
    children?: unknown;
    content?: unknown;
    props?: unknown;
  };

  if (typeof node.text === "string") {
    return node.text;
  }

  return getText(node.children ?? node.content ?? node.props);
}

function renderHeading(
  tag: "h2" | "h3",
  children: ReactNode,
  className: string,
  linkClassName: string,
  enableLinks: boolean
) {
  const id = slugify(getText(children));
  const Heading = tag;

  return (
    <Heading id={id || undefined} className={className}>
      {id && enableLinks ? (
        <a
          href={`#${id}`}
          className={`${linkClassName} no-underline hover:after:content-['#'] after:text-foreground/60`}
        >
          {children}
        </a>
      ) : (
        children
      )}
    </Heading>
  );
}

export default function MarkdownParser({
  content,
  enableLinks = true,
}: {
  content: Maybe<Scalars["JSON"]["output"]>;
  enableLinks?: boolean;
}) {
  return (
    <TinaMarkdown
      content={content}
      components={{
        h2: (props: { children: ReactElement } | undefined) => {
          return renderHeading(
            "h2",
            props?.children ?? null,
            "scroll-mt-20",
            "after:ms-2",
            enableLinks
          );
        },
        h3: (props: { children: ReactElement } | undefined) => {
          return renderHeading(
            "h3",
            props?.children ?? null,
            "scroll-mt-20",
            "after:ms-1",
            enableLinks
          );
        },
        a: (
          props:
            | { url: string; children: ReactElement }
            | undefined
        ) => {
          if (!props) {
            return null;
          }

          const { url, children } = props;
          if (!enableLinks) {
            return <>{children}</>;
          }

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
