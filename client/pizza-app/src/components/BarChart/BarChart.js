import React from 'react';
import * as d3 from 'd3';

export default class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 10,
            width: 300,
            data: 0.4
        }
    }

    componentDidMount = () => {
        this.drawCanvas()
    }

    drawCanvas = () => {
        const {width, height} = this.state;

        //canvas
        const svg = d3.select('#chart')
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
            .attr('width', width * this.state.data)
            .style('fill', 'brown');

    }

    render() {
        return <div id='bar'/>
    }
}