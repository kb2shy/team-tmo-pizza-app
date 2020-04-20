import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerCustomer } from '../../actions/auth';
import { setMenu } from '../../actions/menu';
import { Form, Container } from 'react-bootstrap';
import AppSpinner from '../AppSpinner/AppSpinner';
import StyledButton from '../common/Button/StyledButton';
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';

import StyledTitle from '../common/Title/StyledTitle';

// Register
// - Title component
// - Form: first, last, email, phone, password
// - Create my account button
// - add validations

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

  const [touched, setTouched] = useState({
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    phone: false,
  });

  function isValidPhoneNumber(phone) {
    const test1 = /^\d{10}$/;
    const test2 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.match(test1) || phone.match(test2)) {
      return true;
    }
    return false;
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('hi');
    registerCustomer({
      first_name: user.first_name.trim(),
      last_name: user.last_name.trim(),
      phone: user.phone.trim(),
      email: user.email.trim(),
      password: user.password,
    });
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

      <Container fluid="md">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="first_name"
              type="text"
              placeholder="First Name"
              value={user.first_name}
              onChange={handleChange}
              isInvalid={touched.first_name && !isAlpha(user.first_name)}
              isValid={isAlpha(user.first_name)}
              onBlur={() => {
                setTouched({ first_name: true });
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid first name.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="last_name"
              type="text"
              placeholder="Last Name"
              value={user.last_name}
              onChange={handleChange}
              isInvalid={touched.last_name && !isAlpha(user.last_name)}
              isValid={isAlpha(user.last_name)}
              onBlur={() => {
                setTouched({ last_name: true });
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid last name.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              type="text"
              placeholder="Phone"
              value={user.phone}
              onChange={handleChange}
              isInvalid={touched.phone && !isValidPhoneNumber(user.phone)}
              isValid={isValidPhoneNumber(user.phone)}
              onBlur={() => {
                setTouched({ phone: true });
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid phone number.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={user.email}
              onChange={handleChange}
              isInvalid={touched.email && !isEmail(user.email)}
              isValid={isEmail(user.email)}
              onBlur={() => {
                setTouched({ email: true });
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              isInvalid={touched.password && user.password === ''}
              isValid={user.password !== ''}
              onBlur={() => {
                setTouched({ password: true });
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex align-items-center">
            {/* <Button variant="primary" type="submit" disabled={!isValid}>
            Sign Up
          </Button> */}
            <StyledButton
              type="submit"
              variant="basicButton"
              disabled={
                !isEmail(user.email) ||
                !isAlpha(user.last_name) ||
                !isAlpha(user.first_name) ||
                user.password === '' ||
                !isValidPhoneNumber(user.phone)
              }
              text="Sign Up"
            />
            {loading && <AppSpinner />}
          </div>
        </Form>
      </Container>
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
