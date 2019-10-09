import ApolloClient from 'apollo-boost';

const isStaging =
  typeof process.env.APP_SETTINGS_FILE === 'string' &&
  process.env.APP_SETTINGS_FILE.includes('staging');
const client = new ApolloClient({
  uri:
    typeof process.env.APP_SETTINGS_FILE === 'string' &&
    process.env.APP_SETTINGS_FILE.includes('local')
      ? `http://localhost:8080/v1/graphql`
      : `https://graphql-${
          isStaging ? 'staging' : 'production'
        }.bounties-network-flow.com/v1/graphql`
});

export default client;
