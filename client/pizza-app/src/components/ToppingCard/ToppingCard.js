import React from 'react';
import { connect } from "react-redux";
import BarChart from '../BarChart/BarChart';
import { Card } from "react-bootstrap";
import { ADD_TOPPING, REMOVE_TOPPING } from '../../actions/types';

class ToppingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            style: { width: '150px', display: 'inline-block', margin: '10px' }
        }
    }

    //TO-DO get number of pizzas with this topping / total number of pizzas
    //Get percentage of topping from db, currently getting random percentage
    getPercent = () => {
        let percent = Math.random();
        ///get percentage of topping ordered from database
        return percent;
    }

    //Set clicked look and change toppings array in state
    changeBackground = () => {
        const newStyle = this.state.status ? { ...this.state.style, background: 'white'} : { ...this.state.style, background: '#ffcc99'};
        this.state.status ? this.props.removeTopping(this.props.label) : this.props.addTopping(this.props.label);
        const newStatus = !this.state.status;
        this.setState({style: newStyle, status: newStatus});
    }

    //Renders card with topping name and percentage bar chart
    render() {
        return (
            <Card 
            id={this.props.label}
            style={this.state.style} 
            className="text-center"
            onClick={(e) => this.changeBackground()}>
                <Card.Body>
                    <Card.Title>{this.props.label}</Card.Title>
                    <BarChart data={this.getPercent()} item={this.props.label}/>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    toppings: state.toppings.toppings,
  });

const mapStateToDispatch = (dispatch) => ({
    addTopping: ADD_TOPPING,
    removeTopping: REMOVE_TOPPING
  });
  
export default connect(mapStateToProps)(ToppingCard);