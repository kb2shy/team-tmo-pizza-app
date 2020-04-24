import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { Card, Row, Col } from 'react-bootstrap';
import { GET_ALL_ORDER_INFO_BY_ORDER_ID } from '../../config/gqlDefines'
// import OrderDetails from './OrderDetails'
import './OrderHistory.css';

import { PDFDownloadLink } from '@react-pdf/renderer';
import Receipt from '../Confirmation/Receipt/Receipt';
import StyledButton from '../common/Button/StyledButton';

/**
 * Original component created by Abigail
 */
// const OrderDisplay = (props) => {

//   const order_id = props.orderId
//   const { loading, error, data } = useQuery(GET_ALL_ORDER_INFO_BY_ORDER_ID, { variables: { order_id } })
//   if (error) return <p>{error.message}</p>
//   if (loading) return <p>Loading...</p>

//   return (
//     <React.Fragment>
//       <Row key={'key1_' + order_id}><h5 >Order # {order_id}</h5></Row>
//       <Row key={'key2_' + order_id}>
//         {
//           data.getAllOrderInfoByOrderId.pizzas.map((pizza, index) => {
//             return (
//               <Col key={'key_col_' + order_id + index}>
//                 <Card style={{ width: '18rem' }} key={'key_card_' + order_id + index} className="orderDisplayCard">
//                   <Card.Body key={'key_body_' + order_id + index}>
//                     <Card.Title >Pizza {index + 1}</Card.Title>
//                     <Card.Text><b>Size: </b>{pizza.size.size_type}</Card.Text>
//                     <Card.Text><b>Crust:</b> {pizza.crust.crust_type}</Card.Text>
//                     <Card.Text><b>Sauce:</b> {pizza.sauce.sauce_type}</Card.Text>
//                     <OrderDetails pizzaId={pizza.pizza_id} cheeses={pizza.cheeses} veggies={pizza.veggies} meats={pizza.meats} key={'key_details_' + order_id + index}></OrderDetails>

//                   </Card.Body>
//                 </Card>
//               </Col>
//             )
//           })
//         }
//       </Row>
//     </React.Fragment>
//   );
// };

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

  return (
    <Card style={{ marginBottom: 5 }}>
      {/* {console.log(data)} */}
      <Card.Header>
        {`Confirmation #${order_id}`}
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {`Ordered on ${dateParser()}`}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <PDFDownloadLink
          document={<Receipt user={customer}
            orderDate={created_at}
            pizzas={pizzas}
            order={order_id} />}
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
