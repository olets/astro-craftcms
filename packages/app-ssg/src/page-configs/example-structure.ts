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
  title: string;
  uri: string;
}

export const hasDynamicRoutes = true;

export const query = `{
  entries (section: "exampleStructure") {
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
    title
    uri
  }
}`;

export const uriPrefix = 'example-structure';