import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Container, Form } from 'react-bootstrap';
import { setMenu } from '../../actions/menu';

import OrderSummary from '../OrderSummary/OrderSummary';

const Cart = (props) => {
  // to do: this button should also send inputted customer info to state, reducer customer OR guest now ig
  const handleClickSubmit = (e) => {
    e.preventDefault();
    return props.setMenu();
  };

  // print user information
  const displayUser = () => {
    return (
      <div>
        <p>
          Name: `${props.auth.user.first_name} ${props.auth.user.last_name}`
        </p>
        <br />

        <p>Email: `${props.auth.user.email}`</p>
        <br />

        <p>Phone: `${props.auth.user.phone}`</p>
        <br />
      </div>
    );
  };

  const customerSummary = () => {
    // Guest view: ask for input
    if (!props.auth.isAuthenticated) {
      return (
        <div>
          <label>Name</label>
          <input type="text" placeholder="first name" required />{' '}
          <input type="text" placeholder="last name" />
          <br />
          <label>Email</label>
          <input type="text" placeholder="email" />
          <br />
          <label>Phone</label>
          <input type="text" placeholder="phone" />
          <br />
        </div>
      );
    }

    // user view: print user's information
    else {
      displayUser();
    }
  };

  // double check if this is the right syntax for data-test naming
  return (
    <Container data-test="component-cart">
      <p>carry out and pay in store</p>
      {customerSummary()}
      {/* <Button onClick={handleClickSubmit}>Submit</Button>  */}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  // user view
  auth: state.auth,

  // dummy: guest
  //   auth: {
  //     user: {
  //       first_name: 'barney',
  //       last_name: 'dino',
  //       email: 'barn@gmail.com',
  //       phone: '1234',
  //     },
  //     isAuthenticated: false,
  //   },
});

export default connect(mapStateToProps, { setMenu })(Cart);
