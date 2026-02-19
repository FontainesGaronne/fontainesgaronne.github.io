import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {
  getHrefFromRelativePath,
  getRelativeUrl,
  removeEndSlash,
} from "./utils";
import { BsChevronDown } from "react-icons/bs";

export default function HeaderNav({ menu, pathname }) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-1 flex-wrap">
        {menu
          .filter((link) => link !== null)
          .map((link) => {
            const submenu = link?.submenu?.map((item) => ({
              ...item,
              href: getHrefFromRelativePath(
                item?.submenuItem?._sys.relativePath
              ),
            }));
            const isActiveLink =
              getRelativeUrl(removeEndSlash(pathname)) ===
              getRelativeUrl(link.href);
            if (!submenu) {
              return (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    href={link.href}
                    className={cn("px-4", isActiveLink && "bg-yellow-100")}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            }

            return (
              <NavigationMenuItem key={`${link.label}-${link.href}`}>
                {link.href ? (
                  <NavigationMenuTrigger
                    className={cn(
                      (isActiveLink ||
                        submenu.some(
                          (item) =>
                            getRelativeUrl(item.href) ===
                            getRelativeUrl(removeEndSlash(pathname))
                        )) &&
                        "bg-yellow-100"
                    )}
                    render={
                      <NavigationMenuLink href={link.href}>
                        {link.label}
                        <BsChevronDown
                          className="relative top-px ml-1 size-3 transition duration-300 group-data-open/navigation-menu-trigger:rotate-180 group-data-popup-open/navigation-menu-trigger:rotate-180"
                          aria-label="Afficher le sous-menu"
                        />
                      </NavigationMenuLink>
                    }
                  />
                ) : (
                  <NavigationMenuTrigger
                    className={cn(
                      submenu.some(
                        (item) =>
                          getRelativeUrl(item.href) ===
                          getRelativeUrl(removeEndSlash(pathname))
                      ) && "bg-yellow-100"
                    )}
                  >
                    {link.label}
                  </NavigationMenuTrigger>
                )}
                <NavigationMenuContent>
                  <ul>
                    {submenu.map((item) => {
                      const isActiveSubLink =
                        getRelativeUrl(removeEndSlash(pathname)) ===
                        getRelativeUrl(item.href);
                      return (
                        <li
                          className="first:[&>a]:border-0  px-4"
                          key={item.submenuItem.id}
                        >
                          <a
                            className={cn(
                              "relative z-10 block border-t bg-white hover:text-yellow-500 focus:text-yellow-500 transition py-3",
                              isActiveSubLink && "text-yellow-500"
                            )}
                            href={item.href}
                          >
                            {item.submenuItem.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
