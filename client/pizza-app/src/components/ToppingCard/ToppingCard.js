import React from 'react';
import { connect } from "react-redux";
import BarChart from '../BarChart/BarChart';
import { Card } from "react-bootstrap";
import { addTopping, removeTopping } from '../../actions/order';

class ToppingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            style: { width: '200px', display: 'inline-block', margin: '10px' }
        }
    }

    //TO-DO get number of pizzas with this topping / total number of pizzas
    //Get percentage of topping from db, currently getting random percentage
    getPercent = () => {
        const total = this.props.pastPizzaIds.length;
        let percent = Math.random();
        ///get percentage of topping ordered from database
        return { percent, total };
    }

    handleClick = () => {
        //change card background
        const newStyle = this.state.status ? { ...this.state.style, background: 'white'} : { ...this.state.style, background: '#ffcc99'};

        //Update store
        if(this.state.status) {
            this.props.removeTopping(this.props.type, this.props.label);
        } else {
            this.props.addTopping(this.props.type, this.props.label);
        }

        //change status
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
            onClick={(e) => this.handleClick()}>
                <Card.Body>
                    <Card.Title>{this.props.label}</Card.Title>
                    {this.props.isAuthenticated ? <BarChart data={this.getPercent()} item={this.props.label}/> : null}
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    meats: state.order.meats,
    veggies: state.order.veggies,
    isAuthenticated: state.auth.isAuthenticated,
    pastPizzaIds: state.toppings.pastPizzaIds
  });
  
export default connect(mapStateToProps, { addTopping, removeTopping })(ToppingCard);