// import React from 'react'
// import PropTypes from 'prop-types'

// // Sub-component used in Card and OrderHistory
// const OrderSummary = props => {
//     return (
//         <div>

//         </div>
//     )
// }

// OrderSummary.propTypes = {

// }

// export default OrderSummary

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Card, Button } from 'react-bootstrap';

const mystyle = { backgroundColor: 'blue' };

class OrderSummary extends Component {
  render() {
    return (
      <div style={mystyle}>
        <p>OrderSummary</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // meats: state.toppings.meats,
});

export default connect(mapStateToProps)(OrderSummary);
