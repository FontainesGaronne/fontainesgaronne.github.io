import * as React from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { BsX } from "react-icons/bs";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function HeaderMobileNav({
  menu,
  header,
  ...props
}: React.ComponentPropsWithRef<typeof Sheet> & {
  header: any;
  menu: any;
}) {
  const defaultOpen =
    document.cookie
      .split(";")
      .find((item) => item.includes(SIDEBAR_COOKIE_NAME))
      ?.split("=")
      .pop() === "true";

  const [open, _setOpen] = React.useState(defaultOpen);

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      _setOpen(openState);
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [, open]
  );

  return (
    <Sheet open={open} onOpenChange={setOpen} {...props}>
      <SheetTrigger render={<Button variant="outline">Menu</Button>} />
      <SheetContent
        data-sidebar="sidebar"
        data-slot="sidebar"
        data-mobile="true"
        className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
          } as React.CSSProperties
        }
      >
        <SheetHeader>
          <SheetTitle>{header?.name}</SheetTitle>
          {/* <SheetDescription>Menu</SheetDescription> */}
          <SheetClose
            className="absolute top-2 right-2"
            render={
              <Button size="icon" variant="ghost">
                <BsX aria-label="Fermer le menu" />
              </Button>
            }
          ></SheetClose>
        </SheetHeader>
        <Separator className="m-0" />
        <ul className="overflow-y-auto">
          {menu.map((link) =>
            link.submenu ? (
              <li
                key={`${link.href}-${link.label}`}
                className="px-4 my-2 first:pt-0"
              >
                {link.href ? (
                  <a
                    href={link.href}
                    className={cn(
                      "block text-sm font-medium hover:text-yellow-500",
                      link.isActive ||
                        (link.submenu?.some((item) => item.isActive) &&
                          "text-yellow-500")
                    )}
                  >
                    {link.label}
                  </a>
                ) : (
                  <span
                    className={cn(
                      "block text-sm font-medium",
                      link.isActive ||
                        (link.submenu?.some((item) => item.isActive) &&
                          "text-yellow-500")
                    )}
                  >
                    {link.label}
                  </span>
                )}
                <ul className="my-2 space-y-2 border-l">
                  {link.submenu.map((sublink) => (
                    <li key={sublink.href}>
                      <a
                        href={sublink.href}
                        className={cn(
                          "block px-4 py-2 text-sm font-medium text-gray-700 hover:text-yellow-500",
                          sublink.isActive && "text-yellow-500"
                        )}
                      >
                        {sublink.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li>
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-2 text-sm font-medium text-gray-700 hover:text-yellow-500",
                    link.isActive && "text-yellow-500"
                  )}
                >
                  {link.label}
                </a>
              </li>
            )
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
