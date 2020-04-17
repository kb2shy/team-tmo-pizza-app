import React from 'react';
import { connect } from 'react-redux';
import { Button, Card } from "react-bootstrap";
import { setPopCart } from '../../actions/menu';

import OrderSummary from '../OrderSummary/OrderSummary';

class PopCart extends React.Component {
    render() {
      return (
        <div style={{position: 'absolute', right: '0px', width: '400px', zIndex: 3, border: '1px solid gray', backgroundColor: 'white', padding: '20px'}}>
          <Button style={{position: 'absolute', left: '10px'}} onClick={() => this.props.setPopCart(!this.props.popCart)}> {'<<< Close Cart'}</Button>
          <h3>Cart</h3>
          <OrderSummary/>
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    pizzas: state.pizzas,
    popCart: state.menu.popCart
  });
  
  export default connect(mapStateToProps, { setPopCart })(PopCart);
  