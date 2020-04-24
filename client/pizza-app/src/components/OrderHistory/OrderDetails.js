import React from 'react'
import { Card, Accordion, Button } from 'react-bootstrap';
import './OrderHistory.css'
const OrderDetails = (props) => {
  const pizza_id = props.pizzaId
  const meats = props.meats
  const veggies = props.veggies
  const cheeses = props.cheeses

  return (
    <Accordion>
      <Card key={'key_' + pizza_id}>
        <Card.Header >
          <Accordion.Toggle as={Button} variant="link" eventKey="0" className="orderViewDetail">
            View Details
                    </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Toppings
                    <Card.Text><b>{cheeses.length > 0 ? 'Cheeses:' : null}</b>
              {
                cheeses.map((cheeseSelect, index) => {
                  return (
                    index !== cheeses.length - 1 ? <React.Fragment key={'key_' + cheeseSelect.cheese_type + index}> {cheeseSelect.cheese_type}, </React.Fragment> : <React.Fragment key={'key_' + cheeseSelect.cheese_type + index}> {cheeseSelect.cheese_type}</React.Fragment>
                  )
                })
              }
            </Card.Text>
            <Card.Text><b>{meats.length > 0 ? 'Meats:' : null}</b>
              {
                meats.map((meatSelect, index) => {
                  return (
                    index !== meats.length - 1 ? <React.Fragment key={'key_' + meatSelect.meat_type + index}> {meatSelect.meat_type}, </React.Fragment> : <React.Fragment key={'key_' + meatSelect.meat_type + index}> {meatSelect.meat_type}</React.Fragment>
                  )
                })
              }
            </Card.Text>
            <Card.Text><b>{veggies.length > 0 ? 'Veggies:' : null}</b>
              {
                veggies.map((veggieSelect, index) => {
                  return (
                    index !== veggies.length - 1 ? <React.Fragment key={'key_' + veggieSelect.veggie_type + index}> {veggieSelect.veggie_type}, </React.Fragment> : <React.Fragment key={'key_' + veggieSelect.veggie_type + index}> {veggieSelect.veggie_type}</React.Fragment>
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