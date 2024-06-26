import path from "node:path";

export default function url(uri?: string): string|undefined {
  if (!uri) {
    return undefined;
  }
  
  return path.normalize(`/${uri}`.replace("__home__", ""));
}
