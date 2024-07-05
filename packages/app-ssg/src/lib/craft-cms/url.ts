import path from 'node:path';

export const homepageUrl = '__home__';

export default function url(uri?: string): string | undefined {
  if (uri === undefined) {
    return undefined;
  }

  if (uri === homepageUrl) {
    return '/';
  }

  return path.normalize(`/${uri}`);
}
