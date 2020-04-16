// Anton's code - use apollo-boost with all available utils
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";

//doesn't cache queries
const DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache'
  },
  query: {
    fetchPolicy: 'no-cache'
  },
}

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
  defaultOptions: DefaultOptions
});

export default client;
