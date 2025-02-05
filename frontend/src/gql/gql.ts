/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment UserFields on User {\n    id\n    username\n    createdAt\n  }\n": types.UserFieldsFragmentDoc,
    "\n  mutation Login($username: String!, $password: String!) {\n    login(options: { username: $username, password: $password }) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFields\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation CreatePost($userId: Float!, $title: String!) {\n    createPost(user_id: $userId, title: $title) {\n      id\n      title\n      user {\n        ...UserFields\n      }\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation Register($username: String!, $password: String!) {\n    register(options: { username: $username, password: $password }) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFields\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  query me {\n    me {\n      id\n      username\n      createdAt\n    }\n  }\n": types.MeDocument,
    "\n  query Posts {\n    posts {\n      id\n      title\n      createdAt\n      user {\n        ...UserFields\n      }\n    }\n  }\n": types.PostsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserFields on User {\n    id\n    username\n    createdAt\n  }\n"): (typeof documents)["\n  fragment UserFields on User {\n    id\n    username\n    createdAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($username: String!, $password: String!) {\n    login(options: { username: $username, password: $password }) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n    login(options: { username: $username, password: $password }) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePost($userId: Float!, $title: String!) {\n    createPost(user_id: $userId, title: $title) {\n      id\n      title\n      user {\n        ...UserFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($userId: Float!, $title: String!) {\n    createPost(user_id: $userId, title: $title) {\n      id\n      title\n      user {\n        ...UserFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($username: String!, $password: String!) {\n    register(options: { username: $username, password: $password }) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($username: String!, $password: String!) {\n    register(options: { username: $username, password: $password }) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me {\n    me {\n      id\n      username\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      id\n      username\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Posts {\n    posts {\n      id\n      title\n      createdAt\n      user {\n        ...UserFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query Posts {\n    posts {\n      id\n      title\n      createdAt\n      user {\n        ...UserFields\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;