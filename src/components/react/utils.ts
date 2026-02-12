import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRelativeUrl(href?: string | null) {
  if (!href) {
    return "";
  }
  if (href.startsWith("/")) {
    return href;
  }
  return `/${href}`;
}

export function getHrefFromRelativePath(relativePath?: string) {
  if (!relativePath) {
    return "/";
  }
  return getRelativeUrl(
    relativePath.replace(/^(.*)pages\//, "").replace(/\.mdx$/, "")
  );
}

export function removeEndSlash(str: string) {
  return str.endsWith("/") ? str.slice(0, -1) : str;
}