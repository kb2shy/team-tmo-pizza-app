import React from 'react';
import { connect } from 'react-redux';
import { Button } from "react-bootstrap";
import { setPopCart, setMenu } from '../../actions/menu';

import './PopCart.css'

import StyledButton from '../common/Button/StyledButton';

import OrderSummary from './OrderSummary/OrderSummary';
class PopCart extends React.Component {
    render() {
      return (
        <div className="popCartModal">
          <StyledButton
            variant="popCartButton"
            type="button"
            onClick={() => this.props.setPopCart(!this.props.popCart)}
            text='<<< Close Cart'
          />
          <h3>Cart</h3>
          {this.props.pizzas.length > 0 ? <OrderSummary/> : <p style={{padding: '20px 0px'}}>There is nothing in your cart.</p>}
          <StyledButton
            variant="closeCartButton"
            type="button"
            onClick={() => this.props.setMenu(4)}
            text='Submit Order'
          />
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    pizzas: state.pizzas,
    popCart: state.menu.popCart
  });
  
  export default connect(mapStateToProps, { setPopCart, setMenu })(PopCart);
  