import React from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Container } from 'react-bootstrap';

// Helper Components
import Toppings from '../Toppings/Toppings';
import BaseDropDown from './BaseDropDown';
import PopCart from '../Cart/PopCart';

// Actions
import {
  setBase,
  clearPizza,
  addBasePrice,
  addTotalPrice,
} from '../../actions/pizza';
import { addPizza } from '../../actions/pizzas';
import { nextMenu, setPopCart } from '../../actions/menu';

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
      quantity: '',
    };

    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  MAX_PIZZA_QUANTITY = 100;
  MIN_PIZZA_QUANTITY = 1;

  componentDidMount = () => {
    this.props.setPopCart(false);
  };

  //changes store to user input
  handleChange = (name, item) => {
    this.props.setBase(name.toLowerCase(), item);
}

    //Adds current pizza to pizzas array and clears current pizza
    handleSubmit = () => {
        // if (this.verifyUserInput()){
            const basePrice = this.calcBasePrice()
            const totalPrice = this.calcTotalPrice(basePrice);
            const currentPizza = this.props.pizza;
            this.props.addPizza({ ...currentPizza, basePrice: basePrice, totalPrice, quantity: this.props.pizza.quantity});
            this.props.clearPizza()
            this.props.nextMenu(this.props.step);
        //}
    };
  

  toggleShowCart = () => {};

 

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

    basePrice += this.props.pizza.size.price;
    addBasePrice(basePrice);

    return basePrice.toFixed(2);
  };

  // Calculates total price of pizza (quantity * base price)
  calcTotalPrice = (basePrice) => {
    let totalPrice = basePrice;

    // state.quantity has been changed from default to a new number
    if (Number.isInteger(this.state.quantity)) {
      this.props.pizza.quantity = this.state.quantity;
    }

    totalPrice *= this.props.pizza.quantity;
    addTotalPrice(totalPrice);
    return totalPrice.toFixed(2);
  };

  // handler for user-inputted quantities between [1 ... 100]
  handleQuantityChange = (e) => {
    e.preventDefault();
    let value = parseInt(e.target.value);
    // if (isNaN(value) || value < this.MIN_PIZZA_QUANTITY) {
    //   value = this.MIN_PIZZA_QUANTITY;
    // } else if (value > this.MAX_PIZZA_QUANTITY) {
    //   value = this.MAX_PIZZA_QUANTITY;
    // }
    this.setState({ quantity: value });
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


  //Renders topping sections and quantity input
  render() {
    return (
      <Container fluid>
        <div className="centerDiv">
          {this.props.popCart ? <PopCart /> : null}
          <StyledTitle text="Create Your Pizza" className="basicTitle" />

          <div className="baseDropdownContainer">
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

          <Form onSubmit={this.handleSubmit}>
            <Form.Group as={Row}>
              {/* centers the quantity form in the center */}
              <Col md={{ span: 2, offset: 5 }}>
                <div className="quantityForm">
                  <Form.Label>Quantity: </Form.Label>
                  <Form.Control
                    name="quantity"
                    type="number"
                    min={this.MIN_PIZZA_QUANTITY}
                    max={this.MAX_PIZZA_QUANTITY}
                    placeholder={this.props.pizza.quantity}
                    value={this.state.quantity}
                    onChange={this.handleQuantityChange}
                  />
                </div>
              </Col>
            </Form.Group>
            <div style={{ color: 'red' }}>{this.state.message}</div>
            <StyledButton
              variant="basicButton"
              text="Add to Cart"
              type="submit"
              // onClick={this.handleSubmit}
              disabled={this.props.pizza.size.type === null || this.props.pizza.crust.type === null || this.props.pizza.sauce.type === null}

            />
          </Form>
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
  step: state.menu.step,
  popCart: state.menu.popCart,
});

export default connect(mapStateToProps, {
  nextMenu,
  setBase,
  clearPizza,
  addPizza,
  addBasePrice,
  setPopCart,
  addTotalPrice,
})(CreatePizza);
