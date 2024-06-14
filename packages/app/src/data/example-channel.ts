import type { ExampleChannelEntry } from '@env.d.ts';

const entries: Array<ExampleChannelEntry> = [{"slug":"new-entry","title":"new entry","uri":"example-channel/new-entry"},{"slug":"example-channel-entry","title":"Example Channel Entry","uri":"example-channel/example-channel-entry"}];

const uriPrefix: string = 'example-channel/';

const staticPaths = [{"params":{"slug":"new-entry"}},{"params":{"slug":"example-channel-entry"}}];

export { entries, staticPaths, uriPrefix };