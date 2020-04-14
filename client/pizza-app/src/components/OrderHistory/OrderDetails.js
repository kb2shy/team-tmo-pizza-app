import React from 'react'
import { GET_VEGGIES_BY_PIZZA } from '../../config/gqlDefines'
import { GET_MEATS_BY_PIZZA } from '../../config/gqlDefines'
import { Card, Accordion, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks'

const OrderDetails = (props) => {
    const pizza_id = props.pizzaId

    const { loading: loadingVeggie, error: errorVeggie, data: dataVeggie } = useQuery(GET_VEGGIES_BY_PIZZA, { variables: { pizza_id } })
    const { loading, error, data } = useQuery(GET_MEATS_BY_PIZZA, { variables: { pizza_id } })
    if(loadingVeggie) return <p>{errorVeggie.message}</p>
    if(loadingVeggie) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    if (loading) return <p>Loading...</p>

    return (
        <Accordion>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        view details
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>Toppings
                        <Card.Text><b>Meats:</b>
                        {
                            data.getSelectedMeats.map((meatSelect, index) => {
                                return(
                                    index !== data.getSelectedMeats.length-1 ? <React.Fragment> {meatSelect.meat.meat_type}, </React.Fragment> : <React.Fragment>{meatSelect.meat.meat_type}</React.Fragment>
                                )
                            })
                        }
                        </Card.Text>
                        <Card.Text><b>Veggies:</b>
                        {
                            dataVeggie.getSelectedVeggies.map((veggieSelect, index) => {
                                return(
                                    index !== dataVeggie.getSelectedVeggies.length-1 ? <React.Fragment> {veggieSelect.veggie.veggie_type}, </React.Fragment> : <React.Fragment>{veggieSelect.veggie.veggie_type}</React.Fragment>
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