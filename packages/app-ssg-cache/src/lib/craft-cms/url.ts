/**
 * Format a Craft entry's URI for use a local front end URL.
 *
 * @param uri
 * @returns
 */
export default function url(uri?: string): string | undefined {
  if (uri === undefined) {
    return undefined;
  }

  if (uri === '__home__') {
    return '/';
  }

  return `/${uri.replace(/^\//, '')}`;
}
