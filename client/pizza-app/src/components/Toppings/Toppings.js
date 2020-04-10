import React from 'react';
import { connect } from "react-redux";
import { getTotalNumberPizzas } from '../../actions/toppings';
import { Card } from "react-bootstrap";
import ToppingCard from '../ToppingCard/ToppingCard';

class Toppings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayName: 'allMeats'
        }
    }

    //Get correct array from store
    componentDidMount = () => {
        const arrayName = this.props.type === 'Meats' ? 'allMeats' : 'allVeggies';
        this.setState({arrayName});
    }

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
                    {this.props[this.state.arrayName].map((item) => {
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
    allMeats: state.toppings.allMeats,
    allVeggies: state.toppings.allVeggies
  });
  
export default connect(mapStateToProps, { getTotalNumberPizzas })(Toppings);