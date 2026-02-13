import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import type { PageQuery, PageQueryVariables } from "../__generated__/types";
import { Blocks } from "../../src/components/react/blocks";
import {
  getHrefFromRelativePath,
  getRelativeUrl,
  removeEndSlash,
} from "../../src/components/react/utils";
import { BsChevronRight } from "react-icons/bs";

type Props = {
  variables: PageQueryVariables;
  data: PageQuery;
  query: string;
  nav: any;
  pathname: string;
};

const TinaPage = (props: Props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const menuWithSubmenu = props.nav.find(
    (item) =>
      (item?.href === getRelativeUrl(removeEndSlash(props.pathname)) &&
        item.submenu) ||
      item.submenu?.some(
        (subItem) =>
          getHrefFromRelativePath(subItem.submenuItem.id) ===
          getRelativeUrl(removeEndSlash(props.pathname))
      )
  );

  const { page } = data;

  return (
    <>
      {menuWithSubmenu !== undefined && (
        <nav className="mx-auto w-full max-w-7xl">
          <ul className="flex items-center border border-gray-100 bg-white rounded-b-lg">
            <li>
              <a
                className={`block px-6 py-4 font-medium hover:text-yellow-500${
                  page.id.includes(menuWithSubmenu.href) && " text-yellow-500"
                }`}
                href={getRelativeUrl(menuWithSubmenu.href)}
              >
                {menuWithSubmenu.label}
              </a>
            </li>
            {menuWithSubmenu.submenu.map((item, index) => (
              <React.Fragment key={item.submenuItem.id}>
                <li role="presentation" className="text-gray-300" aria-hidden>
                  {index === 0 ? <BsChevronRight /> : "|"}
                </li>
                <li>
                  <a
                    className={`block px-6 py-4 hover:text-yellow-500${
                      page.id.includes(item.submenuItem.id) &&
                      " text-yellow-500"
                    }`}
                    href={getHrefFromRelativePath(item.submenuItem.id)}
                  >
                    {item.submenuItem.title}
                  </a>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </nav>
      )}
      <main className="grow md:grid grid-cols-[1fr_minmax(0,80rem)_1fr] place-content-start *:col-2 *:mx-auto mx-auto md:mx-0 px-6 py-4 sm:py-16 lg:py-24">
        <h1
          data-tina-field={tinaField(page, "title")}
          className="mb-6 lg:mb-10 text-3xl sm:text-4xl lg:text-5xl font-extrabold
				tracking-normal text-center title-font bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-yellow-500"
        >
          {page.title}
        </h1>
        <Blocks {...page} />
      </main>
    </>
  );
};

export default TinaPage;
