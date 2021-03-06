import React from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Container } from 'react-bootstrap';

// Helper Components
import StyledButton from '../common/Button/StyledButton';
import BaseDropDown from '../CreatePizza/BaseDropDown';

// Actions
import { setBase, clearPizza, setQuantity } from '../../actions/pizza';
import { addPizza, updatePizzaInPizzas } from '../../actions/pizzas';
import { setMenu } from '../../actions/menu';

import './SizeQuantityPrompt.css'
class SizeQuantityPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.pizza.quantity,
      size: this.props.size.type,
    };
  }

  MAX_PIZZA_QUANTITY = 100;
  MIN_PIZZA_QUANTITY = 1;

  handleSizeChange = (type, item) => {
    this.setState({ size: item });
    this.props.setBase('size', item);
  };

  // handler for user-inputted quantities between [1 ... 100]
  handleQuantityChange = (e) => {
    e.preventDefault();
    let value = parseInt(e.target.value);
    this.setState({ quantity: value });
    this.props.setQuantity(value);
  };

  // Calculates total price of pizza (quantity * base price)
  calcTotalPrice = (basePrice) => {
    let totalPrice = basePrice;

    // state.quantity has been changed from default to a new number
    if (Number.isInteger(this.state.quantity))
      this.props.pizza.quantity = this.state.quantity;

    totalPrice *= this.props.pizza.quantity;
    return totalPrice.toFixed(2);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const currentPizza = { ...this.props.pizza };

    // // trying to implement editing a pizza at its real-time index in pizzas
    if (currentPizza.editPizzaFlag) {
      this.props.setQuantity(this.state.quantity);
      this.props.setBase('size', this.state.size);
      // update the whatever has changed in the pizza here
      //  this.props.updatePizzaInPizzas(currentPizza.index, currentPizza)
    }

    const basePrice = (
      Number(currentPizza.basePrice) + currentPizza.size.price
    ).toFixed(2);
    const totalPrice = this.calcTotalPrice(basePrice);
    this.props.addPizza({
      ...currentPizza,
      basePrice,
      totalPrice,
      editPizzaFlag: false,
    });
    this.props.clearPizza();
    this.props.setMenu(4);
  };

  render() {
    return (
      <Container fluid className='sizeContainer'>
        <Col md={{ span: 2, offset: 5 }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group as={Row}>
              <BaseDropDown
                value={this.props.size.type || 'Choose Size'}
                type={'Size'}
                options={this.props.sizes}
                handleChange={this.handleSizeChange}
              />

              <div className="quantityForm">
                <Form.Label>Quantity: </Form.Label>
                <Form.Control
                  name="quantity"
                  type="number"
                  min={this.MIN_PIZZA_QUANTITY}
                  max={this.MAX_PIZZA_QUANTITY}
                  placeholder={String(this.state.quantity)}
                  value={String(this.state.quantity)}
                  onChange={this.handleQuantityChange}
                />
              </div>
            </Form.Group>
            <StyledButton
              variant="basicButton"
              disabled={
                this.props.size.type === null || isNaN(this.state.quantity)
              }
              text="Add to Cart"
              type="submit"
            />
          </Form>
        </Col>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  size: state.pizza.size,
  sizes: state.database.sizes,
  pizza: state.pizza,
});

export default connect(mapStateToProps, {
  setBase,
  setQuantity,
  clearPizza,
  addPizza,
  updatePizzaInPizzas,
  setMenu,
})(SizeQuantityPrompt);
