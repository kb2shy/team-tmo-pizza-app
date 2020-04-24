import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';

// Helper Components
import Toppings from '../Toppings/Toppings';
import BaseDropDown from './BaseDropDown';
import PopCart from '../Cart/PopCart';

// Actions
import {
  setBase,
  clearPizza,
  addBasePrice,
  setPizza,
} from '../../actions/pizza';
import { setMenu, setPopCart } from '../../actions/menu';

// Custom Styling
import StyledButton from '../common/Button/StyledButton';
import StyledTitle from '../common/Title/StyledTitle';

import './CreatePizza.css';

class CreatePizza extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      showCart: false,
    };
  }

  componentDidMount = () => {
    this.props.setPopCart(false);
  };

  //changes store to user input
  handleChange = (name, item) => {
    this.props.setBase(name.toLowerCase(), item);
  };

  // Calculates base price of pizza (size + toppings price)
  calcBasePrice = () => {
    let basePrice = 0;
    for (let meat of this.props.pizza.toppings.meats) {
      basePrice += meat.price;
    }

    for (let veggie of this.props.pizza.toppings.veggies) {
      basePrice += veggie.price;
    }

    for (let cheese of this.props.pizza.toppings.cheeses) {
      basePrice += cheese.price;
    }

    addBasePrice(basePrice);
    return basePrice.toFixed(2);
  };

  //Adds current pizza to pizzas array and clears current pizza
  handleSubmit = () => {
    if (this.verifyUserChoice()) {
      const basePrice = this.calcBasePrice();
      const currentPizza = this.props.pizza;

      this.props.setPizza({
        ...currentPizza,
        name: 'Custom Pizza',
        basePrice,
        totalPrice: basePrice,
      });
      this.props.setMenu(8);
    }
  }
 
//Adds verification message to users when forgetting to choose crust type/pizza sauce
  verifyUserChoice = () => {
      if(this.props.pizza.crust.type === null ){
          this.setState({message: 'Please select crust type!'});
          return false;
      } else if (this.props.pizza.sauce.type === null){
          this.setState({message: 'Please select sauce type!'});
          return false;
      }

      this.setState({message: null});
      return true;
  }

  //Renders topping sections and quantity input
  render() {
    return (
      <Container fluid>
        <div className="centerDiv">
          {this.props.popCart ? <PopCart /> : null}
          <StyledTitle text="Create Your Pizza" className="basicTitle" />

          <div className="baseDropdownContainer">
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
          <div className='verificationMsg'>{this.state.message}</div>
          <StyledButton
            variant="basicButton"
            text="Add to Cart"
            type="button"
            onClick={this.handleSubmit}
            // disabled={
            //   this.props.pizza.crust.type === null ||
            //   this.props.pizza.sauce.type === null
            // }
          />
        </div>
      </Container>
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
  popCart: state.menu.popCart,
});

export default connect(mapStateToProps, {
  setMenu,
  setBase,
  setPizza,
  clearPizza,
  addBasePrice,
  setPopCart,
})(CreatePizza);
