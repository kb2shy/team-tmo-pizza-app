import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./configureStore";
import { ApolloProvider } from "react-apollo";

import apolloClient from "./configureApolloClient.js";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./components/App/App";

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
