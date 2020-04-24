import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { Card } from 'react-bootstrap';
import { GET_ALL_ORDER_INFO_BY_ORDER_ID } from '../../config/gqlDefines'
import './OrderHistory.css';

import { PDFDownloadLink } from '@react-pdf/renderer';
import Receipt from '../Confirmation/Receipt/Receipt';
import StyledButton from '../common/Button/StyledButton';
import OrderDetails from './OrderDetails';

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

/**
 * OrderDisplay component displays:
 * Confirmation Number
 * Order Date
 * PDF downloadable link to get past orders
 * Props:
 * order_id
 */
const OrderDisplay = ({ order_id }) => {

  const { loading, error, data } = useQuery(GET_ALL_ORDER_INFO_BY_ORDER_ID, { variables: { order_id } })
  if (error) return <p>{error.message}</p>
  if (loading) return <p>Loading...</p>

  const {
    address,
    created_at,
    customer,
    delivery,
    pizzas
  } = data.getAllOrderInfoByOrderId

  const dateParser = () => {
    const date = new Date(Number(created_at));
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    const ampm = ((hour >= 12 && minutes > 0) ? "pm" : "am");
    hour = (hour > 12 ? (hour - 12) : hour);
    minutes = (minutes < 10 ? `0${minutes}` : minutes);
    return `${MONTHS[month]} ${day}, ${year} at ${hour}:${minutes} ${ampm}`;
  }

  const pizzaToppings = (cheeses, veggies, meats) => {
    // add toppings into array to build into toppingString
    const toppingsArray = [];
    for (let c of cheeses) {
        toppingsArray.push(c.cheese_type);
    }
    for (let v of veggies) {
        toppingsArray.push(v.veggie_type)
    }
    for (let m of meats) {
        toppingsArray.push(m.meat_type);
    }

    let toppingString = "";
    for (let i = 0; i < toppingsArray.length; i++) {
        if (i === toppingsArray.length - 1) {
            toppingString += `and ${toppingsArray[i]}`;
        } else {
            toppingString += `${toppingsArray[i]}, `;
        } 
    }
    
    return toppingString.length !== 0 ? toppingString : `No Toppings`;
}

  const getPizzaDetails = (pizza, key) => {
    const pizzaBaseDetails = `${pizza.size.size_type} ${pizza.crust.crust_type} with ${pizza.sauce.sauce_type}`;
    const pizzaToppingsString = pizzaToppings(pizza.cheeses, pizza.veggies, pizza.meats);

    return <OrderDetails key={key} pizza={pizza}></OrderDetails>
  }

  return (
    <Card style={{ marginBottom: 5 }}>
      <Card.Header>
        {`Confirmation #${order_id}\n`}
        {`Ordered on ${dateParser()}`}
      </Card.Header>
      <Card.Body>
        {pizzas.map((pizza, index) => getPizzaDetails(pizza, index))}
      </Card.Body>
      <Card.Footer>
        <PDFDownloadLink
          document={<Receipt user={customer}
            orderDate={created_at}
            pizzas={pizzas}
            orderId={order_id} />}
          delivery={delivery}
          fileName={`PizzaOrder-${order_id}.pdf`}
          style={{ textDecoration: "none", color: "black" }}
        >
          {({ blob, url, loading, error }) => (
            loading ?
              'Loading document...' :
              <StyledButton
                type="button"
                text="Download receipt"
                variant="basicButton"
              />
          )
          }
        </PDFDownloadLink>
      </Card.Footer>
    </Card>
  )
}

export default OrderDisplay;
