import React from 'react';
import { Card } from 'react-bootstrap';

/**
 * Subcomponent for OrderSummary component
 * displays pizza order information in a table in a card
 */
const PizzaCard = (props) => {
  // helper method for printing multiple toppings
  const printMultipleToppings = (arr) => {
    let text = '';
    for (let i = 0; i < arr.length; i++) {
      text = text + arr[i];
      if (i < arr.length - 1) text = text + ', ';
    }
    return text;
  };

  const renderOrderInTable = () => {
    return (
      //   <Table borderless>
      <table>
        <tbody>
          <tr id="Size">
            <td>Size</td>
            <td>{props.size}</td>
          </tr>
          <tr id="crust">
            <td>Crust</td>
            <td>{props.crust}</td>
          </tr>
          <tr id="Sauce">
            <td>Sauce</td>
            <td>{props.sauce}</td>
          </tr>
          <tr id="Cheese">
            <td>Cheese</td>
            <td>{props.cheese}</td>
          </tr>
          <tr id="Veggies">
            <td>Veggies</td>
            <td>{printMultipleToppings(props.toppings.veggies)}</td>
          </tr>
          <tr id="Meats">
            <td>Meats</td>
            <td>{printMultipleToppings(props.toppings.meats)}</td>
          </tr>
        </tbody>
        {/* </Table> */}
      </table>
    );
  };

  return (
    <Card>
      <Card.Body>
        <Card.Text as={renderOrderInTable} />
      </Card.Body>
    </Card>
  );
};

export default PizzaCard;
