import React from 'react';
import { connect } from 'react-redux';
import { setBase, clearPizza } from '../../actions/pizza';
import { addPizza } from '../../actions/pizzas';
import { nextMenu } from '../../actions/menu';
import { Dropdown, DropdownButton } from 'react-bootstrap';
// import { Button } from "react-bootstrap";

// Custom Styling
import StyledButton from '../common/Button/StyledButton';
import StyledTitle from '../common/Title/StyledTitle';

import './CreatePizza.css';
import Toppings from '../Toppings/Toppings';

class CreatePizza extends React.Component {
  //changes store to user input
  handleChange = (name, item) => {
    this.props.setBase(name.toLowerCase(), item);
  };

  //Adds current pizza to pizzas array and clears current pizza
  handleSubmit = () => {
    const currentPizza = this.props.pizza;
    this.props.addPizza(currentPizza);
    //this.props.clearPizza()
    this.props.nextMenu(this.props.step);
  };

  //Renders topping sections
  render() {
    return (
      <div className="centerDiv">
        <StyledTitle text="Create Your Pizza" className="basicTitle"/>
        {/* <h3 className="createPizzaTitle">Create Your Pizza</h3> */}
        <BaseDropDown
          value={this.props.pizza.size || 'Choose Size'}
          type={'Size'}
          options={this.props.sizes}
          handleChange={this.handleChange}
        />
        <BaseDropDown
          value={this.props.pizza.crust || 'Choose Crust Type'}
          type={'Crust'}
          options={this.props.crusts}
          handleChange={this.handleChange}
        />
        <BaseDropDown
          value={this.props.pizza.sauce || 'Choose Sauce'}
          type={'Sauce'}
          options={this.props.sauces}
          handleChange={this.handleChange}
        />

        <table className="toppingTable">
          <tbody>
            <tr>
              <td>
                <p>Additional Cheeses</p>
              </td>
              <td>
                <Toppings type={'Cheeses'} />
              </td>
            </tr>
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
        {/* <Button onClick={this.handleSubmit}>Add to Cart</Button> */}
        <StyledButton
          variant="formButton"
          text="Add to Cart"
          onClick={this.handleSubmit}
        />
      </div>
    );
  }
}

//Creates a row with title and all necessary radio buttons
class BaseDropDown extends React.Component {
  render() {
    // console.log(this.props.value);
    return (
      <div>
        <h5>{this.props.type}</h5>
        <DropdownButton id="dropdown-basic-button" title={this.props.value}>
          {this.props.options.map((item) => {
            return (
              <Dropdown.Item
                key={item}
                name={this.props.type}
                onClick={(e) => {
                  this.props.handleChange(this.props.type, item);
                  this.setState({ title: item });
                }}
              >
                {item}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sizes: state.database.sizes,
  sauces: state.database.sauces,
  cheeses: state.database.cheeses,
  crusts: state.database.crusts,
  pizza: state.pizza,
  step: state.menu.step,
});

export default connect(mapStateToProps, {
  nextMenu,
  setBase,
  clearPizza,
  addPizza,
})(CreatePizza);
