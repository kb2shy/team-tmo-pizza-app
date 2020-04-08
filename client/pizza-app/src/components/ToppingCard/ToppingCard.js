import React from 'react';
import BarChart from '../BarChart/BarChart';
import { Card } from "react-bootstrap";

class ToppingCard extends React.Component {

    getPercent = () => {
        let percent = 0.6;
        ///get percentage of topping ordered from database
        return percent;
    }

    render() {
        return (
            <Card style={{ width: '140px', display: 'inline-block' }} className="text-center">
                <Card.Body>
                    <Card.Title>{this.props.label}</Card.Title>
                    <BarChart data={this.getPercent} index={this.props.index}/>
                </Card.Body>
            </Card>
        )
    }
}

export default ToppingCard;