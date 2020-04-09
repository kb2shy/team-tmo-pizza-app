import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  registerCustomer,
  loginCustomer,
  loadCustomer,
} from '../../actions/auth';

import { Button } from 'react-bootstrap';

const Register = ({ registerCustomer, loginCustomer, loadCustomer }) => {
  useEffect(() => {
    const id = Math.floor(Math.random() * 10000);

      // registerCustomer({
      //   first_name: `Anton`,
      //   last_name: 'Synytsia',
      //   email: `anton.synytsia@gmail.com`,
      //   password: '123',
      //   phone: '555 443 4444',
      // });
    loginCustomer({
      email: 'anton.synytsia@gmail.com',
      password: '123',
    });
  }, [loginCustomer]);

  const handleClick = (evt) => {
    evt.preventDefault();
    loadCustomer();
  };

  return (
    <div>
      Register
      <Button onClick={handleClick}>Get customer from token</Button>
    </div>
  );
};

Register.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  registerCustomer,
  loginCustomer,
  loadCustomer,
})(Register);
