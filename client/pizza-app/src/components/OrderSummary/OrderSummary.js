import React from 'react';
import { connect } from 'react-redux';
import PizzaCard from './PizzaCard';
/**
 * OrderSummary component
 * @param {*}  pizzas - reducer with info for all of the user's added to cart pizzas
 * 1. iterates through all pizzas associated with this user
 * 2. renders a card displaying each pizza's info via PizzaCard subcomponent
 */
const OrderSummary = ({ pizzas }) => {
  return (
    <div>
      {pizzas.map((pz) => {
        return (
          <div key={pz}>
            <PizzaCard
              size={pz.size}
              crust={pz.crust}
              sauce={pz.sauce}
              // cheese={pz.cheese}
              toppings={pz.toppings}
              price={pz.totalPrice}
            />
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pizzas: state.pizzas,
  };
};

export default connect(mapStateToProps)(OrderSummary);
