import * as React from "react";
import {
  getHrefFromRelativePath,
  getRelativeUrl,
  removeEndSlash,
} from "./utils";
import { BsChevronRight } from "react-icons/bs";
import { cn } from "@/lib/utils";

export default function HeaderSubNav({ data, pathname }) {
  const menuWithSubmenu = data.global.header.nav?.find(
    (item) =>
      (item?.href === getRelativeUrl(removeEndSlash(pathname)) &&
        item.submenu) ||
      item.submenu?.some(
        (subItem) =>
          getHrefFromRelativePath(subItem.submenuItem.id) ===
          getRelativeUrl(removeEndSlash(pathname))
      )
  );

  if (!menuWithSubmenu) {
    return null;
  }

  return (
    <nav className="md:sticky top-0 z-10 mx-auto w-full">
      <ul className="flex flex-wrap items-center border border-gray-100 bg-white rounded-b-lg">
        <li>
          {menuWithSubmenu.href ? (
            <a
              className={cn(
                "block p-2 md:py-4 xl:px-6 font-medium hover:text-yellow-500",
                getRelativeUrl(removeEndSlash(pathname)) ===
                  getRelativeUrl(removeEndSlash(menuWithSubmenu.href)) &&
                  "text-yellow-500"
              )}
              href={getRelativeUrl(menuWithSubmenu.href)}
            >
              {menuWithSubmenu.label}
            </a>
          ) : (
            <span className="block p-2 md:py-4 xl:px-6 font-medium ">
              {menuWithSubmenu.label}
            </span>
          )}
        </li>
        {menuWithSubmenu.submenu.map((item, index) => (
          <React.Fragment key={item.submenuItem.id}>
            <li role="presentation" className="text-gray-300" aria-hidden>
              {index === 0 ? <BsChevronRight /> : "|"}
            </li>
            <li>
              <a
                className={`block p-2 md:py-4 xl:px-4 hover:text-yellow-500${
                  getRelativeUrl(removeEndSlash(pathname)) ===
                    getHrefFromRelativePath(
                      removeEndSlash(item.submenuItem.id)
                    ) && " text-yellow-500"
                }`}
                href={getHrefFromRelativePath(
                  removeEndSlash(item.submenuItem.id)
                )}
              >
                {item.submenuItem.title}
              </a>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
}
