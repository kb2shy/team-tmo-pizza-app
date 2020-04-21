import React from 'react';
import { connect } from 'react-redux';
import PizzaWrapper from './PizzaWrapper';

import './OrderSummary.css';

/* TODO: quantity
  - change the form input for that pizza ONLY
  - update the pizza's total price based on the quantity inputted    - update the total order price
   - set a limit on the pizza input-- say, 25 max
   - implement +/- or up/down buttons as another way to change quantity
          - the action types for this: INCREMENT_PIZZA_quantity, DECREMENT_PIZZA_quantity
*/

/**
 * OrderSummary component
 * @param {*}  pizzas - reducer with info for all of the user's added to cart pizzas
 * 1. iterates through all pizzas associated with this user
 * 2. renders a card displaying each pizza's info via PizzaCard subcomponent
 */

class OrderSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.pizzas.map((pizza, index) => {
          return <PizzaWrapper key={index} index={index} pizza={pizza} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pizzas: state.pizzas,
  };
};

export default connect(mapStateToProps)(OrderSummary);
