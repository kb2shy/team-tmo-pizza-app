import React from 'react';
import ToppingCard from '../ToppingCard/ToppingCard';

class Toppings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toppings 
        }
    }

    getPercent = () => {
        let percent = 0.6;
        ///get percentage of topping ordered
        return percent;
    }

    render() {
        return (
            <div className='card'>
                <h3>{this.props.label}</H3>
                <BarChart data={this.getPercent}/>
            </div>
        )
    }
}