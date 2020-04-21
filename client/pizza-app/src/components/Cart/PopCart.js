import React from 'react';
import { connect } from 'react-redux';
import { Button } from "react-bootstrap";
import { setPopCart, setMenu } from '../../actions/menu';

import StyledButton from '../common/Button/StyledButton';

import OrderSummary from './OrderSummary/OrderSummary';
class PopCart extends React.Component {
    render() {
      return (
        <div style={{position: 'absolute', right: '0px', width: '400px', zIndex: 3, border: '1px solid gray', backgroundColor: 'white', padding: '20px'}}>
          {/* <StyledButton
            variant="popCartButton"
            type="button"
            onClick={() => this.props.setPopCart(!this.props.popCart)}
            text='<<< Close Cart'
          /> */}
          <Button style={{position: 'absolute', left: '10px'}} onClick={() => this.props.setPopCart(!this.props.popCart)}> {'<<< Close Cart'}</Button>
          <h3>Cart</h3>
          {this.props.pizzas.length > 0 ? <OrderSummary/> : <p style={{padding: '20px 0px'}}>There is nothing in your cart.</p>}
          <StyledButton
            variant="basicButton"
            type="button"
            onClick={() => this.props.setMenu(4, this.props.step)}
            text='Submit Order'
          />
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    pizzas: state.pizzas,
    popCart: state.menu.popCart,
    step: state.menu.step
  });
  
  export default connect(mapStateToProps, { setPopCart, setMenu })(PopCart);
  