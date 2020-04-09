import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container } from 'react-bootstrap';

import Home from '../Home/Home';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import CreatePizza from "../CreatePizza/CreatePizza";

import { loadCustomer } from '../../actions/auth';

//this example is for how to use graphql to persist data to backend
// import Example from "./example";

class App extends Component {
  constructor(props) {
    super(props);
    this.getViewState = this.getViewState.bind(this);
  }

  componentDidMount() {
    // Check user token in local storage
    this.props.loadCustomer();
  }

  /* Render Home, Main, or a preferred component based on the step of the menu */
  getViewState() {
    switch (this.props.step) {
      case 0:
        return <Home />;
      // case 1:
      //   return <SomeComponent />
      default:
        return null;
    }
  }

  render() {
    return (
      <Container data-test="component-App">
        {/* code to see example connection to send data to db */}
        {/* <Example></Example> */}
        <div>App Component</div>
        {/* Render Home, Main, or a preferred component based on the step of the menu */}
        {this.getViewState()}
        <Register></Register>
        <Login></Login>
        <Logout></Logout>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  step: state.menu.step,
});

App.propTypes = {
  step: PropTypes.number.isRequired,
  loadCustomer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { loadCustomer })(App);
