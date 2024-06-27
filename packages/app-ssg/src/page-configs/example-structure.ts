
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

export const uriPrefix = "example-structure";
