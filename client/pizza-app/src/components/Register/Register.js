import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { registerCustomer, loginCustomer } from '../../actions/auth';
import { assertNonNullType } from 'graphql';

const Register = ({ registerCustomer, loginCustomer }) => {
  useEffect(() => {
    const id = Math.floor(Math.random() * 10000);

  //   registerCustomer({
  //     first_name: `Anton`,
  //     last_name: 'Synytsia',
  //     email: `anton.synytsia${id}@gmail.com`,
  //     password: '123',
  //     phone: '555 443 4444',
  //   });
  loginCustomer({
    email: 'anton.synytsia@gmail.com',
    password: '123'
  })
  }, [loginCustomer]);

  return (
    <div>
      Register
    </div>
  );
};

Register.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { registerCustomer, loginCustomer })(Register);
