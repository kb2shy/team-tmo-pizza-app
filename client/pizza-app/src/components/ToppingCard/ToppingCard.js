import React from 'react';
import BarChart from '../BarChart/BarChart';

class ToppingCard extends React.Component {
    constructor(props) {
        super(props);
    }

    getPercent = () => {
        let percent = 0.6;
        ///get percentage of topping ordered
        return percent;
    }

    render() {
        return (
            <Card>
                <H3>{this.props.label}</H3>
                <BarChart data={this.getPercent}/>
            </Card>
        )
    }
}