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

export function slugify(str: string) {
  str = str.trim()
  str = str.toLowerCase()
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  str = str.replace(/[^a-z0-9 -]/g, '')
  str = str.replace(/\s+/g, '-')
  str = str.replace(/-+/g, '-')

  return str
}
