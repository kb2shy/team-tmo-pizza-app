// Anton's code - use apollo-boost with all available utils
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
});

// Abigail's code
// import ApolloClient from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { createHttpLink } from "apollo-link-http";

// const client = new ApolloClient({
//   link: createHttpLink({ uri: "http://localhost:4000/graphql" }),
//   onError: ({ networkError, graphqlErrors }) => {
//     console.log(networkError);
//     console.log(graphqlErrors);
//   },
//   cache: new InMemoryCache(),
// });

export default client;
