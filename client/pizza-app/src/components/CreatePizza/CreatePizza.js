import React from 'react';
import { connect } from 'react-redux';
import {
  setBase,
  clearPizza,
  addBasePrice,
} from '../../actions/pizza';
import { addPizza } from '../../actions/pizzas';
import { nextMenu, setPopCart } from '../../actions/menu';

// Custom Styling
import StyledButton from '../common/Button/StyledButton';
import StyledTitle from '../common/Title/StyledTitle';

import './CreatePizza.css';
import Toppings from '../Toppings/Toppings';
import BaseDropDown from './BaseDropDown';
import PopCart from '../Cart/PopCart';

class CreatePizza extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            showCart: false
        }
    }
    componentDidMount = () => {
      this.props.setPopCart(false);
    }

    //changes store to user input
    handleChange = (name, item) => {
        this.props.setBase(name.toLowerCase(), item);
    }

    //Adds current pizza to pizzas array and clears current pizza
    handleSubmit = () => {
        // if (this.verifyUserInput()){
            const totalPrice = this.calcPrice();
            const currentPizza = this.props.pizza;
            this.props.addPizza({ ...currentPizza, basePrice: totalPrice, totalPrice, quantity: 1});
            this.props.clearPizza()
            this.props.nextMenu(this.props.step);
        //}
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
    addBasePrice(totalPrice)
    return totalPrice.toFixed(2);
  };

    // verifyUserInput = () => {
    //     if(this.props.pizza.size.type === null) {
    //         this.setState({message: 'Please select pizza size.'});
    //         return false;
    //     } else if (this.props.pizza.crust.type === null){
    //         this.setState({message: 'Please select crust type.'});
    //         return false;
    //     } else if (this.props.pizza.sauce.type === null){
    //         this.setState({message: 'Please select sauce type.'});
    //         return false;
    //     }

    //     this.setState({message: null});
    //     return true;
    // };


  //Renders topping sections
  render() {
    return (
      <div className="centerDiv">
        {this.props.popCart ? <PopCart/> : null}
        <StyledTitle text="Create Your Pizza" className="basicTitle" />
        <div className='baseDropdownContainer'>
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
        </div>


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
        <div style={{ color: 'red' }}>{this.state.message}</div>
        <StyledButton
          variant="basicButton"
          text="Add to Cart"
          disabled={this.props.pizza.size.type === null || this.props.pizza.crust.type === null || this.props.pizza.sauce.type === null}
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
  pizzas: state.pizzas,
  step: state.menu.step,
  popCart: state.menu.popCart
});

export default connect(mapStateToProps, {
  nextMenu,
  setBase,
  clearPizza,
  addPizza,
  addBasePrice,
  setPopCart
})(CreatePizza);
