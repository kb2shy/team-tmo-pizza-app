import React from 'react';
import { connect } from "react-redux";
import BarChart from '../BarChart/BarChart';
import { Card } from "react-bootstrap";
import { addTopping, removeTopping } from '../../actions/pizza';

class ToppingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            style: { width: '200px', display: 'inline-block', margin: '10px' }
        }
    }

    //get state from store
    componentDidMount() {
       if (this.props.type === 'meats') {
            for (let meat of this.props.meats) {
                if (meat === this.props.label) {
                    this.setState({ style: { ...this.state.style, background: '#ffcc99' }, status: true });
                    break;
                }
            }
        }
        else {
            for (let veggies of this.props.veggies) {
                if (veggies === this.props.label) {
                    this.setState({ style: { ...this.state.style, background: '#ffcc99' }, status: true });
                    break;
                }
            }
        }
    }

    handleClick = () => {
        //change card background
        const newStyle = this.state.status ? { ...this.state.style, background: 'white' } : { ...this.state.style, background: '#ffcc99' };

        //Update store
        if (this.state.status) {
            this.props.removeTopping(this.props.type, this.props.label);
        } else {
            this.props.addTopping(this.props.type, this.props.label);
        }

        //change status
        const newStatus = !this.state.status;
        this.setState({ style: newStyle, status: newStatus });
    }


    //Renders card with topping name and percentage bar chart
    render() {
        const total = this.props.pastPizzaIds.length;

        return (
            <Card
                id={this.props.label}
                style={this.state.style}
                className="text-center"
                onClick={(e) => this.handleClick()}>
                <Card.Body>
                    <Card.Title>{this.props.label}</Card.Title>
                    <Card.Text>${this.props.price.toFixed(2)}</Card.Text>
                    {(this.props.isAuthenticated && total > 0) ? <BarChart count={this.props.count} total={total} item={this.props.label} /> : null}
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    meats: state.pizza.toppings.meats,
    veggies: state.pizza.toppings.veggies,
    isAuthenticated: state.auth.isAuthenticated,
    pastPizzaIds: state.database.pastPizzaIds
});


export default connect(mapStateToProps, { addTopping, removeTopping })(ToppingCard);
