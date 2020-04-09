import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { registerUser } from '../../actions/auth';

const Register = ({ registerUser }) => {
  useEffect(() => {
    const id = Math.floor(Math.random() * 10000);

    registerUser({
      first_name: `Anton${id}`,
      last_name: 'Synytsia',
      email: `anton.synytsia${id}@gmail.com`,
      password: '',
      phone: '503 371 7241'
    });
  }, [registerUser]);

  return <div>Register</div>;
};

Register.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { registerUser })(Register);
