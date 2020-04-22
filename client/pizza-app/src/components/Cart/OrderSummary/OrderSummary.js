import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';

// Helper Components
import PizzaCard from './PizzaCard';
import StyledButton from '../../common/Button/StyledButton';

// Actions
import { setPizza, clearPizza } from '../../../actions/pizza';
import { removePizza } from '../../../actions/pizzas';
import { previousMenu } from '../../../actions/menu';

import './OrderSummary.css';

/**
 * OrderSummary component
 * @param {*}  pizzas - reducer with info for all of the user's added to cart pizzas
 * Display the info all pizzas added to the cart, with options to edit or remove pizzas
 */

class OrderSummary extends React.Component {
  constructor(props) {
    super(props);
    this.editPizza = this.editPizza.bind(this);
  }

  editPizza = (index) => {
    const pizza = this.props.pizzas[index];
    this.props.setPizza(pizza);
    this.props.removePizza(index);
    this.props.previousMenu();
  };

  render() {
    return (
      <div>
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
                    <p>Quantity: {pz.quantity}</p>

                    <StyledButton
                      text="Edit Pizza"
                      type="Button"
                      variant="orderSummaryButton"
                      onClick={() => this.editPizza(index)}
                      size="sm"
                    />

                    <StyledButton
                      text="Remove Pizza"
                      type="Button"
                      variant="orderSummaryButton"
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
})(OrderSummary);
