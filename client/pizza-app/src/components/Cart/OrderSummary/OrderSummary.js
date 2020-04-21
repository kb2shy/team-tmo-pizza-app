import React from 'react';
import { connect } from 'react-redux';
import PizzaCard from './PizzaCard';
import StyledButton from '../../common/Button/StyledButton';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { setPizza, clearPizza } from '../../../actions/pizza';
import {
  removePizza,
  updatePizzaQty,
} from '../../../actions/pizzas';
import { previousMenu } from '../../../actions/menu';

/* TODO: qty
  - change the form input for that pizza ONLY
  - update the pizza's total price based on the quantity inputted    - update the total order price
   - set a limit on the pizza input-- say, 25 max
   - implement +/- or up/down buttons as another way to change qty
          - the action types for this: INCREMENT_PIZZA_QTY, DECREMENT_PIZZA_QTY
*/

/**
 * OrderSummary component
 * @param {*}  pizzas - reducer with info for all of the user's added to cart pizzas
 * 1. iterates through all pizzas associated with this user
 * 2. renders a card displaying each pizza's info via PizzaCard subcomponent
 */
const footerStyle = { display: 'flex', flexDirection: 'row' };

class OrderSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: '',
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

  // bug here!!!!!!!!!!!!!!!!!!!!!!!!
  handleChange = (e, index) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ qty: value });
    console.log(`OrderSummary.js/ handleChange(): updating qty: ${value} on pizzas[index ${index}]`);
    this.props.updatePizzaQty(index, value);
  };

  render() {
    return (
      <div>
        {this.props.pizzas.map((pz, index) => {
          return (
            <div id = {index} key={index}>
              <Card>
                <Card.Body>
                  <PizzaCard
                    size={pz.size}
                    crust={pz.crust}
                    sauce={pz.sauce}
                    cheese={pz.cheese}
                    toppings={pz.toppings}
                    qty={pz.qty}
                    price={pz.totalPrice}
                    index={index}
                  />
                  <div style={footerStyle}>
                    <Form>
                      <Form.Group as={Row}>
                        <Form.Label column>Qty:</Form.Label>
                        <Col>
                          <Form.Control
                            name="qty"
                            type="text"
                            placeholder={pz.qty}
                            value={this.state.qty}
                            onChange={(e) => this.handleChange(e, index)}
                          />
                        </Col>
                      </Form.Group>
                    </Form>

                    <StyledButton
                      text="Edit Pizza"
                      type="Button"
                      variant="basicButton"
                      onClick={() => this.editPizza(index)}
                    />

                    <StyledButton
                      text="Remove Pizza*"
                      type="Button"
                      variant="basicButton"
                      onClick={() => removePizza(index)}
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
  updatePizzaQty,
})(OrderSummary);
