import React from 'react'
import PropTypes from 'prop-types'

// OrderHistory: displayed for logged in user
// - Title component
// - Pagination (see react-bootstrap pagination)
// - OrderSummary component (another component could wrap around order summary if needed).
//   Suggestion: Pass down info to OrderSummary as props as OrderSummary is also used in the Cart component.
// How to query:
// - Query all order ids associated with customer_id on mount
// - Query info for pagination, when the pagination button is clicked; see react-bootstrap pagination for details
const OrderHistory = props => {
    return (
        <div>
            OrderHistory
        </div>
    )
}

OrderHistory.propTypes = {

}

export default OrderHistory
