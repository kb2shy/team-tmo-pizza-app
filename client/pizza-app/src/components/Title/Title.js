// Note: not used anymore, now using common/Title/StyledTitle
import React from 'react';
import classes from './Title.module.css';
import PropTypes from 'prop-types';

const Title = (props) => {
  return (
    <div>
      <h1 className={classes.font}>
        Welcome to the <span>Pizza Shop</span>
      </h1>
    </div>
  );
};

Title.propTypes = {};

export default Title;
