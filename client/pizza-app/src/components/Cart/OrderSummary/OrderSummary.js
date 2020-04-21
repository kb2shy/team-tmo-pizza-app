import React from 'react';
import { connect } from 'react-redux';
import PizzaCard from './PizzaCard';
import StyledButton from '../../common/Button/StyledButton';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { setPizza, clearPizza } from '../../../actions/pizza';
import { removePizza, updatePizzaQuantity } from '../../../actions/pizzas';
import { previousMenu } from '../../../actions/menu';
import './OrderSummary.css';

/* TODO: quantity
  - change the form input for that pizza ONLY
  - update the pizza's total price based on the quantity inputted    - update the total order price
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
    this.handleChange = this.handleChange.bind(this);
    this.editPizza = this.editPizza.bind(this);
  }

  editPizza = (index) => {
    const pizza = this.props.pizzas[index];
    this.props.setPizza(pizza);
    this.props.removePizza(index);
    this.props.previousMenu();
  };

  handleChange = (e, index) => {
    e.preventDefault();
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > 1000) {
      value = 1000;
    }
    this.setState({ quantity: value.toString() });
    this.props.updatePizzaQuantity(index, value);
    // this.setState({ quantity: '' });
  };

  render() {
    console.log(this.props.pizzas);
    return (
      <div>
        {this.props.pizzas.map((pz, index) => {
          return (
            <div id={index} key={index}>
              <Card>
                <Card.Body>
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
                        <Form.Label column>quantity:</Form.Label>
                        <Col>
                          <Form.Control
                            name="quantity"
                            type="text"
                            placeholder={pz.quantity}
                            value={this.state.quantity}
                            onChange={(e) => this.handleChange(e, index)}
                          />
                        </Col>
                      </Form.Group>
                    </Form> */}

                    <StyledButton
                      text="Edit"
                      type="Button"
                      variant="basicButton"
                      onClick={() => this.editPizza(index)}
                      size="sm"
                    />

                    <StyledButton
                      text="Remove*"
                      type="Button"
                      variant="basicButton"
                      onClick={() => this.props.removePizza(index)}
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
})(OrderSummary);
