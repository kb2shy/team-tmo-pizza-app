import React from 'react';
import * as d3 from 'd3';

export default class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 10,
            width: 100,
            canvas: d3.select(`#bar${this.props.item.replace(/\s+/g, '')}`)
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
            .style("background-color", "gray") //border
            .append('g');
        
        this.setState({canvas: svg});
    }

    drawBar = () => {
        const {width, height, canvas} = this.state;

        canvas.selectAll("rect")
            .remove();

        const filledWidth = (this.props.count/this.props.total) !== 0 ? width * (this.props.count/this.props.total) : 0;
        let unfilledWidth = filledWidth !== 0 ? width - filledWidth - 3 : width - 2;
        unfilledWidth = filledWidth === width ? 0 : unfilledWidth;
        const unfilledTrans = filledWidth !== 0 ? filledWidth + 2 : filledWidth + 1;

        //unfilled
        canvas.append("rect")
        .attr('height', height-2)
        .attr('width', unfilledWidth)
        .attr('transform', `translate(${unfilledTrans}, 1)`)
        .style('fill', '#ffe6cc')

        //filled
        canvas.append("rect")
        .attr('height', height-2)
        .attr('width', filledWidth)
        .attr('transform', 'translate(1, 1)')
        .style('fill', 'brown')
    }

    render() {
        this.drawBar();
        //remove white spaces from id
        const id = this.props.item.replace(/\s+/g, '');
        return (
            <div>
                <div id={`bar${id}`}/>
            </div>
        )
    }
}