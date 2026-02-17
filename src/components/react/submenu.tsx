import * as React from "react";
import { BsChevronDown } from "react-icons/bs";
import { cn, getRelativeUrl } from "./utils";

export default function SubMenu(props) {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();

  return (
    <>
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child, {
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
        })
      )}
      <button
        className="cursor-pointer"
        aria-expanded={open}
        aria-controls={id}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <BsChevronDown aria-hidden />
        <span className="sr-only">
          {open ? "Ouvrir" : "Fermer"} le sous-menu
        </span>
      </button>
      <ul
        className={cn(
          "absolute z-10 top-full w-max start-0",
          !open && "hidden"
        )}
        id={id}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {props.list.map((item) => {
          return (
            <li className="last:[&>a]:rounded-b-lg" key={item.submenuItem.id}>
              <a
                className={cn(
                  "block border bg-white hover:text-yellow-500 focus:text-yellow-500 border-gray-100 transition p-4",
                  getRelativeUrl(props.pathname) ===
                    getRelativeUrl(item.href) && "text-yellow-500"
                )}
                href={item.href}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
              >
                {item.submenuItem.title}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
