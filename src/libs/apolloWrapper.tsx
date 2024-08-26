'use client';

import {
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import {
  ApolloClient as NextSSRApolloClient,
  InMemoryCache as NextSSRInMemoryCache,
  ApolloNextAppProvider,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";

function makeClient() {
  const httpLink = new HttpLink({
    uri: "https://countries.trevorblades.com/graphql",
  });

  const link = typeof window === "undefined"
    ? ApolloLink.from([
        new SSRMultipartLink({
          stripDefer: true,
        }),
        httpLink,
      ])
    : httpLink;

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}