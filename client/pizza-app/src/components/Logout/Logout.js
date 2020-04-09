import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutCustomer } from '../../actions/auth';

import { Button } from 'react-bootstrap';

const Logout = ({ logoutCustomer, isAuthenticated }) => {
  const handleClick = (evt) => {
    evt.preventDefault();
    logoutCustomer();
  };

  return (
    <Button
      variant="danger"
      type="button"
      onClick={handleClick}
      disabled={!isAuthenticated}
    >
      Logout
    </Button>
  );
};

Logout.propTypes = {
  logoutCustomer: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
   { logoutCustomer }
   )(Logout);

