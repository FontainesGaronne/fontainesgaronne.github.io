export function getRelativeUrl(href?: string | null) {
  if (!href || typeof href !== "string") {
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
