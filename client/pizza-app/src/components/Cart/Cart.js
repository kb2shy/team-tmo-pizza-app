import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Button,
  Container,
  Form,
  Row,
  Col,
  Table,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

// actions
import { setMenu } from '../../actions/menu';
import { setGuest } from '../../actions/guest';

import OrderSummary from '../OrderSummary/OrderSummary';

// note: this can be put into .css later
const centerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

/**
 * Cart page component
 * - displays a cart with user or guest information, and pizza information
 *
 * @param {*}  setGuest - action for guest reducer
 * @param {*}  setMenu - action for menu reducer
 * @param {*}  step - menu reducer state
 * @param {*}  isAuthenticated - auth reducer state
 * @param {*}  user - user reducer
 */
const Cart = ({ setGuest, setMenu, step, isAuthenticated, user }) => {
  const [guestData, setGuestData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });

  // ensures all input fields are entered
  const isValid =
    guestData.first_name.length !== 0 &&
    guestData.last_name.length !== 0 &&
    guestData.email.length !== 0 &&
    guestData.phone.length !== 0;

  // adds guest and their information to the store's state
  const handleClickSubmit = (e) => {
    e.preventDefault();
    const first_name = guestData.first_name.trim();
    const last_name = guestData.last_name.trim();
    const email = guestData.email.trim();
    const phone = guestData.phone.trim();

    setGuest({ first_name, last_name, email, phone });

    // don't go anywhere
    return '';

    // for integrating with the rest of the app
    // return setMenu(5);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setGuestData((d) => ({ ...d, [name]: value }));
  };

  // User view: prints user information
  const renderUserDisplay = () => {
    return (
      <Table borderless>
        <tbody>
          <tr id="Name">
            <td>Name : </td>
            <td>{user.first_name + ' ' + user.last_name}</td>
          </tr>
          <tr id="Email">
            <td>Email : </td>
            <td>{user.email}</td>
          </tr>
          <tr id="Phone">
            <td>Phone : </td>
            <td>{user.phone}</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  // Guest view: displays a form for inputting information
  const renderGuestInput = () => {
    return (
      <Form>
        <Form.Group as={Row} controlId="formHorizontalName">
          <Form.Label column sm={2}>
            Name :
          </Form.Label>
          <Col>
            <Form.Control
              name="first_name"
              type="text"
              placeholder="first name"
              value={guestData.first_name}
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Control
              name="last_name"
              type="text"
              placeholder="last name"
              value={guestData.last_name}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email :
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="email"
              type="email"
              placeholder="email"
              value={guestData.email}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPhone">
          <Form.Label column sm={2}>
            Phone :
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="phone"
              type="text"
              placeholder="phone"
              value={guestData.phone}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>
      </Form>
    );
  };

  // Conditional rendering dependent on if guest or user
  const customerSummary = () => {
    if (!isAuthenticated || user === null) {
      return renderGuestInput();
    } else {
      return renderUserDisplay();
    }
  };

  return (
    <div>
      <div style={centerStyle} id="title-cart">
        <h2>Cart</h2>
      </div>
      <div style={centerStyle} id="subtitle-review-your-order-below">
        <h2>Review your order below</h2>
      </div>
      <div
        style={centerStyle}
        id="description-all-orders-carry-out-pay-in-store"
      >
        <p>All orders are carry out and pay in store</p>
      </div>

      <Container>
        <Row>
          <Col>
            <h2>Order for:</h2>
            {customerSummary()}
          </Col>
          <Col>
            <h2>Pizza Order Summary:</h2>
            <OrderSummary />
          </Col>
        </Row>
      </Container>
      <div style={centerStyle} id="submit-button">
        <Button
          variant="primary"
          onClick={handleClickSubmit}
          disabled={!isValid}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // default (for anyone)
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    guest: state.guest,
    step: state.menu.step,

    // dummy data: user
    // isAuthenticated: true,
    // user: {
    //   first_name: 'barney',
    //   last_name: 'dino',
    //   email: 'barn@gmail.com',
    //   phone: '1234',
    // },
  };
};

export default connect(mapStateToProps, { setGuest, setMenu })(Cart);
