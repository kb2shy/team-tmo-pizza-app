import React, { Component } from "react";
import { connect } from "react-redux";

import { Container } from "react-bootstrap";

import Home from "../Home/Home";

class App extends Component {
  constructor(props) {
    super(props);
    // this.getViewState = this.getViewState.bind(this);
  }

  componentDidMount() {
    // Check user token in local storage
    // If logged in, update step to 3; if not logged in, step will be 0
  }

  /* Render Home, Main, or a preferred component based on the step of the menu */
  getViewState = () => {
    switch (this.props.step) {
      case 0:
        return <Home />;
      case 1:
        /*return <SomeComponent />*/
      default:
        return <Home />;
    }
  }

  render() {
    return (
      <Container data-test="component-App">
        <h1>App Component</h1>
        {/* Render Home, Main, or a preferred component based on the step of the menu */}
        {this.getViewState()}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  step: state.menu.step,
});

export default connect(mapStateToProps)(App);
