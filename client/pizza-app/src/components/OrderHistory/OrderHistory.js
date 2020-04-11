import React, { useState, useEffect, useMutation, useQuery } from 'react'
import PropTypes from 'prop-types'
import Title from '../Title/Title'
import { connect } from "react-redux";
import { Pagination } from 'react-bootstrap'
import PaginationItem from './PaginationItem'
import { gql } from 'apollo-boost';
//import GET_CUST_ORDERS from '../../config/gqlDefines'
// OrderHistory: displayed for logged in user
// - Title component
// - Pagination (see react-bootstrap pagination)
// - OrderSummary component (another component could wrap around order summary if needed).
//   Suggestion: Pass down info to OrderSummary as props as OrderSummary is also used in the Cart component.
// How to query:
// - Query all order ids associated with customer_id on mount
// - Query info for pagination, when the pagination button is clicked; see react-bootstrap pagination for details

const OrderHistory = props => {

    const GET_CUST_ORDERS = gql`
    query GetAllOrdersByCustomer($customer_id: Int!){
      getAllOrdersByCustomer(customer_id: $customer_id){
        order_id
      }
  }
  `
    //TODO: get customerId value from store instead
    let customerId = 1
    let [active, alterActive] = useState(0)
    let [oIds, setOIds] = useState([])
    const items = [1, 2, 3, 4, 5]
 //   const { loading, error, data } = useQuery(GET_CUST_ORDERS, { variables: { customerId } })
    // if (error) return <p>{error.message}</p>
    // if (loading) return <p>Loading...</p>

    // const handleClick = async () => {
    //   alterActive()
    // }

    //  items.map
    return (
        <div>
            <Title title="Order History"></Title>
            <Pagination>
                {
                    props.user !== null ? items.map((order, index) => {
                        return (
                            <PaginationItem index={index + 1} active={index === active} onClick={()=>alterActive(index)}></PaginationItem>
                        )
                    }) : <div></div>
                }
                <p>active: {active}</p>
            </Pagination>

        </div>
    )
}

OrderHistory.propTypes = {

}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(OrderHistory);


