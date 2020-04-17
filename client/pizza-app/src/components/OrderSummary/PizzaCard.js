import React from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { setPizza } from '../../actions/pizza';
import { removePizza } from '../../actions/pizzas';
import { previousMenu } from '../../actions/menu';

/**
 * Subcomponent for OrderSummary component
 * displays pizza order information in a table in a card
 */
const PizzaCard = (props) => {
  const style = { width: '100%', display: 'inline-block', margin: '5px' };

  // helper method for printing multiple toppings
  const printMultipleToppings = (arr) => {
    let text = '';
    for (let i = 0; i < arr.length; i++) {
      text = text + arr[i].type;
      if (i < arr.length - 1) text = text + ', ';
    }
    return text;
  };

  const editPizza = (index) => {
    const pizza = props.pizzas[index];
    props.setPizza(pizza);
    props.removePizza(index);
    props.previousMenu();
  }

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
        <Button onClick={() => editPizza(props.index)}>Edit Pizza</Button>
      </div>
    );
  };

  return (
    <Card style={style}>
      <Card.Body>
        <Card.Text as={renderOrderInTable} />
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    pizzas: state.pizzas,
  };
};

export default connect(mapStateToProps, { setPizza, removePizza, previousMenu })(PizzaCard);