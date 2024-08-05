import { graphql } from "../../gql";

export const logoutMutation = graphql(`
  mutation Logout {
    logout
  }
`);
