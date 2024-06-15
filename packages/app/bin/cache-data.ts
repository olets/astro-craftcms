import type { ExampleChannelEntry, ExampleStructureEntry } from "@env.d.ts";
import { cacheData } from "./data.ts";
import exampleChannelQuery from "@pages/example-channel/query.ts"
import exampleStructureQuery from "@pages/example-structure/_/query.ts"

cacheData<ExampleChannelEntry>(exampleChannelQuery);

cacheData<ExampleStructureEntry>(exampleStructureQuery);
