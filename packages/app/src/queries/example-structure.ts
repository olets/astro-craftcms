const queryProps = {
  args: 'section: "exampleStructure"',
  fieldsBesidesUri: `title
    children {
      id
      title
      uri
    }
    parent {
      id
      title
      uri
    }`,
};

export default queryProps;
