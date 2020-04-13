import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Button,
  Container,
  Form,
  Row,
  Col,
  Table,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * OrderSummary component
 * - NOTE: currently hard-coded implementation. Are we doing pizza order id?
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
          <tr id="CrustType">
            <td>Crust Type</td>
            <td>{pizza.crustType}</td>
          </tr>
          <tr id="Sauce">
            <td>Sauce</td>
            <td>{pizza.sauce}</td>
          </tr>
          <tr id="Cheese">
            <td>Cheese</td>
            <td>{pizza.cheese}</td>
          </tr>
          <tr id="Meats">
            <td>Meats</td>
            <td>{printMultiple(pizza.toppings.meats)}</td>
          </tr>
          <tr id="Veggies">
            <td>Veggies</td>
            <td>{printMultiple(pizza.toppings.veggies)}</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Order # NUM</Card.Title>
          <Card.Text as={renderOrderInTable} />
        </Card.Body>
      </Card>

      {/* setting up for future: adding and removing pizzas to the order */}
      {/* <Button variant="primary" onClick="">
          Add Another Pizza
        </Button>*/}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    pizza: {
      // default (for anyone) - NOTE! not done yet until Toppings implementation is finished
      // size: state.pizza.size,
      // crustType: state.pizza.crustType,
      // sauce: state.pizza.sauce,
      // cheese: state.pizza.cheese,
      // toppings:{
      //   meats: state.pizza.toppings.meats,
      //   veggies: state.pizza.toppings.veggies
      // }

      // dummy data:
      size: 'large - 14 in',
      crustType: 'brooklyn style',
      sauce: 'garlic parmesan white sauce',
      cheese: 'parmigiana',
      toppings: {
        // one way of saving the data, as objects
        // meats: [{ name: 'chicken' }, { name: 'bacon' }, { name: 'prosciutto' }],

        // another way: just have the topping names individually
        meats: ['chicken', 'bacon', 'prosciutto', 'prosciutto'],
        veggies: ['spinach', 'roasted red peppers'],
      },
    },
  };
};

export default connect(mapStateToProps)(OrderSummary);
