
import path from "path";

export default function url(uri: string): string {
  return path.normalize(`/${uri}`.replace("__home__", ""));
}
