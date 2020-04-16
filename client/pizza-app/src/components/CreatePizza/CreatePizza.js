import React from 'react';
import { connect } from 'react-redux';
import { setBase, clearPizza, addTotalPrice } from '../../actions/pizza';
import { addPizza } from '../../actions/pizzas';
import { nextMenu } from '../../actions/menu';
// import { Button } from "react-bootstrap";

// Custom Styling
import StyledButton from '../common/Button/StyledButton';
import StyledTitle from '../common/Title/StyledTitle';

import './CreatePizza.css';
import Toppings from '../Toppings/Toppings';
import BaseDropDown from './BaseDropDown';

class CreatePizza extends React.Component {
  //changes store to user input
  handleChange = (name, item, price = -1) => {
    this.props.setBase(name.toLowerCase(), item, price);
  };

  //Adds current pizza to pizzas array and clears current pizza
  handleSubmit = () => {
    const totalPrice = this.calcPrice();
    const currentPizza = this.props.pizza;
    this.props.addPizza({ ...currentPizza, totalPrice }); //wouldn't be updated fast enough
    this.props.clearPizza();
    this.props.nextMenu(this.props.step);
  };

  //Calculates total price of pizza
  calcPrice = () => {
    let totalPrice = 0;
    for (let meat of this.props.pizza.toppings.meats) {
      totalPrice += meat.price;
    }

    for (let veggie of this.props.pizza.toppings.veggies) {
      totalPrice += veggie.price;
    }

    for (let cheese of this.props.pizza.toppings.cheeses) {
      totalPrice += cheese.price;
    }

    totalPrice += this.props.pizza.size.price;
    addTotalPrice(totalPrice);

    return totalPrice;
  };

  //Renders topping sections
  render() {
    return (
      <div className="centerDiv">
        <h3 className="createPizzaTitle">Create Your Pizza</h3>
        <BaseDropDown
          value={this.props.pizza.size.type || 'Choose Size'}
          type={'Size'}
          options={this.props.sizes}
          handleChange={this.handleChange}
        />
        <BaseDropDown
          value={this.props.pizza.crust || 'Choose Crust Type'}
          type={'Crust'}
          options={this.props.crusts}
          handleChange={this.handleChange}
        />
        <BaseDropDown
          value={this.props.pizza.sauce || 'Choose Sauce'}
          type={'Sauce'}
          options={this.props.sauces}
          handleChange={this.handleChange}
        />

        <table className="toppingTable">
          <tbody>
            <tr>
              <td>
                <p>Additional Cheeses</p>
              </td>
              <td>
                <Toppings type={'Cheeses'} />
              </td>
            </tr>
            <tr>
              <td>
                <p>Veggies</p>
              </td>
              <td>
                <Toppings type={'Veggies'} />
              </td>
            </tr>
            <tr>
              <td>
                <p>Meats</p>
              </td>
              <td>
                <Toppings type={'Meats'} />
              </td>
            </tr>
          </tbody>
        </table>
        {/* <Button onClick={this.handleSubmit}>Add to Cart</Button> */}
        <StyledButton
          variant="formButton"
          text="Add to Cart"
          onClick={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sizes: state.database.sizes,
  sauces: state.database.sauces,
  cheeses: state.database.cheeses,
  crusts: state.database.crusts,
  pizza: state.pizza,
  step: state.menu.step,
});

export default connect(mapStateToProps, {
  nextMenu,
  setBase,
  clearPizza,
  addPizza,
  addTotalPrice,
})(CreatePizza);
