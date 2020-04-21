import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PizzaCard from './PizzaCard';
import StyledButton from '../../common/Button/StyledButton';
import { Form, Row, Col, Card } from 'react-bootstrap';

import { setPizza, clearPizza } from '../../../actions/pizza';
import { removePizza, updatePizzaQuantity } from '../../../actions/pizzas';
import { previousMenu } from '../../../actions/menu';

export class PizzaWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.pizza.quantity.toString(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.editPizza = this.editPizza.bind(this);
    this.removePizza = this.removePizza.bind(this);
  }

  editPizza = (e) => {
    e.preventDefault();
    this.props.setPizza(this.props.pizza);
    this.props.removePizza(this.props.index);
    this.props.previousMenu();
  };

  removePizza = (e) => {
    e.preventDefault();
    this.props.removePizza(this.props.index);
  };

  handleChange = (e) => {
    e.preventDefault();
    let num = parseInt(e.target.value.trim());
    this.setState({ quantity: isNaN(num) ? '' : num.toString() });
  };

  handleBlur = (e) => {
    e.preventDefault();
    let num = parseInt(e.target.value.trim());
    if (isNaN(num) || num < 1) {
      num = 1;
    } else if (num > 1000) {
      num = 1000;
    }
    this.props.updatePizzaQuantity(this.props.index, num);
    this.setState({ quantity: num.toString() });
  };

  render() {
    const { pizza, index } = this.props;

    return (
      <Card className="mb-1">
        <Card.Body>
          <PizzaCard
            size={pizza.size}
            crust={pizza.crust}
            sauce={pizza.sauce}
            cheese={pizza.cheese}
            toppings={pizza.toppings}
            quantity={pizza.quantity}
            price={pizza.totalPrice}
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
                    // placeholder={pz.quantity}
                    value={this.state.quantity}
                    onChange={(e) => this.handleChange(e)}
                    onBlur={(e) => this.handleBlur(e)}
                  />
                </Col>
              </Form.Group>
            </Form>

            <StyledButton
              text="Edit Pizza"
              type="Button"
              variant="basicButton"
              onClick={(e) => this.editPizza(e)}
              size="sm"
            />

            <StyledButton
              text="Remove Pizza*"
              type="Button"
              variant="basicButton"
              onClick={(e) => this.removePizza(e)}
              size="sm"
            />
          </div>
        </Card.Body>
      </Card>
    );
  }
}

PizzaWrapper.propTypes = {
  pizza: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(null, {
  setPizza,
  removePizza,
  clearPizza,
  previousMenu,
  updatePizzaQuantity,
})(PizzaWrapper);
