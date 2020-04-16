import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './Login.module.css';

// import {Button} from 'react-bootstrap'
import StyledButton from '../common/Button/StyledButton';
import { Form, Spinner } from 'react-bootstrap';
import AppSpinner from '../AppSpinner/AppSpinner';
import { clearPizza } from '../../actions/pizza';
import { loginCustomer } from '../../actions/auth';
import { setMenu } from '../../actions/menu';
import { clearPizzas } from '../../actions/pizzas';

const Login = ({
  loginCustomer,
  loading,
  setMenu,
  step,
  clearPizza,
  clearPizzas,
  isAuthenticated,
}) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  // useEffect(() => {
  //   if (isAuthenticated && step === 1) {
  //     setMenu(2);
  //   }
  // }, [step, isAuthenticated]);

  const isValid = user.email.length !== 0 && user.password.length !== 0;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    clearPizzas();
    const email = user.email.trim();
    const password = user.password;
    loginCustomer({ email, password });
  };

  const handleGuestOrderClick = (evt) => {
    evt.preventDefault();
    clearPizza();
    clearPizzas();
    setMenu(3, step);
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
          {/* <Button
            id={classes.buttonStyle}
            variant="primary"
            type="submit"
            disabled={loading || !isValid}
          >
            Sign In
          </Button> */}
          <StyledButton
            variant="formButton"
            type="submit"
            disabled={loading || !isValid}
            //onClick={}
            text="Sign In"
          />

          {/* <Button
            id={classes.buttonStyle}
            variant="primary"
            type="button"
            disabled={loading}
            className="ml-2"
            onClick={handleGuestOrderClick}
          >
            Order As Guest
          </Button> */}

          <StyledButton
            variant="formButton"
            type="button"
            disabled={loading}
            onClick={handleGuestOrderClick}
            text="Order As Guest"
          />
          {loading && <AppSpinner />}
        </div>
      </Form>
      <Spinner />
    </div>
  );
};

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  loginCustomer: PropTypes.func.isRequired,
  setMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  step: state.menu.step,
});

export default connect(mapStateToProps, {
  loginCustomer,
  setMenu,
  clearPizza,
  clearPizzas,
})(Login);
