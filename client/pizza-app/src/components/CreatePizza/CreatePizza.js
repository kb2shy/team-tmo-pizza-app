import React from 'react';
import { connect } from "react-redux";
import { setBase }  from '../../actions/pizza';
import { nextMenu } from '../../actions/menu';
import { Button } from "react-bootstrap";

import './CreatePizza.css';
import Toppings from '../Toppings/Toppings';

class CreatePizza extends React.Component {

    //changes store to user input
    handleChange = (e, item) => {
        this.props.setBase(e.target.name.toLowerCase(), item);
    }

    //Renders topping sections
    render() {
        return (
            <div className='centerDiv'>
                <h3 className='createPizzaTitle'>Create Your Pizza</h3>
                <table className='toppingTable'>
                    <tbody>
                        <RadioButtonRow type={'Size'} options={this.props.sizes} handleChange={this.handleChange}/>
                        <RadioButtonRow type={'Crust'} options={this.props.crusts} handleChange={this.handleChange}/>
                        <RadioButtonRow type={'Sauce'} options={this.props.sauces} handleChange={this.handleChange}/>
                        <RadioButtonRow type={'Cheese'} options={this.props.cheeses} handleChange={this.handleChange}/>
                    </tbody>
                </table>

                <table className='toppingTable'>
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
    sizes: state.database.sizes,
    sauces: state.database.sauces,
    cheeses: state.database.cheeses,
    crusts: state.database.crusts,
});

export default connect(mapStateToProps, { nextMenu, setBase })(CreatePizza);