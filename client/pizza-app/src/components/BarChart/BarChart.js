import React from 'react';
import * as d3 from 'd3';

export default class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 10,
            width: 100
        }
    }

    componentDidMount = () => {
        this.drawCanvas()
    }

    drawCanvas = () => {
        const {width, height} = this.state;
        //remove white spaces from id
        const id = this.props.item.replace(/\s+/g, '');

        //canvas
        const svg = d3.select(`#bar${id}`)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g');
        
        //bar
        svg.append("rect")
            .attr('height', height)
            .attr('width', width)
            .style("fill", "gray");

        //fill
        svg.append("rect")
            .attr('height', height)
            .attr('width', width * this.props.data.percent)
            .style('fill', 'brown');

    }

    render() {
        //remove white spaces from id
        const id = this.props.item.replace(/\s+/g, '');
        return (
            <div>
                <div id={`bar${id}`}/>
                {this.props.data.total}
            </div>
        )
    }
}