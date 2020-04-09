import React from 'react';
import { connect } from "react-redux";
import BarChart from '../BarChart/BarChart';
import { Card } from "react-bootstrap";
import { addTopping, removeTopping } from '../../actions/toppings';

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
        //this.state.status ? this.props.removeTopping(this.props.label) : this.props.addTopping(this.props.label);

        if(this.state.status) {
            console.log('remove');
            this.props.removeTopping(this.props.label);
        } else {
            console.log('add');
            this.props.addTopping(this.props.label);
        }

        const newStatus = !this.state.status;
        this.setState({style: newStyle, status: newStatus});
    }

    //Renders card with topping name and percentage bar chart
    render() {
        console.log(this.props.toppings)
        return (
            <Card 
            id={this.props.label}
            style={this.state.style} 
            className="text-center"
            onClick={(e) => this.changeBackground()}>
                <Card.Body>
                    <Card.Title>{this.props.label}</Card.Title>
                    <BarChart data={this.getPercent()} item={this.props.label}/>
                    {/* {this.props.isAuthenticated ? <BarChart data={this.getPercent()} item={this.props.label}/> : null} */}
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    toppings: state.toppings.toppings,
    // isAuthenticated: state.auth.isAuthenticated
  });
  
export default connect(mapStateToProps, { addTopping, removeTopping })(ToppingCard);