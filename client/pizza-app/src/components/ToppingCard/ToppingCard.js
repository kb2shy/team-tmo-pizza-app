import React from 'react';
import BarChart from '../BarChart/BarChart';
import { Card } from "react-bootstrap";

class ToppingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            style: { width: '150px', display: 'inline-block', margin: '10px' }
        }
    }

    //Get percentage of topping from db
    getPercent = () => {
        let percent = Math.random();
        ///get percentage of topping ordered from database
        return percent;
    }

    //Set clicked look
    changeBackground = () => {
        const newStyle = this.state.status ? { ...this.state.style, background: 'white'} : { ...this.state.style, background: '#ffcc99'};
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

export default ToppingCard;