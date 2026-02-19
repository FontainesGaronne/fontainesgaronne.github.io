import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { BsChevronDown } from "react-icons/bs";
import { useIsMobile } from "@/hooks/use-mobile";
import { HeaderMobileNav } from "./headerMobileNav";

export default function HeaderNav({ header, menu }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <HeaderMobileNav header={header} menu={menu} />;
  }
  return (
    <NavigationMenu className="min-w-fit">
      <NavigationMenuList className="gap-1 flex-wrap">
        {menu.map((link) => {
          if (!link.submenu) {
            return (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  href={link.href}
                  className={cn("px-4", link.isActive && "bg-yellow-100")}
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
                    link.isActive ||
                      (link.submenu.some((item) => item.isActive) &&
                        "bg-yellow-100")
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
                    link.isActive ||
                      (link.submenu.some((item) => item.isActive) &&
                        "bg-yellow-100")
                  )}
                >
                  {link.label}
                </NavigationMenuTrigger>
              )}
              <NavigationMenuContent>
                <ul>
                  {link.submenu.map((item) => {
                    return (
                      <li className="first:[&>a]:border-0 px-4" key={item.id}>
                        <a
                          className={cn(
                            "relative z-10 block border-t bg-white hover:text-yellow-500 focus:text-yellow-500 transition py-3",
                            item.isActive && "text-yellow-500"
                          )}
                          href={item.href}
                        >
                          {item.label}
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
