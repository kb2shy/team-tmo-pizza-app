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
      <table>
        <tbody>
          <tr id="Name">
            <td>Name</td>
            <td>{props.name}</td>
          </tr>
          <tr id="Size">
            <td>Size</td>
            <td>{props.size.type}</td>
          </tr>
          <tr id="crust">
            <td>Crust</td>
            <td>{props.crust.type}</td>
          </tr>
          <tr id="Sauce">
            <td>Sauce</td>
            <td>{props.sauce.type}</td>
          </tr>
          {props.toppings.cheeses.length > 0 ? (
            <tr id="Cheese">
              <td>Cheese</td>
              <td>{printMultipleToppings(props.toppings.cheeses)}</td>
            </tr>
          ) : null}
          {props.toppings.veggies.length > 0 ? (
            <tr id="Veggies">
              <td>Veggies</td>
              <td>{printMultipleToppings(props.toppings.veggies)}</td>
            </tr>
          ) : null}
          {props.toppings.meats.length > 0 ? (
            <tr id="Meats">
              <td>Meats</td>
              <td>{printMultipleToppings(props.toppings.meats)}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
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
