import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Navbar, Nav, Button } from 'react-bootstrap';
import Logout from '../Logout/Logout';

import { setMenu } from '../../actions/menu';

import logo from '../../assets/logo.svg';

// Should contain:
// - Logo
// - Home button - CR
// - Log out button - CR
const AppNavbar = ({ isAuthenticated, step, setMenu }) => {
  const handleHomeClick = (evt) => {
    evt.preventDefault();
    setMenu(isAuthenticated ? 2 : 1);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      variant="dark"
      style={{ backgroundColor: 'crimson' }}
      className="px-2 py-1 m-0"
    >
      <Navbar.Brand href="#" className="d-flex align-items-center p-0">
        <img
          src={logo}
          height="80"
          className="d-inline-block align-top m-0 p-0"
          alt="Logo"
        />
        <div className="ml-2">PizzaShop</div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto d-flex align-items-center">
          {step !== 1 && (
            <Button variant="primary" type="button" onClick={handleHomeClick}>
              Home
            </Button>
          )}
          {isAuthenticated && (
            <div className="ml-1">
              <Logout />
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

AppNavbar.propTypes = {
  setMenu: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.menu.step,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setMenu })(AppNavbar);
