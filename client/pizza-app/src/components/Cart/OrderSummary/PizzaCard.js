import React from 'react';
import { connect } from 'react-redux';

/**
 * Subcomponent for OrderSummary component
 * displays pizza order information in a table in a card
 */
const PizzaCard = (props) => {
  // helper method for printing multiple toppings
  const printMultipleToppings = (arr) => {
    let text = '';
    for (let i = 0; i < arr.length; i++) {
      text = text + arr[i].type;
      if (i < arr.length - 1) text = text + ', ';
    }
    return text;
  };

  return (
    <>
      <p>
        {props.size.type} {props.crust.type} crust with {props.sauce.type} sauce
        <br />
        Cheeses: {printMultipleToppings(props.toppings.cheeses)}
        <br />
        Veggies: {printMultipleToppings(props.toppings.veggies)}
        <br />
        Meats: {printMultipleToppings(props.toppings.meats)}
      </p>
      <h5>${props.price}</h5>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    pizzas: state.pizzas,
  };
};

export default connect(mapStateToProps, {})(PizzaCard);
