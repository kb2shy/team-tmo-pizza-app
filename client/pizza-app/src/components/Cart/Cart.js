import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, Form, Row, Col, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Custom Styling
import StyledButton from '../common/Button/StyledButton';
import StyledTitle from '../common/Title/StyledTitle';

// actions
import { setMenu, previousMenu } from '../../actions/menu';
import { setGuest } from '../../actions/guest';
import { clearPizza } from '../../actions/pizza';
import { clearPizzas } from '../../actions/pizzas';
import { createGuestOrder, createMemberOrder } from '../../actions/order';

import './Cart.css';
import OrderSummary from './OrderSummary/OrderSummary';
import AppSpinner from '../AppSpinner/AppSpinner';

import isAlpha from 'validator/lib/isAlpha';
import isEmail from 'validator/lib/isEmail';

/**
 * Cart page component
 * - displays a cart with user or guest information, and pizza information
 *
 * @param {*}  setGuest - action for guest reducer
 * @param {*}  setMenu - action for menu reducer
 * @param {*}  step - menu reducer state
 * @param {*}  isAuthenticated - auth reducer state
 * @param {*}  user - user reducer
 * @param {*}  clearPizzas - clears the pizzas
 */
const Cart = ({
  setGuest,
  setMenu,
  isAuthenticated,
  user,
  clearPizza,
  clearPizzas,
  createGuestOrder,
  createMemberOrder,
  order,
  previousMenu,
  pizzas,
}) => {

  const [guestData, setGuestData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });

  const [touched, setTouched] = useState({
    first_name: false,
    last_name: false,
    email: false,
    phone: false
  });

  function isValidPhoneNumber(phone) {
    const test1 = /^\d{10}$/;
    const test2 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.match(test1) || phone.match(test2)) {
      return true;
    }
    return false;
  }

  const userDoesNotExist = !isAuthenticated || user === null;

  // Conditional check:
  // Guest view: ensures all input fields are entered
  // User view: true, all fields are pulled from store
  let isValid =
    guestData.first_name.length !== 0 &&
    guestData.last_name.length !== 0 &&
    guestData.email.length !== 0 &&
    guestData.phone.length !== 0;

  // Adds guest and their information to the store's state
  // Directs user to the Confirmation page
  const handleClickSubmit = (e) => {
    e.preventDefault();
    const first_name = guestData.first_name.trim();
    const last_name = guestData.last_name.trim();
    const email = guestData.email.trim();
    const phone = guestData.phone.trim();

    const guest = { first_name, last_name, email, phone };
    setGuest(guest);

    if (isAuthenticated) {
      createMemberOrder(() => {
        clearPizzas();
        setMenu(5);
      });
    } else {
      createGuestOrder(guest, () => {
        clearPizzas();
        setMenu(5);
      });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`Cart.js: handleChange: [name]:value = ${name}:${value}`)
    setGuestData((d) => ({ ...d, [name]: value }));
  };

  // User view: prints user information in a table
  const renderUserDisplay = () => {
    return (
      <Table borderless>
        <tbody>
          <tr id="Name">
            <td>Name: </td>
            <td>{user.first_name + ' ' + user.last_name}</td>
          </tr>
          <tr id="Email">
            <td>Email: </td>
            <td>{user.email}</td>
          </tr>
          <tr id="Phone">
            <td>Phone: </td>
            <td>{user.phone}</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  // Guest view: displays a form for inputting information
  const renderGuestInput = () => {
    return (
      <Form className="cartOrderFormContainer">
        <Form.Group as={Row} controlId="formHorizontalName">
          <Form.Label column sm={2}>
            Name:
          </Form.Label>
          <Col>
            <Form.Control
              className="cartOrderFormInput"
              name="first_name"
              type="text"
              placeholder="first name"
              value={guestData.first_name}
              onChange={handleChange}
              isInvalid={touched.first_name && !isAlpha(guestData.first_name)}
              isValid={isAlpha(guestData.first_name)}
              onBlur={() => { setTouched({ first_name: true }) }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid first name.
        </Form.Control.Feedback>
            <Form.Control.Feedback>
              Looks good!
        </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Control
              className="cartOrderFormInput"
              name="last_name"
              type="text"
              placeholder="last name"
              value={guestData.last_name}
              onChange={handleChange}
              isInvalid={touched.last_name && !isAlpha(guestData.last_name)}
              isValid={isAlpha(guestData.last_name)}
              onBlur={() => { setTouched({ last_name: true }) }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid last name.
        </Form.Control.Feedback>
            <Form.Control.Feedback>
              Looks good!
        </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              className="cartOrderFormInput"
              name="email"
              type="email"
              placeholder="email"
              value={guestData.email}
              onChange={handleChange}
              onChange={handleChange}
              isInvalid={touched.email && !isEmail(guestData.email)}
              isValid={isEmail(guestData.email)}
              onBlur={() => { setTouched({ email: true }) }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
        </Form.Control.Feedback>
            <Form.Control.Feedback>
              Looks good!
        </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPhone">
          <Form.Label column sm={2}>
            Phone:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              className="cartOrderFormInput"
              name="phone"
              type="text"
              placeholder="phone"
              value={guestData.phone}
              onChange={handleChange}
              isInvalid={touched.phone && !isValidPhoneNumber(guestData.phone)}
              isValid={isValidPhoneNumber(guestData.phone)}
              onBlur={() => { setTouched({ phone: true }) }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid phone number.
        </Form.Control.Feedback>
            <Form.Control.Feedback>
              Looks good!
        </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Form>
    );
  };

  // Conditional rendering dependent on if guest or user
  const customerSummary = () => {
    if (userDoesNotExist) {
      return renderGuestInput();
    } else {
      isValid = true;
      return renderUserDisplay();
    }
  };

  // Calculates the total price of all orders in the cart
  const calcTotalPrice = () => {
    let total = 0;
    for (let pizza of pizzas) {
      total += pizza.totalPrice;
    }
    return total.toFixed(2);
  };

  const handleAddAnotherPizza = (e) => {
    e.preventDefault();
    clearPizza();
    previousMenu();
  };

  return (
    <div>
      <StyledTitle text="Cart" className="CartTitle" />

      <div className="centerStyle">
        <h2>Review your order below</h2>
      </div>
      <div className="centerStyle">
        <p>All orders are carry out and pay in store</p>
      </div>

      <Container>
        <Row className="cartOrderFormContainerRow">
          <Col className="cartOrderFormContainerWrapper">
            <h2 className="cartSubTitle">Order for:</h2>
            {customerSummary()}
          </Col>
          <Col className="cartOrderFormContainerWrapper">
            <h2 className="cartSubTitle">Order Summary:</h2>
            <h6>Total: ${calcTotalPrice()}</h6>

            <OrderSummary />
            <StyledButton
              onClick={handleAddAnotherPizza}
              variant="basicButton"
              text="Add another pizza"
            />
          </Col>
        </Row>
      </Container>
      <div className="centerStyle d-flex align-items-center">
        <StyledButton
          variant="basicButton"
          onClick={handleClickSubmit}
          disabled={
            !isAuthenticated &&
            (!isEmail(guestData.email) ||
              !isAlpha(guestData.last_name) ||
              !isAlpha(guestData.first_name) ||
              !isValidPhoneNumber(guestData.phone))
          }
          text="Submit"
        />
        {order.processing && <AppSpinner />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    guest: state.guest,
    order: state.order,
    pizzas: state.pizzas,
  };
};

Cart.propTypes = {
  user: PropTypes.object,
  guest: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setGuest: PropTypes.func.isRequired,
  setMenu: PropTypes.func.isRequired,
  createGuestOrder: PropTypes.func.isRequired,
  createMemberOrder: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  setGuest,
  setMenu,
  previousMenu,
  clearPizza,
  clearPizzas,
  createGuestOrder,
  createMemberOrder,
})(Cart);
