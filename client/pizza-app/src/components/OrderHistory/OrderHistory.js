import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import OrderDisplay from './OrderDisplay';

// Custom Styling
import StyledTitle from '../common/Title/StyledTitle';

// OrderHistory: displayed for logged in user
// - Title component
// - OrderSummary component (another component could wrap around order summary if needed).
//   Suggestion: Pass down info to OrderSummary as props as OrderSummary is also used in the Cart component.
// How to query:
// - Query all order ids associated with customer_id on mount
// - Query info for pagination, when the pagination button is clicked; see react-bootstrap pagination for details

const OrderHistory = (props) => {
  const ordersRev = props.orders.reverse();

  {
    if (props.user !== null) {
      return (
        <div className="centerDiv">
          <StyledTitle text="Order History" className="basicTitle" />
          {/* <h3>OrderHistory</h3> */}

          <Container>
            {props.orders !== null ? (
              ordersRev.map((order) => {
                return (
                  <OrderDisplay
                    orderId={order}
                    key={'key_' + order}
                  ></OrderDisplay>
                );
              })
            ) : (
              <p>You have no previous orders</p>
            )}
          </Container>
        </div>
      );
    }
  }
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  orders: state.database.pastOrderIds,
});

export default connect(mapStateToProps)(OrderHistory);
