import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { setPizza, setPizzaQty, clearPizza } from '../../../actions/pizza';
import {
  removePizza,
  addPizza,
  updatePizza,
  updatePizzaQty,
} from '../../../actions/pizzas';
import { previousMenu } from '../../../actions/menu';

import StyledButton from '../../common/Button/StyledButton';

/**
 * Subcomponent for OrderSummary component
 * displays pizza order information in a table in a card
 */
const PizzaCard = (props) => {
  console.log('pizzaCard.js: props: ', props);
  const cardStyle = { width: '100%', display: 'inline-block', margin: '5px' };
  // const footerStyle = { display: 'flex', flexDirection: 'row' };

  // const [data, setData] = useState({
  //   qty: '',
  // });

  // const errors = {
  //   qty: 'Please add a value between 0 and 10',
  // };

  // helper method for printing multiple toppings
  const printMultipleToppings = (arr) => {
    let text = '';
    for (let i = 0; i < arr.length; i++) {
      text = text + arr[i].type;
      if (i < arr.length - 1) text = text + ', ';
    }
    return text;
  };

  /*
  const [d, setD] = useState({props.})
  useEffect(() => {

  })
  */

  const renderOrderInTable = () => {
    return (
      <div>
        <table>
          <tbody>
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
            <tr id="Cheese">
              <td>Cheese</td>
              <td>{printMultipleToppings(props.toppings.cheeses)}</td>
            </tr>
            <tr id="Veggies">
              <td>Veggies</td>
              <td>{printMultipleToppings(props.toppings.veggies)}</td>
            </tr>
            <tr id="Meats">
              <td>Meats</td>
              <td>{printMultipleToppings(props.toppings.meats)}</td>
            </tr>
            <tr id="Price">
              <td>Total: </td>
              <td>${props.price.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Card style={cardStyle}>
      <Card.Body>
        {/* <Card.Text as={renderOrderInTable} /> */}
        <table>
          <tbody>
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
            <tr id="Cheese">
              <td>Cheese</td>
              <td>{printMultipleToppings(props.toppings.cheeses)}</td>
            </tr>
            <tr id="Veggies">
              <td>Veggies</td>
              <td>{printMultipleToppings(props.toppings.veggies)}</td>
            </tr>
            <tr id="Meats">
              <td>Meats</td>
              <td>{printMultipleToppings(props.toppings.meats)}</td>
            </tr>
            <tr id="Price">
              <td>Total: </td>
              <td>${props.price.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    pizzas: state.pizzas,
  };
};

export default connect(mapStateToProps, {
  // setPizza,
  // removePizza,
  // addPizza,
  // clearPizza,
  // previousMenu,
  // setPizzaQty,
  // updatePizzaQty,
  // updatePizza
})(PizzaCard);
