import React from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks'
import { Card, Row, Col } from 'react-bootstrap';
import { GET_ALL_PIZZAS_BY_ORDER } from '../../config/gqlDefines'
import OrderDetails from './OrderDetails'

const OrderDisplay = (props) => {

    const order_id = props.orderId
    const { loading, error, data } = useQuery(GET_ALL_PIZZAS_BY_ORDER, { variables: { order_id } })
    if (error) return <p>{error.message}</p>
    if (loading) return <p>Loading...</p>

    return (
        <React.Fragment>
            <Row><h5 >Order # {props.orderId}</h5></Row>
            <Row>
                {
                    data.getAllPizzasByOrder.map((pizza, index) => {
                        return (
                            <Col>
                                <Card style={{ width: '18rem' }} key={'key_' + index}>
                                    <Card.Body>
                                        <Card.Title >Pizza {index + 1}</Card.Title>
                                        <Card.Text><b>Size: </b>{pizza.size.size_type}</Card.Text>
                                        <Card.Text><b>Crust:</b> {pizza.crust.crust_type}</Card.Text>
                                        <Card.Text><b>Sauce:</b> {pizza.sauce.sauce_type}</Card.Text>
                                        <Card.Text><b>Cheese: </b>{pizza.cheese.cheese_type}</Card.Text>
                                        <OrderDetails pizzaId={pizza.pizza_id} key={'key_' + index}></OrderDetails>
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

const mapStateToProps = (state) => {

};

export default connect(mapStateToProps)(OrderDisplay);
