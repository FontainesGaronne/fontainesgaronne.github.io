import * as React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronRight } from "lucide-react";

export default function HeaderSubNav({ menu }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return (
    <nav className="md:sticky top-0 z-10 mx-auto w-full">
      <ul className="flex flex-wrap p-2 md:py-4 xl:px-4 gap-2 md:gap-4 xl:gap-6 items-center border border-gray-100 bg-white">
        <li>
          {menu.href ? (
            <a
              className={cn(
                "block text-sm lg:text-md font-medium hover:text-yellow-500",
                menu.isActive && "text-yellow-500"
              )}
              href={menu.href}
            >
              {menu.label}
            </a>
          ) : (
            <span className="block font-medium ">{menu.label}</span>
          )}
        </li>
        {menu.submenu.map((link, index) => (
          <React.Fragment key={`${link.label}-${link.href}`}>
            <li role="presentation" className="text-gray-300" aria-hidden>
              {index === 0 ? <ChevronRight /> : "|"}
            </li>
            <li>
              <a
                className={cn(
                  "block text-sm lg:text-md hover:text-yellow-500",
                  link.isActive && "text-yellow-500"
                )}
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
}
