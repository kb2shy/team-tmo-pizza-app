import React from 'react';
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import ToppingCard from '../ToppingCard/ToppingCard';

class Toppings extends React.Component {

    //Needs type (i.e. 'Meats') from parent components
    //Renders specific Topping section with cards for each topping
    render() {
        //console.log(this.props.meats)
        return (
            <Card className="text-center">
                <Card.Header>
                    <Card.Title>{this.props.type}</Card.Title>
                </Card.Header>
                <Card.Body>
                    {/* Map correct array (veggies or meats) */}
                    {this.props[this.props.type.toLowerCase()].map((item, i) => {
                        const itemLabel = this.props.type === 'Meats' ? item.meats.meat_type : item.veggies.veggie_type;

                        return <ToppingCard key={`${this.props.type}${i}`} label={itemLabel} type={this.props.type.toLowerCase()} count={item.count}/>
                    })}
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    meats: state.database.meats,
    veggies: state.database.veggies
  });
  
export default connect(mapStateToProps)(Toppings);