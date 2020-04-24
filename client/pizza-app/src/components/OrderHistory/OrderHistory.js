import React from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row } from 'react-bootstrap';
// import OrderDisplay from './OrderDisplay';

// Custom Styling
import StyledTitle from '../common/Title/StyledTitle';
import OrderDisplay from './OrderDisplay';

// OrderHistory: displayed for logged in user
// - Title component
// - OrderSummary component (another component could wrap around order summary if needed).
//   Suggestion: Pass down info to OrderSummary as props as OrderSummary is also used in the Cart component.
// How to query:
// - Query all order ids associated with customer_id on mount
// - Query info for pagination, when the pagination button is clicked; see react-bootstrap pagination for details

/**
 * Original code written by Abigail
 * @param {} props 
 */
// const OrderHistory = (props) => {
//   const ordersRev = props.orders.reverse();

//   {
//     if (props.user !== null) {
//       return (
//         <div className="centerDiv">
//           <StyledTitle text="Order History" className="basicTitle" />
//           {/* <h3>OrderHistory</h3> */}

//           <Container>
//             {props.orders !== null ? (
//               ordersRev.map((order) => {
//                 return (
//                   <OrderDisplay
//                     orderId={order}
//                     key={'key_' + order}
//                   ></OrderDisplay>
//                 );
//               })
//             ) : (
//               <p>You have no previous orders</p>
//             )}
//           </Container>
//         </div>
//       );
//     }
//   }
// };

const OrderHistory = (props) => {
  const ordersReversed = props.orders.reverse();

  return (
    <Container className="centerDiv">
      <StyledTitle text="Order History" className="basicTitle" />
      <Row>
        {ordersReversed.map((order, index) => (
          <Col md="4" key={index}>
            <OrderDisplay order_id={order}/>
          </Col>
        ))}
      </Row>

    </Container>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  orders: state.database.pastOrderIds,
});

export default connect(mapStateToProps)(OrderHistory);
