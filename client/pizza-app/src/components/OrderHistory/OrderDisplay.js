import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { Card, Row, Col } from 'react-bootstrap';
import { GET_ALL_PIZZA_INFO_BY_ORDER } from '../../config/gqlDefines'
import OrderDetails from './OrderDetails'

const OrderDisplay = (props) => {

    const order_id = props.orderId
    const { loading, error, data } = useQuery(GET_ALL_PIZZA_INFO_BY_ORDER, { variables: { order_id } })
    if (error) return <p>{error.message}</p>
    if (loading) return <p>Loading...</p>

    return (
        <React.Fragment>
            <Row key={'key1_'+order_id}><h5 >Order # {order_id}</h5></Row>
            <Row key={'key2_'+order_id}>
                {
                    data.getAllPizzaInfoByOrder.map((pizza, index) => {
                        return (
                            <Col key={'key_col_'+order_id+index}>
                                <Card style={{ width: '18rem' }} key={'key_card_'+order_id + index}>
                                    <Card.Body key={'key_body_'+order_id + index}>
                                        <Card.Title >Pizza {index + 1}</Card.Title>
                                        <Card.Text><b>Size: </b>{pizza.size.size_type}</Card.Text>
                                        <Card.Text><b>Crust:</b> {pizza.crust.crust_type}</Card.Text>
                                        <Card.Text><b>Sauce:</b> {pizza.sauce.sauce_type}</Card.Text>
                                        <OrderDetails pizzaId={pizza.pizza_id} cheeses={pizza.cheeses} veggies={pizza.veggies} meats={pizza.meats} key={'key_details_'+order_id+ index}></OrderDetails>

                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </React.Fragment>
    );
};

export default OrderDisplay;
