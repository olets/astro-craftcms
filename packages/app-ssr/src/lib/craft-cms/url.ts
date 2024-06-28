import path from "node:path";

export default function url(uri?: string): string|undefined {
  if (uri === undefined) {
    return undefined;
  }

  if (uri === "__home__") {
    return "/";
  }
  
  return path.normalize(`/${uri}`);
}
