import React, { useState } from 'react';
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
import isEmail from 'validator/lib/isEmail';

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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    clearPizzas();
    loginCustomer({ email: user.email.trim(), password: user.password });
  };

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });


  const handleGuestOrderClick = (evt) => {
    evt.preventDefault();
    clearPizza();
    clearPizzas();
    setMenu(9, step);
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
            isInvalid={touched.email && !isEmail(user.email)}
            isValid={isEmail(user.email)}
            onBlur={() => { setTouched({ email: true }) }}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
        </Form.Control.Feedback>
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
            isInvalid={touched.password && user.password === ''}
            isValid={user.password !== ''}
            onBlur={() => { setTouched({ password: true }) }}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a password.
        </Form.Control.Feedback>
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
            variant="basicButton"
            type="submit"
            disabled={loading || !isEmail(user.email) || user.password === ''}
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
            variant="basicButton"
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
