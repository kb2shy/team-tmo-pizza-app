import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutCustomer } from '../../actions/auth';
import { resetMenu } from '../../actions/menu';

import { Button } from 'react-bootstrap';

const Logout = ({ logoutCustomer, isAuthenticated, resetMenu }) => {
  const handleClick = (evt) => {
    evt.preventDefault();
    logoutCustomer();
    resetMenu();
  };

  return (
    <Button
      variant="primary"
      type="button"
      onClick={handleClick}
      disabled={!isAuthenticated}
    >
      Logout
    </Button>
  );
};

Logout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logoutCustomer: PropTypes.func.isRequired,
  resetMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logoutCustomer, resetMenu })(Logout);
