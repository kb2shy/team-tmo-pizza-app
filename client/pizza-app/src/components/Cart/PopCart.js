import React from 'react';
import { connect } from 'react-redux';
import { Button } from "react-bootstrap";
import { setPopCart } from '../../actions/menu';
import './PopCart.css'
import StyledButton from '../common/Button/StyledButton';

import OrderSummary from './OrderSummary/OrderSummary';
class PopCart extends React.Component {
    render() {
      return (
        <div className="popCartModal">
          {/* <StyledButton
            variant="popCartButton"
            type="button"
            onClick={() => this.props.setPopCart(!this.props.popCart)}
            text='<<< Close Cart'
          /> */}
          <h3>Cart</h3>
          {this.props.pizzas.length > 0 ? <OrderSummary /> : <p style={{ padding: '20px 0px' }}>There is nothing in your cart.</p>}
          <Button variant="closeCartButton" onClick={() => this.props.setPopCart(!this.props.popCart)}> {'<<< Close Cart'}</Button>
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    pizzas: state.pizzas,
    popCart: state.menu.popCart
  });
  
  export default connect(mapStateToProps, { setPopCart })(PopCart);
  