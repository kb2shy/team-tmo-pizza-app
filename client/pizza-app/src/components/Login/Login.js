import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginCustomer } from '../../actions/auth';
import AppSpinner from '../AppSpinner/AppSpinner';

import { Form, Button, Spinner } from 'react-bootstrap';

const Login = ({ loginCustomer, loading }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const isValid = user.email.length !== 0 && user.password.length !== 0;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = user.email.trim();
    const password = user.password;
    loginCustomer({email, password});
  };

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setUser((u) => ({ ...u, [name]: value }));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
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
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading || !isValid}>
          Sign In
        </Button>{' '}
        {loading && <AppSpinner />}
      </Form>
      <Spinner />
    </div>
  );
};

Login.propTypes = {
  loginCustomer: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { loginCustomer })(Login);
