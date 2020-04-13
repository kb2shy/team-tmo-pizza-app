import React from 'react';
import { connect } from 'react-redux';
import { Card, Table } from 'react-bootstrap';

/**
 * OrderSummary component
 * @param {*}  pizza - reducer
 * @return {*} Table - selected pizza information
 */
const OrderSummary = ({ pizza }) => {
  // helper method for printing multiple elements of an array
  const printMultiple = (arr) => {
    let text = '';
    for (let i = 0; i < arr.length; i++) {
      text = text + arr[i];
      if (i < arr.length - 1) text = text + ', ';
    }
    return text;
  };

  // displays pizza order information in a table
  const renderOrderInTable = () => {
    return (
      <Table borderless>
        <tbody>
          <tr id="Size">
            <td>Size</td>
            <td>{pizza.size}</td>
          </tr>
          <tr id="crust">
            <td>Crust</td>
            <td>{pizza.crust}</td>
          </tr>
          <tr id="Sauce">
            <td>Sauce</td>
            <td>{pizza.sauce}</td>
          </tr>
          <tr id="Cheese">
            <td>Cheese</td>
            <td>{pizza.cheese}</td>
          </tr>
          <tr id="Veggies">
            <td>Veggies</td>
            <td>{printMultiple(pizza.toppings.veggies)}</td>
          </tr>
          <tr id="Meats">
            <td>Meats</td>
            <td>{printMultiple(pizza.toppings.meats)}</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Text as={renderOrderInTable} />
        </Card.Body>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    pizza: {
      size: state.pizza.size,
      crust: state.pizza.crust,
      sauce: state.pizza.sauce,
      cheese: state.pizza.cheese,
      toppings: {
        meats: state.pizza.toppings.meats,
        veggies: state.pizza.toppings.veggies,
      },
    },
  };
};

export default connect(mapStateToProps)(OrderSummary);
