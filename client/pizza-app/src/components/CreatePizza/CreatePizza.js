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
    constructor(props) {
        super(props);
        this.state = {
            message: null
        }
    }
    //changes store to user input
    handleChange = (name, item, price = -1) => {
        this.props.setBase(name.toLowerCase(), item);
    }

    //Adds current pizza to pizzas array and clears current pizza
    handleSubmit = () => {
        if (this.verifyUserInput()){
            const totalPrice = this.calcPrice();
            const currentPizza = this.props.pizza;
            this.props.addPizza({ ...currentPizza, totalPrice}); //wouldn't be updated fast enough
            this.props.clearPizza()
            this.props.nextMenu(this.props.step);
        }
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

    verifyUserInput = () => {
        if(this.props.pizza.size.type === null) {
            this.setState({message: 'Please select pizza size.'});
            return false;
        } else if (this.props.pizza.crust.type === null){
            this.setState({message: 'Please select crust type.'});
            return false;
        } else if (this.props.pizza.sauce.type === null){
            this.setState({message: 'Please select sauce type.'});
            return false;
        }

        this.setState({message: null});
        return true;
    }

  //Renders topping sections
  render() {
    return (
      <div className="centerDiv">
        {/* <h3 className="createPizzaTitle">Create Your Pizza</h3> */}
        <StyledTitle text="Create Your Pizza" className="basicTitle" />
        <BaseDropDown
          value={this.props.pizza.size.type || 'Choose Size'}
          type={'Size'}
          options={this.props.sizes}
          handleChange={this.handleChange}
        />
        <BaseDropDown
          value={this.props.pizza.crust.type || 'Choose Crust Type'}
          type={'Crust'}
          options={this.props.crusts}
          handleChange={this.handleChange}
        />
        <BaseDropDown
          value={this.props.pizza.sauce.type || 'Choose Sauce'}
          type={'Sauce'}
          options={this.props.sauces}
          handleChange={this.handleChange}
        />

                <table className="toppingTable">
                    <tbody>
                        <tr>
                            <td><p>Additional Cheeses</p></td>
                            <td><Toppings type={'Cheeses'} /></td>
                        </tr>
                        <tr>
                            <td><p>Veggies</p></td>
                            <td><Toppings type={'Veggies'} /></td>
                        </tr>
                        <tr>
                            <td><p>Meats</p></td>
                            <td><Toppings type={'Meats'} /></td>
                        </tr>
                    </tbody>
                </table>
                {/* <Button onClick={this.handleSubmit}>Add to Cart</Button> */}
                <div style={{color: 'red'}}>{this.state.message}</div>
                <StyledButton
                    variant="basicButton"
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
