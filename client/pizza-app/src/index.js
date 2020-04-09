import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./configureStore";
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./components/App/App";


const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000/graphql' }),
  onError: ({networkError, graphqlErrors}) => {
    console.log(networkError)
    console.log(graphqlErrors)
  },
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
  <Provider store={store}>
    <App />
  </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
