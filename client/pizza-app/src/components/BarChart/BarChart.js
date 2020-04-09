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

        //canvas
        const svg = d3.select(`#bar${this.props.item}`)
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
            .attr('width', width * this.props.data)
            .style('fill', 'brown');

    }

    render() {
        return <div id={`bar${this.props.item}`}/>
    }
}