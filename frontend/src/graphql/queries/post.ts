import { graphql } from "../../gql";
import { UserFragment } from "../fragments/user";

export const postsQuery = graphql(`
  query Posts {
    posts {
      id
      title
      createdAt
      user {
        ...UserFields
      }
    }
  }
`);
