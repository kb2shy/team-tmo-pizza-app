import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Title from '../Title/Title'
import {Pagination} from 'react-bootstrap'
import { GET_ALL_PIZZA_INFO_BY_ORDER } from '../../config/gqlDefines';
// - Pagination (see react-bootstrap pagination)
// - OrderSummary component (another component could wrap around order summary if needed).
//   Suggestion: Pass down info to OrderSummary as props as OrderSummary is also used in the Cart component.
// How to query:
// - Query all order ids associated with customer_id on mount
// - Query info for pagination, when the pagination button is clicked; see react-bootstrap pagination for details

const PaginationItem = props => {
    return (
        <div>
            <Pagination.Item key={props.index} active={props.active} onClick={props.onClick}>{props.index} </Pagination.Item>

        </div>
    )
}

PaginationItem.propTypes = {

}

export default PaginationItem
