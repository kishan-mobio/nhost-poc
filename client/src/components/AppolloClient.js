import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { nhost } from "../nhost";
import { setContext } from "@apollo/client/link/context";

// HTTP link for queries & mutations
const authLink = setContext(async (_, { headers }) => {
  const token = await nhost.auth.getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: nhost.graphql.getUrl(), // Fetch Nhost GraphQL URL
});

// Use authLink to set headers
const link = authLink.concat(httpLink);

// WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: nhost.graphql.getUrl().replace("https", "wss"), // Convert HTTPS to WSS
    connectionParams: async () => ({
      headers: {
        authorization: `Bearer ${await nhost.auth.getAccessToken()}`,
      },
    }),
  })
);

// Use WebSocket for subscriptions, HTTP for everything else
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  link
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
