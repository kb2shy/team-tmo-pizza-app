import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Custom Styling
import StyledButton from '../common/Button/StyledButton';
import StyledTitle from '../common/Title/StyledTitle'

import { Navbar, Nav } from 'react-bootstrap';
import Logout from '../Logout/Logout';

import { setMenu, setPopCart } from '../../actions/menu';

import logo from '../../assets/logo.svg';

// Should contain:
// - Logo
// - Home button - CR
// - Log out button - CR
const AppNavbar = ({ isAuthenticated, step, setMenu, setPopCart }) => {
  const handleHomeClick = (evt) => {
    evt.preventDefault();
    setMenu(1);
  };

  const handleHomeCart = (evt) => {
    evt.preventDefault();
    if(step === 3 || step === 7) {
      setPopCart(true);
    } else {
      setMenu(4);
    }
  };

  const handleHomeRegister = (evt) => {
    evt.preventDefault();
    setMenu(6);
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
        <StyledTitle text="Pizza Shop" className="navbarTitle"/>
        {/* <div className="ml-2">PizzaShop</div> */}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto d-flex align-items-center">
          {step !== 6 && !isAuthenticated && (
            <StyledButton
            variant="navbarButton"
            type="button"
            onClick={handleHomeRegister}
            text="Register"

          />
          )}
          {step !== 1 && (
            <StyledButton
              variant="navbarButton"
              onClick={handleHomeClick}
              type="button"
              text="Home"
            />
            // <Button variant="primary" type="button" onClick={handleHomeClick}>
            //   Home
            // </Button>
          )}
          {(step !== 1 && step !== 4) && (
            <StyledButton
              variant="navbarButton"
              type="button"
              onClick={handleHomeCart}
              text="Cart"
            />
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

export default connect(mapStateToProps, { setMenu, setPopCart })(AppNavbar);
