import React from 'react'
import './OrderHistory.css'

const OrderDetails = ({ pizza }) => {
  // helper method for printing cheese toppings
  const printCheeseToppings = (cheeses) => {
    let text = '';
    for (let cheese of cheeses) {
      if (cheeses.indexOf(cheese) < cheeses.length - 1) {
        text += `${cheese.cheese_type}, `;
      } else {
        text += cheese.cheese_type;
      }
    }
    return text;
  };

  // helper method for printing cheese toppings
  const printVeggieToppings = (veggies) => {
    let text = '';
    for (let veggie of veggies) {
      if (veggies.indexOf(veggie) < veggies.length - 1) {
        text += `${veggie.veggie_type}, `;
      } else {
        text += veggie.veggie_type;
      }
    }
    return text;
  };

  // helper method for printing cheese toppings
  const printMeatToppings = (meats) => {
    let text = '';
    for (let meat of meats) {
      if (meats.indexOf(meat) < meats.length - 1) {
        text += `${meat.meat_type}, `;
      } else {
        text += meat.meat_type;
      }
    }
    return text;
  };

  return (
    <>
      {/* {console.log(pizza)} */}
      <table>
        <tbody>
        <tr id="Quantity">
            <td>Quantity</td>
            <td>{pizza.quantity}</td>
          </tr>
          <tr id="Size">
            <td>Size</td>
            <td>{pizza.size.size_type}</td>
          </tr>
          <tr id="crust">
            <td>Crust</td>
            <td>{pizza.crust.crust_type}</td>
          </tr>
          <tr id="Sauce">
            <td>Sauce</td>
            <td>{pizza.sauce.sauce_type}</td>
          </tr>
          {pizza.cheeses.length > 0 ? (
            <tr id="Cheese">
              <td>Cheese</td>
              <td>{printCheeseToppings(pizza.cheeses)}</td>
            </tr>
          ) : null}
          {pizza.veggies.length > 0 ? (
            <tr id="Veggies">
              <td>Veggies</td>
              <td>{printVeggieToppings(pizza.veggies)}</td>
            </tr>
          ) : null}
          {pizza.meats.length > 0 ? (
            <tr id="Meats">
              <td>Meats</td>
              <td>{printMeatToppings(pizza.meats)}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
      <h5>${pizza.price}</h5>
    </>
  );
};

export default OrderDetails