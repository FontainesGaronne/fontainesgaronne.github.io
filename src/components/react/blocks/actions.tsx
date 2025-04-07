import * as React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { tinaField } from "tinacms/dist/react";

export const Actions = ({
  className = "",
  actions,
}: {
  className: string;
  actions: any[];
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-y-4 gap-x-6 ${className}`}>
      {actions &&
        actions.map(function (action, index) {
          let element = null;
          if (action.type === "button") {
            element = (
              <a key={index} href={action.link ? action.link : "/"}>
                <button
                  data-tina-field={tinaField(action)}
                  className="z-10 relative flex items-center px-7 py-3 font-semibold text-lg transition duration-150 ease-out  rounded-lg transform focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 whitespace-nowrap text-gray-800 bg-yellow-500 hover:bg-yellow-600 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500"
                >
                  {action.label}
                  {action.icon && (
                    <BiRightArrowAlt
                      className={`ml-1 -mr-1 w-6 h-6 opacity-80`}
                      aria-hidden
                    />
                  )}
                </button>
              </a>
            );
          }
          if (action.type === "link" || action.type === "linkExternal") {
            element = (
              <a
                key={index}
                href={action.link ? action.link : "/"}
                data-tina-field={tinaField(action)}
                className="group inline-flex items-center font-semibold text-lg transition duration-150 ease-out text-yellow-600  hover:text-yellow-400"
                style={{
                  textShadow: `0 3px 7px rgba(var(--color-rgb-blue-400),0.2)`,
                }}
              >
                {action.label}
                {action.icon && (
                  <BiRightArrowAlt className={`ml-0 mr-0 w-6 h-6 opacity-80`} aria-hidden />
                )}
              </a>
            );
          }
          return element;
        })}
    </div>
  );
};
