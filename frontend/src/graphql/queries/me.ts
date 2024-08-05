import { graphql } from "../../gql";

export const userQuery = graphql(`
  query me {
    me {
      id
      username
      createdAt
    }
  }
`);
