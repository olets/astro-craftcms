
import path from "node:path";

export default function url(uri: string): string {
  return path.normalize(`/${uri}`.replace("__home__", ""));
}
