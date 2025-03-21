import React from "react";
import { cn } from "@/lib/utils";

export const Container = ({
  children,
  size = "medium",
  width = "large",
  className = "",
  ...props
}) => {
  const verticalPadding = {
    custom: "",
    small: "py-8",
    medium: "py-12",
    large: "py-4 sm:py-16 lg:py-24",
    default: "py-12",
  };
  const widthClass = {
    small: "max-w-4xl",
    medium: "max-w-5xl",
    large: "max-w-7xl",
    custom: "max-w-7xl",
  };

  return (
    <div
      className={cn(
        widthClass[width],
        `mx-auto px-6 sm:px-0`,
        verticalPadding[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
