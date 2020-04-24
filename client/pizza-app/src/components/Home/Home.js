import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from '../Login/Login';
import classes from './Home.module.css';

// Custom Styling
import StyledTitle from '../common/Title/StyledTitle';
// import Logo from '../Logo/logo';

// Home
// - Login component
// - Title component
// - Background image
// - Guest button (part of login if wanted)
// - *Don’t render BackButton, Home, or Logout on this step; also they are rendered outside
class Home extends Component {
  render() {
    return (
      <div className={classes.bodyImage}>
        {/* // <div> */}
        {/* <Logo /> */}
        {/* <Title /> */}
        <StyledTitle text="Welcome to the" className="homeTitleTop" />
        <StyledTitle
          text="Pizza Shop"
          className="cursiveTitle"
          paddingTop="0"
          fontSize="5em"
        />
        <Login />
      </div>
    );
  }
}

Home.propTypes = {};

export default Home;
