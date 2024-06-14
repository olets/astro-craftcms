import type { ExampleChannelEntry, ExampleStructureEntry } from "@env.d.ts";
import { cacheData } from "./data.ts";

cacheData<ExampleStructureEntry>("exampleStructure", "ExampleStructureEntry");
cacheData<ExampleChannelEntry>("exampleChannel", "ExampleChannelEntry");
