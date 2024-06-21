const sectionHandle = "exampleStructure";

const query = `{
  entries (section: "${sectionHandle}") {
    children {
      id
      title
      uri
    }
    parent {
      id
      title
      uri
    }
    sectionHandle
    title
    uri
  }
}`

interface Child {
  id: number;
  title: string;
  uri: string;
}

interface Parent {
  id: number;
  title: string;
  uri: string;
}

export interface Entry {
  children: Child[];
  parent: Parent;
  sectionHandle: string;
  title: string;
  uri: string;
}

const uriPrefix = "example-structure";

const config = { query, sectionHandle, uriPrefix };

export default config;
