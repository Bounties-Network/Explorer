import ApolloClient from 'apollo-boost';
import cookie from 'cookie';

const cookies = cookie.parse(document.cookie);
const authCookie = cookies['Authorization'];

const isStaging =
  typeof process.env.APP_SETTINGS_FILE === 'string' &&
  process.env.APP_SETTINGS_FILE.includes('staging');

const client = new ApolloClient({
  headers: {
    Authorization: authCookie
  },
  uri:
    typeof process.env.APP_SETTINGS_FILE === 'string' &&
    process.env.APP_SETTINGS_FILE.includes('local')
      ? `http://localhost:8080/v1/graphql`
      : `https://graphql-${
          isStaging ? 'staging' : 'production'
        }.bounties-network-flow.com/v1/graphql`
});

export default client;
