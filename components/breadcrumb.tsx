import * as React from "react";
import Link from "next/link"
import { BsChevronRight } from "react-icons/bs"
import { cn } from "@/lib/utils";

function getList(data) {
  const home = {
    href:"/",
    label:"Accueil"
  }
  if (data.agendaConnection) {
    return [home, {
      href:"/agenda",
      label: "Agenda",
    }]
  }
  if (data.postConnection) {
    return [home, {
      href:"/posts",
      label: "Actualités",
    }]
  }
  if (data.data.agenda) {
    return [home, {
      href:"/agenda",
      label: "Agenda",
    }, {
      label: data.data.agenda.title,
    }]
  }
  if (data.data.post) {
    return [home, {
      href:"/posts",
      label: "Actualités",
    }, {
      label: data.data.post.title,
    }]
  }
  if (data.data.page?.title) {
    return [home, {
      label: data.data.page.title,
    }]
  }
  return null;
}

export default function Breadcrumb({ data }) {
  const list = getList(data);

  if (list === null) {
    return null;
  }

  const total = list.length - 1;

  return (
    <ol className={cn("w-full flex flex-wrap items-center gap-1.5 break-words text-sm text-gray-400 sm:gap-2.5")}>
      {list.map((item, index) => (
        <React.Fragment key={item.label}>
          <li className="inline-flex items-center gap-1.5">
            {index !== total && "href" in item && (
              <Link className="transition-colors hover:text-gray-900 focus:text-gray-700" href={item.href}>{item.label}</Link>
            )}
             {index === total && (
              <span
                role="link"
                aria-disabled="true"
                aria-current="page"
                className="font-normal text-gray-700"
              >
                {item.label}
              </span>
            )}
          </li>
          {index !== total && (
            <li
              role="presentation"
              aria-hidden
            >
             <BsChevronRight className="size-2" />
          </li>
          )}
        </React.Fragment>
      ))}
    </ol>
  )
}