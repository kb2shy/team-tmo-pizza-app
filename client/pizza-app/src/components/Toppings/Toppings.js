import React from 'react';
import ToppingCard from '../ToppingCard/ToppingCard';
import { Card } from "react-bootstrap";

class Toppings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Meats: ["Pepperoni", "Sausage", "Bacon"],
            Veggies: ["Olives", "Mushrooms"]
        }
    }

    //TO-DO: Get array of toppings from correct category from database

    //Needs type (i.e. 'Meats') from parent components
    //Renders specific Topping section with cards for each topping
    render() {
        return (
            <Card className="text-center">
                <Card.Header>
                    <Card.Title>{this.props.type}</Card.Title>
                </Card.Header>
                <Card.Body>
                    {this.state[this.props.type].map((item, i) => {
                        return <ToppingCard key={item} label={item}/>
                    })}
                </Card.Body>
            </Card>
        )
    }
}

export default Toppings;