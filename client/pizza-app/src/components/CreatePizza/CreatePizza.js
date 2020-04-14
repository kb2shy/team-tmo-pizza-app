import React from 'react';
import { connect } from "react-redux";
import { setBase, clearPizza } from '../../actions/pizza';
import { addPizza } from '../../actions/pizzas';
import { nextMenu } from '../../actions/menu';
import { Button } from "react-bootstrap";

import './CreatePizza.css';
import Toppings from '../Toppings/Toppings';

class CreatePizza extends React.Component {
    constructor(props) {
        super(props);
    }

    //changes store to user input
    handleChange = (name, item) => {
        this.props.setBase(name.toLowerCase(), item);
    }

    //Adds current pizza to pizzas array and clears current pizza
    handleSubmit = () => {
        const currentPizza = this.props.pizza;
        this.props.addPizza(currentPizza);
        this.props.nextMenu(this.props.step);
    }

    //Renders topping sections
    render() {
        return (
            <div className='centerDiv'>
                <h3 className='createPizzaTitle'>Create Your Pizza</h3>
                <table className='toppingTable'>
                    <tbody>
                        <RadioButtonRow value={this.props.pizza.size} type={'Size'} options={this.props.sizes} handleChange={this.handleChange} />
                        <RadioButtonRow value={this.props.pizza.crust} type={'Crust'} options={this.props.crusts} handleChange={this.handleChange} />
                        <RadioButtonRow value={this.props.pizza.sauce} type={'Sauce'} options={this.props.sauces} handleChange={this.handleChange} />
                        <RadioButtonRow value={this.props.pizza.cheese} type={'Cheese'} options={this.props.cheeses} handleChange={this.handleChange} />
                    </tbody>
                </table>

                <table className='toppingTable'>
                    <tbody>
                        <tr>
                            <td>
                                <p>Veggies</p>
                            </td>
                            <td>
                                <Toppings type={'Veggies'} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Meats</p>
                            </td>
                            <td>
                                <Toppings type={'Meats'} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button onClick={this.handleSubmit}>Add to Cart</Button>
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
                                onChange={(e) => this.props.handleChange(this.props.type, item)}
                                checked={item === this.props.value}      
                            />
                            <label 
                                name={this.props.type} 
                                onClick={() => this.props.handleChange(this.props.type, item)}
                            >
                                {item}
                            </label>
                        </td>
                    )
                })}
            </tr>
        )
    }
}

const mapStateToProps = (state) => ({
    sizes: state.database.sizes,
    sauces: state.database.sauces,
    cheeses: state.database.cheeses,
    crusts: state.database.crusts,
    pizza: state.pizza,
    step: state.menu.step
});

export default connect(mapStateToProps, { nextMenu, setBase, clearPizza, addPizza })(CreatePizza);
