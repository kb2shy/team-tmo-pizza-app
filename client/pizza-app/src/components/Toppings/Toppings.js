import React from 'react';
import { connect } from "react-redux";
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
                    {this.props[this.state.arrayName].map((item, i) => {
                        return <ToppingCard key={item} label={item} type={this.props.type.toLowerCase()}/>
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
  
export default connect(mapStateToProps)(Toppings);