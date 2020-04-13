import React from 'react';
import { connect } from "react-redux";
import { getOrderIds } from '../../actions/database';
import { setBase }  from '../../actions/pizza';
import { nextMenu } from '../../actions/menu';
import { Button } from "react-bootstrap";
import Toppings from '../Toppings/Toppings';

class CreatePizza extends React.Component {

    componentDidMount = () => {
        this.props.getOrderIds(1);
    }

    //changes store to user input
    handleChange = (e, item) => {
        this.props.setBase(e.target.name.toLowerCase(), item.toLowerCase());
    }

    //Renders topping sections
    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <RadioButtonRow type={'Size'} options={['Small', 'Medium', 'Large', 'X-Large']} handleChange={this.handleChange}/>
                        <RadioButtonRow type={'Crust'} options={['Standard', 'Thin Crust', 'Deep Dish']} handleChange={this.handleChange}/>
                        <RadioButtonRow type={'Sauce'} options={['Red', 'Cheese', 'BBQ', 'Buffalo']} handleChange={this.handleChange}/>
                        <RadioButtonRow type={'Cheese'} options={['Light', 'Standard', 'Extra']} handleChange={this.handleChange}/>
                    </tbody>
                </table>

                <table>
                    <tbody>
                        <tr>
                            <td>
                                <p>Veggies</p>
                            </td>
                            <td>
                                <Toppings type={'Veggies'}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Meats</p>
                            </td>
                            <td>
                                <Toppings type={'Meats'}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button onClick={this.props.nextMenu}>Add to Cart</Button>
            </div>
        )
    }
}

//Creates a row with title and all necessary radio buttons
class RadioButtonRow extends React.Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.type}
                </td>
                    {this.props.options.map(item => {
                        return (
                            <td key={item}>
                                <input type='radio' 
                                    name={this.props.type} 
                                    selected={this.props[this.props.type.toLowerCase()] === item.toLowerCase()} 
                                    onChange={(e) => this.props.handleChange(e, item)}
                                />
                                <label>{item}</label>
                            </td>
                        )
                    })}
            </tr>
        )
    }
}

const mapStateToProps = (state) => ({
    size: state.pizza.size,
    crust: state.pizza.crust,
    sauce: state.pizza.sauce,
    cheese: state.pizza.cheese
});

export default connect(mapStateToProps, { nextMenu, getOrderIds, setBase })(CreatePizza);