import React from 'react'
import { connect } from "react-redux";
import { Pagination, Container, Row } from 'react-bootstrap'
import OrderDisplay from './OrderDisplay'
// OrderHistory: displayed for logged in user
// - Title component
// - OrderSummary component (another component could wrap around order summary if needed).
//   Suggestion: Pass down info to OrderSummary as props as OrderSummary is also used in the Cart component.
// How to query:
// - Query all order ids associated with customer_id on mount
// - Query info for pagination, when the pagination button is clicked; see react-bootstrap pagination for details

const OrderHistory = props => {
    const ordersRev = props.orders.reverse()
    return (
        <div className="centerDiv">
            <h3>OrderHistory</h3>

            <Container>
                {
                    ordersRev.map((order, index) => {
                        return <OrderDisplay orderId={order}></OrderDisplay>
                    })
                }
            </Container>

        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    orders: state.database.pastOrderIds
});

export default connect(mapStateToProps)(OrderHistory)
