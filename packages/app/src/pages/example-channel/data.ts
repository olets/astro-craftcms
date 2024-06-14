import type { ExampleChannelEntry } from '@interfaces/example-channel-entry';

const entries: Array<ExampleChannelEntry> = [{"slug":"new-entry","title":"new entry","uri":"example-channel/new-entry"},{"slug":"example-channel-entry","title":"Example Channel Entry","uri":"example-channel/example-channel-entry"}];
const uriPrefix: string = 'example-channel/';
const staticPaths = [{"params":{"slug":"new-entry"},"props":{"entry":{"slug":"new-entry","title":"new entry","uri":"example-channel/new-entry"}}},{"params":{"slug":"example-channel-entry"},"props":{"entry":{"slug":"example-channel-entry","title":"Example Channel Entry","uri":"example-channel/example-channel-entry"}}}];
export { entries, staticPaths, uriPrefix };