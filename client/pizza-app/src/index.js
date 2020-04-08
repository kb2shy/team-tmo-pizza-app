import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./configureStore";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./components/App/App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
