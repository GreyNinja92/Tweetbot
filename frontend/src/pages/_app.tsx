import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { Client, Provider, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import Navigation from "./Navigation";
import {
  CreatePostMutation,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  PostsDocument,
  PostsQuery,
  RegisterMutation,
} from "../gql/graphql";

const client = new Client({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    cacheExchange({
      updates: {
        Mutation: {
          post: (result: CreatePostMutation, args, cache, info) => {
            const newPost = result.createPost;
            cache.updateQuery(
              { query: PostsDocument },
              (data: PostsQuery | null) => {
                if (data !== null) {
                  return {
                    ...data,
                    posts: [newPost, ...data!.posts],
                  } as PostsQuery;
                }
                return data;
              },
            );
          },
          logout: (result: LogoutMutation, args, cache, info) => {
            cache.updateQuery({ query: MeDocument }, (data: MeQuery | null) => {
              return {
                me: null,
              };
            });
          },
          login: (result: LoginMutation, args, cache, info) => {
            cache.updateQuery({ query: MeDocument }, (data: MeQuery | null) => {
              if (result.login.errors) {
                return data;
              } else {
                return {
                  me: result.login.user,
                } as MeQuery;
              }
            });
          },
          register: (result: RegisterMutation, args, cache, info) => {
            cache.updateQuery({ query: MeDocument }, (data: MeQuery | null) => {
              if (result.register.errors) {
                return data;
              } else {
                return {
                  me: result.register.user,
                } as MeQuery;
              }
            });
          },
        },
      },
    }),
    fetchExchange,
  ],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Navigation />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
