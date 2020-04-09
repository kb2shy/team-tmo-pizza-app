import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Container } from "react-bootstrap";

import Home from "../Home/Home";

//this example is for how to use graphql to persist data to backend
import Example from "./example";

class App extends Component {
  constructor(props) {
    super(props);
    this.getViewState = this.getViewState.bind(this);
  }

  componentDidMount() {
    // Check user token in local storage
    this.props.loadUser();
  }

  /* Render Home, Main, or a preferred component based on the step of the menu */
  getViewState() {
    switch (this.props.step) {
      case 0:
        return <Home />;
      case 1:
      /*return <SomeComponent />*/
      default:
        return null;
    }
  }

  render() {
    return (
      <Container>
        {/* code to see example connection to send data to db */}
        <Example></Example>
        <div>App Component</div>
        {/* Render Home, Main, or a preferred component based on the step of the menu */}
        {this.getViewState()}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  step: state.menu.step,
});

const mapStateToProps = {
  step: PropTypes.number.isRequired,
  loadUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { loadUser })(App);
