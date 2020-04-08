import React from 'react';
import ToppingCard from '../ToppingCard/ToppingCard';

class Toppings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meats: ["Pepperoni", "Sausage", "Bacon"]
        }
    }

    render() {
        return (
            <div>
                <h3>{this.props.type}</h3>
                {this.state.meats.map((item, i) => {
                    return <ToppingCard key={item} label={item} index={i}/>
                })}
            </div>
        )
    }
}

export default Toppings;