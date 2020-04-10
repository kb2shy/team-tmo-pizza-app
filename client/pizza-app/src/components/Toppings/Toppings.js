import React from 'react';
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import ToppingCard from '../ToppingCard/ToppingCard';

class Toppings extends React.Component {

    calcPizzasOrdered = () => {

    }

    //Needs type (i.e. 'Meats') from parent components
    //Renders specific Topping section with cards for each topping
    render() {
        return (
            <Card className="text-center">
                <Card.Header>
                    <Card.Title>{this.props.type}</Card.Title>
                </Card.Header>
                <Card.Body>
                    {/* Map correct array (veggies or meats) */}
                    {this.props[this.props.type.toLowerCase()].map((item) => {
                        const itemLabel = this.props.type === 'Meats' ? item.meat_type : item.veggie_type;
                        const itemId = this.props.type === 'Meats' ? item.meat_id : item.veggie_id;

                        return <ToppingCard key={itemId} label={itemLabel} type={this.props.type.toLowerCase()}/>
                    })}
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    meats: state.toppings.meats,
    veggies: state.toppings.veggies
  });
  
export default connect(mapStateToProps)(Toppings);