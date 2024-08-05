import { graphql } from "../../gql";
import { UserFragment } from "../fragments/user";

export const loginMutation = graphql(`
  mutation Login($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        ...UserFields
      }
    }
  }
`);
