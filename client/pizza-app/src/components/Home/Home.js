import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from '../Login/Login';
import classes from './Home.module.css';
import Title from '../Title/Title';
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
				{/* <Logo /> */}
				<Title />
				<Login />
			</div>
		);
	}
}

Home.propTypes = {};

export default Home;
