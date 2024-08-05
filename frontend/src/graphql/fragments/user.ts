import { graphql } from "../../gql";

export const UserFragment = graphql(`
  fragment UserFields on User {
    id
    username
    createdAt
  }
`);
