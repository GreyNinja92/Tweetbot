import { graphql } from "../../gql";
import { UserFragment } from "../fragments/user";

export const postMutation = graphql(`
  mutation CreatePost($userId: Float!, $title: String!) {
    createPost(user_id: $userId, title: $title) {
      id
      title
      user {
        ...UserFields
      }
    }
  }
`);
