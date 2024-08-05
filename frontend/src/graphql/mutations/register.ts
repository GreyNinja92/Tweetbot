import { graphql } from "../../gql";
import { UserFragment } from "../fragments/user";

export const registerMutation = graphql(`
  mutation Register($username: String!, $password: String!) {
    register(options: { username: $username, password: $password }) {
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
