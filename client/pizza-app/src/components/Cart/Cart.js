import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, Form, Row, Col, Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import StyledButton from '../common/Button/StyledButton';

// actions
import { setMenu } from '../../actions/menu';
import { setGuest } from '../../actions/guest';
import { clearPizzas } from '../../actions/pizzas';
import { createGuestOrder, createMemberOrder } from '../../actions/order';

import './Cart.css';
import OrderSummary from '../OrderSummary/OrderSummary';
import AppSpinner from '../AppSpinner/AppSpinner';

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
  clearPizzas,
  createGuestOrder,
  createMemberOrder,
  order,
}) => {
  const [guestData, setGuestData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });

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
    setGuestData((d) => ({ ...d, [name]: value }));
  };

  // User view: prints user information in a table
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
    if (userDoesNotExist) {
      return renderGuestInput();
    } else {
      isValid = true;
      return renderUserDisplay();
    }
  };

  return (
    <div>
      <div className="centerStyle">
        <h2>Cart</h2>
      </div>
      <div className="centerStyle">
        <h2>Review your order below</h2>
      </div>
      <div className="centerStyle">
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
      <div className="centerStyle d-flex align-items-center">
        <StyledButton
          variant="formButton"
          onClick={handleClickSubmit}
          disabled={!isValid}
          text="Submit"
        />

        {/* <Button
          variant="primary"
          onClick={handleClickSubmit}
          disabled={!isValid}
        >
          Submit
        </Button> */}
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
  clearPizzas,
  createGuestOrder,
  createMemberOrder,
})(Cart);
