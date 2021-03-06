import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Custom Styling
import StyledButton from '../common/Button/StyledButton';
import StyledTitle from '../common/Title/StyledTitle';

import PopCart from '../Cart/PopCart';

import classes from './OrderChoice.module.css';
import { setMenu, setPopCart } from '../../actions/menu';
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
    props.setPopCart(false);
  }, [props.user]);

  const handleOrderHistory = (e) => {
    e.preventDefault();
    return props.setMenu(2);
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    props.clearPizza();
    return props.setMenu(9);
  };

  return (
    <div className={classes.Body}>
      {props.popCart ? <PopCart /> : null}
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
            text={`${props.user.first_name[0].toUpperCase() + props.user.first_name.slice(1)} ${props.user.last_name[0].toUpperCase() + props.user.last_name.slice(1)}`}
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
  popCart: state.menu.popCart
});

export default connect(mapStateToProps, {
  setMenu,
  setPopCart,
  clearUserHistory,
  getUserHistory,
  clearPizza,
})(OrderChoice);
