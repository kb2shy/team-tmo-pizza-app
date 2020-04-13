import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container } from 'react-bootstrap';

import AppNavbar from '../AppNavbar/AppNavbar';
import BackButton from '../BackButton/BackButton';
import Home from '../Home/Home';
import OrderChoice from '../OrderChoice/OrderChoice';
import OrderHistory from '../OrderHistory/OrderHistory';
import CreatePizza from '../CreatePizza/CreatePizza';
import Cart from '../Cart/Cart';
import Confirmation from '../Confirmation/Confirmation';
import Register from '../Register/Register';

import { loadCustomer } from '../../actions/auth';
import { getToppings } from '../../actions/database';

import classes from './App.module.css';

// This example is for how to use graphql to persist data to backend.
// import Example from "./example";

class App extends Component {
  constructor(props) {
    super(props);
    this.getViewState = this.getViewState.bind(this);
  }

  componentDidMount() {
    // Check user token in local storage and load authenticated user
    this.props.loadCustomer();
    //Get all possible toppings - necessary to get past topping orders
    this.props.getToppings('veggies');
    this.props.getToppings('meats');
  }

  /* Render Home, Main, or a preferred component based on the step of the menu */
  getViewState() {
    switch (this.props.step) {
      case 1:
        return this.props.isAuthenticated ? <OrderChoice /> : <Home />;
      case 2:
        return <OrderHistory />;
      case 3:
        return <CreatePizza />;
      case 4:
        return <Cart />;
      case 5:
        return <Confirmation />;
      case 6:
        return <Register />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div data-test="component-App" className={classes.main}>
        <div className={classes.header}>
          <AppNavbar />
          <BackButton />
        </div>
        <div className={classes.container}>
          {/* code to see example connection to send data to db */}
          {/* <Example></Example> */}
          {/* Render Home, Main, or a preferred component based on the step of the menu */}
          {this.getViewState()}
          {/* <Register></Register> */}
          {/* <Login></Login> */}
          {/* <Logout></Logout> */}
          {/* <CreatePizza /> */}
          <Cart />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  step: state.menu.step,
  isAuthenticated: state.auth.isAuthenticated,
});

App.propTypes = {
  step: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loadCustomer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { loadCustomer, getToppings })(App);
