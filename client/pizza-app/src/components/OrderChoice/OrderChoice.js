import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import Title from '../Title/Title';
import { connect } from 'react-redux';
// import { Button } from 'react-bootstrap';

// Custom Styling
import StyledButton from '../common/Button/StyledButton';
import StyledTitle from '../common/Title/StyledTitle';

import classes from './OrderChoice.module.css';
import { setMenu } from '../../actions/menu';
import { clearUserHistory, getUserHistory } from '../../actions/database';
import { clearPizza } from '../../actions/pizza';

// OrderChoice: displayed for logged-in customer only, page 2
// - Title sub-component
// - History button
// - Create order button
// - Simple text
// - *BackButton component is displayed but rendered outside (don't render in component)
const OrderChoice = (props) => {
  //Gets user history data
  useEffect(() => {
    props.clearUserHistory();
    if (props.user !== null) {
      props.getUserHistory(props.user.customer_id);
    }
  }, [props.user]);

  const handleOrderHistory = (e) => {
    e.preventDefault();
    return props.setMenu(2);
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    props.clearPizza();
    return props.setMenu(9, props.step);
  };

  return (
    <div className={classes.Body}>
      {/* <br></br> */}
      {/* <div className={classes.Title}> title </div> */}
      <div className={classes.orderChoiceTitleContainer}>
        <StyledTitle
          divClassName="titleBox"
          text={`WELCOME BACK${props.user ? ',' : ''}`}
          className="orderChoiceTitle"
        />
        {props.user !== null && (
          <StyledTitle
            divClassName="titleBox"
            text={`${props.user.first_name} ${props.user.last_name}`}
            className="cursiveTitle"
          />
        )}
      </div>
      <div className={classes.OrderChoice}>
        <StyledTitle
          className="orderChoiceSubtitle "
          text="What would you like to do today?"
        ></StyledTitle>
        <div className={classes.ButtonGroup}>
          {/* <br></br> */}
          {/* <Button onClick={handleOrderHistory}>See my order History</Button> */}
          <StyledButton
            type="button"
            onClick={handleOrderHistory}
            text="See My Order History"
            variant="orderChoiceButton"
          />

          <StyledButton
            type="button"
            onClick={handleCreateOrder}
            text="Make a new order"
            variant="orderChoiceButton"
          />

          {/* <Button onClick={handleCreateOrder}>Make a new order</Button> */}
        </div>
      </div>
    </div>
  );
};

OrderChoice.propTypes = {};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  step: state.menu.step,
});

export default connect(mapStateToProps, {
  setMenu,
  clearUserHistory,
  getUserHistory,
  clearPizza,
})(OrderChoice);
