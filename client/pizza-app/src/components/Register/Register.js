import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { registerCustomer } from '../../actions/auth';
import { setMenu } from '../../actions/menu';

import { Form } from 'react-bootstrap';
import AppSpinner from '../AppSpinner/AppSpinner';

import StyledButton from '../common/Button/StyledButton';
import StyledTitle from '../common/Title/StyledTitle';

// Register
// - Title component
// - Form: first, last, email, phone, password
// - Create my account button

const Register = ({
  registerCustomer,
  loading,
  guest,
  step,
  isAuthenticated,
  setMenu,
}) => {
  useEffect(() => {
    if (isAuthenticated && step === 6) {
      setMenu(1);
    }
  }, [isAuthenticated, step, setMenu]);

  const [user, setUser] = useState({
    first_name: guest.first_name,
    last_name: guest.last_name,
    email: guest.email,
    password: '',
    phone: guest.phone,
  });

  const isValid =
    user.first_name.trim().length !== 0 &&
    user.last_name.trim().length !== 0 &&
    user.phone.trim().length !== 0 &&
    user.email.trim().length !== 0 &&
    user.password.trim().length !== 0;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const first_name = user.first_name.trim();
    const last_name = user.last_name.trim();
    const phone = user.phone.trim();
    const email = user.email.trim();
    const password = user.password;
    registerCustomer({ first_name, last_name, phone, email, password });
  };

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setUser((u) => ({ ...u, [name]: value }));
  };

  return (
    <div>
      <StyledTitle
        divClassName="titleBox"
        text="Create An Account "
        className="orderChoiceTitle"
      />

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="first_name"
            type="text"
            placeholder="First Name"
            value={user.first_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="last_name"
            type="text"
            placeholder="Last Name"
            value={user.last_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            name="phone"
            type="text"
            placeholder="Phone"
            value={user.phone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={user.email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
        </Form.Group>
        <div className="d-flex align-items-center">
          {/* <Button variant="primary" type="submit" disabled={!isValid}>
            Sign Up
          </Button> */}
          <StyledButton
            type="submit"
            text="Sign Up"
            variant="formButton"
            disabled={!isValid}
            text="Sign Up"
          />
          {loading && <AppSpinner />}
        </div>
      </Form>
    </div>
  );
};

Register.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  guest: PropTypes.object.isRequired,
  step: PropTypes.number.isRequired,
  registerCustomer: PropTypes.func.isRequired,
  setMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  guest: state.guest,
  step: state.menu.step,
});

export default connect(mapStateToProps, {
  registerCustomer,
  setMenu,
})(Register);
