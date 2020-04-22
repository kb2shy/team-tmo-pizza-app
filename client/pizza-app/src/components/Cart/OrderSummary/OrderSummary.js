import React from 'react';
import { connect } from 'react-redux';
import PizzaCard from './PizzaCard';
import StyledButton from '../../common/Button/StyledButton';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { setPizza, clearPizza } from '../../../actions/pizza';
import {
  removePizza,
  updatePizzaQuantity,
  updatePizzaTotalPrice,
} from '../../../actions/pizzas';
import { previousMenu } from '../../../actions/menu';
import './OrderSummary.css';

/* TODO: quantity
  - change the form input for that pizza ONLY -> done!
  - update the pizza's total price based on the quantity inputted -> done!
  - update the total order price -> done!
   - set a limit on the pizza input-- say, 25 max
   - implement +/- or up/down buttons as another way to change quantity
          - the action types for this: INCREMENT_PIZZA_quantity, DECREMENT_PIZZA_quantity
*/

/**
 * OrderSummary component
 * @param {*}  pizzas - reducer with info for all of the user's added to cart pizzas
 * 1. iterates through all pizzas associated with this user
 * 2. renders a card displaying each pizza's info via PizzaCard subcomponent
 */

class OrderSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: '',
    };
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.editPizza = this.editPizza.bind(this);
  }

  editPizza = (index) => {
    const pizza = this.props.pizzas[index];
    this.props.setPizza(pizza);
    this.props.removePizza(index);
    this.props.previousMenu();
  };

  handleQuantityChange = (e, index) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ quantity: value });
    this.props.updatePizzaQuantity(index, value);

    // console.log(`quantity value: ${typeof value} ${parseInt(value)}`)
    // console.log(`price value: ${this.props.pizzas[index].basePrice}`)
    // console.log(`= ${(parseInt(value) * this.props.pizzas[index].basePrice)}`)
    const newTotalPrice = (
      parseInt(value) * this.props.pizzas[index].basePrice
    ).toFixed(2);

    this.props.updatePizzaTotalPrice(index, newTotalPrice);
    this.setState({ quantity: '' });
  };

  render() {
    console.log(this.props.pizzas);
    return (
      <div >
        {this.props.pizzas.map((pz, index) => {
          return (
            <div id={index} key={index}>
              <Card className="orderSummaryContainer">
                <Card.Body className="orderSummaryCardBody">
                  <PizzaCard
                    size={pz.size}
                    crust={pz.crust}
                    sauce={pz.sauce}
                    cheese={pz.cheese}
                    toppings={pz.toppings}
                    quantity={pz.quantity}
                    price={pz.totalPrice}
                    index={index}
                  />
                  <hr />
                  <div className="footerStyle">
                    <Form>
                      <Form.Group as={Row}>
                        <Form.Label column>Quantity:</Form.Label>
                        <Col>
                          <Form.Control
                            name="quantity"
                            type="text"
                            placeholder={pz.quantity}
                            value={this.state.quantity}
                            onChange={(e) =>
                              this.handleQuantityChange(e, index)
                            }
                          />
                        </Col>
                      </Form.Group>
                    </Form> */}

                    <StyledButton
                      text="Edit"
                      type="Button"
                      variant="orderSummaryButton"
                      onClick={() => this.editPizza(index)}
                      size="sm"
                    />

                    <StyledButton
                      text="Remove*"
                      type="Button"
                      variant="orderSummaryButton"
                      onClick={() => removePizza(index)}
                      size="sm"
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pizzas: state.pizzas,
  };
};

export default connect(mapStateToProps, {
  setPizza,
  removePizza,
  clearPizza,
  previousMenu,
  updatePizzaQuantity,
  updatePizzaTotalPrice,
})(OrderSummary);
