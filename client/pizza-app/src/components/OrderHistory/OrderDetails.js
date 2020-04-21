import React from 'react'
import { Card, Accordion, Button } from 'react-bootstrap';

const OrderDetails = (props) => {
    const pizza_id = props.pizzaId
    const meats = props.meats
    const veggies = props.veggies
    const cheeses = props.cheeses
    
    return (
        <Accordion>
            <Card key={'key_'+pizza_id}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        view details
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>Toppings
                    <Card.Text><b>Cheeses:</b>
                        {
                            cheeses.map((cheeseSelect, index) => {
                                return(
                                    index !== cheeses.length-1 ? <React.Fragment key={'key_'+cheeseSelect.cheese_type+index}> {cheeseSelect.cheese_type}, </React.Fragment> : <React.Fragment key={'key_'+cheeseSelect.cheese_type+index}> {cheeseSelect.cheese_type}</React.Fragment>
                                )
                            })
                        }
                        </Card.Text>
                        <Card.Text><b>Meats:</b>
                        {
                            meats.map((meatSelect, index) => {
                                return(
                                    index !== meats.length-1 ? <React.Fragment key={'key_'+meatSelect.meat_type +index}> {meatSelect.meat_type}, </React.Fragment> : <React.Fragment key={'key_'+meatSelect.meat_type +index}> {meatSelect.meat_type}</React.Fragment>
                                )
                            })
                        }
                        </Card.Text>
                        <Card.Text><b>Veggies:</b>
                        {
                            veggies.map((veggieSelect, index) => {
                                return(
                                    index !== veggies.length-1 ? <React.Fragment key={'key_'+veggieSelect.veggie_type+index}> {veggieSelect.veggie_type}, </React.Fragment> : <React.Fragment key={'key_'+veggieSelect.veggie_type+index}> {veggieSelect.veggie_type}</React.Fragment>
                                )
                            })
                        }
                        </Card.Text>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default OrderDetails