// Anton's code - use apollo-boost with all available utils
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
  defaultOptions: 
    {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
});

export default client;
