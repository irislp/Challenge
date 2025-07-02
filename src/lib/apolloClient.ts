import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

/** Apollo Client configuration for GraphQL API */
const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
