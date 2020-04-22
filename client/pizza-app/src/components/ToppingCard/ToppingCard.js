import React from 'react';
import { connect } from "react-redux";
import BarChart from '../BarChart/BarChart';
import { Card } from "react-bootstrap";
import { addTopping, removeTopping } from '../../actions/pizza';
import classes from './ToppingCard.module.css'

class ToppingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            style: { width: '200px', display: 'inline-block', margin: '10px' }
        }
    }

    //set component state from store state
    componentDidMount() {
       if (this.props.type === 'meats') {
            for (let meat of this.props.meats) {
                if (meat.type === this.props.item.type) {
                    this.setState({ style: { ...this.state.style, background: '#ffcc99' }, status: true });
                    break;
                }
            }
        }
        else if (this.props.type === 'veggies'){
            for (let veggies of this.props.veggies) {
                if (veggies.type === this.props.item.type) {
                    this.setState({ style: { ...this.state.style, background: '#ffcc99' }, status: true });
                    break;
                }
            }
        } else {
            for (let cheeses of this.props.cheeses) {
                if (cheeses.type === this.props.item.type) {
                    this.setState({ style: { ...this.state.style, background: '#ffcc99' }, status: true });
                    break;
                }
            }
        }
    }

    handleClick = () => {
        //change card background
        const newStyle = this.state.status ? { ...this.state.style, background: 'rgba(19, 36, 30, 0)',  boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.637),  -2px -2px 0px 0px rgba(253, 238, 238, 0.692)' } : { ...this.state.style, background: '#ffcc99', boxShadow: "2px 2px 0px 0px rgba(253, 238, 238, 0.692),  -2px -2px 0px 0px  rgba(0, 0, 0, 0.637)" 
 };

        //Update store
        if (this.state.status) {
            this.props.removeTopping(this.props.type, this.props.item);
        } else {
            this.props.addTopping(this.props.type, this.props.item);
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
                id={this.props.item.type}
                style={this.state.style}
                className="text-center"
                onClick={(e) => this.handleClick()}
                className={classes.toppingCardWrapper}>
                <Card.Body className={classes.toppingCardBody}>
                    <Card.Title className={classes.toppingCardTitle}>{this.props.item.type} </Card.Title>
                    <Card.Text>{this.props.item.price!== undefined ? `$${this.props.item.price.toFixed(2)}` : null}</Card.Text>
                    {(this.props.isAuthenticated && total > 0) ? <BarChart count={this.props.item.count} total={total} item={this.props.item.type.replace(/\s+/g, '')} /> : null}
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    cheeses: state.pizza.toppings.cheeses,
    meats: state.pizza.toppings.meats,
    veggies: state.pizza.toppings.veggies,
    isAuthenticated: state.auth.isAuthenticated,
    pastPizzaIds: state.database.pastPizzaIds
});


export default connect(mapStateToProps, { addTopping, removeTopping })(ToppingCard);