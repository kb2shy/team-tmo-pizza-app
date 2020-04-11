import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './Login.module.css';

import { Form, Button, Spinner } from 'react-bootstrap';
import AppSpinner from '../AppSpinner/AppSpinner';

import { loginCustomer } from '../../actions/auth';
import { setMenu } from '../../actions/menu';

const Login = ({ loginCustomer, loading, setMenu }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const isValid = user.email.length !== 0 && user.password.length !== 0;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = user.email.trim();
    const password = user.password;
    loginCustomer({ email, password });
  };

  const handleGuestOrderClick = (evt) => {
    evt.preventDefault();
    setMenu(4);
  };

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setUser((u) => ({ ...u, [name]: value }));
  };

  return (
    <div className={classes.container}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className={classes.label}>Email address</Form.Label>
          <Form.Control
            className={classes.input}
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
        <Form.Group controlId="formBasicPassword">
          <Form.Label className={classes.label}>Password</Form.Label>
          <Form.Control
            className={classes.input}
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
        </Form.Group>
        <div className={`d-flex align-items-center ${classes.spacingTop}`}>
          <Button
            id={classes.buttonStyle}
            variant="primary"
            type="submit"
            disabled={loading || !isValid}
          >
            Sign In
          </Button>
          <Button
            id={classes.buttonStyle}
            variant="primary"
            type="button"
            disabled={loading}
            className="ml-2"
            onClick={handleGuestOrderClick}
          >
            Order As Guest
          </Button>
          {loading && <AppSpinner />}
        </div>
      </Form>
      <Spinner />
    </div>
  );
};

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  loginCustomer: PropTypes.func.isRequired,
  setMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { loginCustomer, setMenu })(Login);
