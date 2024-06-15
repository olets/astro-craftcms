import type { ExampleStructureEntry } from '@env.d.ts';

const entries: Array<ExampleStructureEntry> = [{"slug":"example-structure-entry-level-1","title":"Example Structure Entry, Level 1","uri":"example-structure/example-structure-entry-level-1"},{"slug":"example-structure-entry-level-2","title":"Example Structure Entry, Level 2","uri":"example-structure/example-structure-entry-level-2"}];

const uriPrefix: string = 'example-structure/';

const staticPaths = [{"params":{"slug":"example-structure-entry-level-1"}},{"params":{"slug":"example-structure-entry-level-2"}}];

export { entries, staticPaths, uriPrefix };