import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import cookie from 'cookie';

const authCookie = () => {
  const cookies = cookie.parse(document.cookie);
  return cookies['Authorization'];
};

const isStaging =
  typeof process.env.APP_SETTINGS_FILE === 'string' &&
  process.env.APP_SETTINGS_FILE.includes('staging');

// Create an http link:
const httpLink = new HttpLink({
  headers: {
    Authorization: authCookie()
  },
  uri:
    typeof process.env.APP_SETTINGS_FILE === 'string' &&
    process.env.APP_SETTINGS_FILE.includes('local')
      ? `http://localhost:8080/v1/graphql`
      : `https://graphql-${
          isStaging ? 'staging' : 'production'
        }.bounties-network-flow.com/v1/graphql`,
  credentials: 'include'
});
// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri:
    typeof process.env.APP_SETTINGS_FILE === 'string' &&
    process.env.APP_SETTINGS_FILE.includes('local')
      ? `ws://localhost:8080/v1/graphql`
      : `wss://graphql-${
          isStaging ? 'staging' : 'production'
        }.bounties-network-flow.com/v1/graphql`,
  options: {
    lazy: true,
    reconnect: true,
    connectionParams: {
      headers: { Authorization: authCookie() }
    }
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

let client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export function reInitClient() {
  client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });
  return client;
}

export default client;
