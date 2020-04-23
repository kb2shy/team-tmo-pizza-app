import React from 'react';
import { connect } from 'react-redux';
import { setBase, clearPizza } from '../../actions/pizza';
import { addPizza } from '../../actions/pizzas';
import { setMenu } from '../../actions/menu';

import StyledButton from '../common/Button/StyledButton';
import BaseDropDown from '../CreatePizza/BaseDropDown';

class SizePrompt extends React.Component {
    handleChange = (type, item) => {
        this.props.setBase('size', item);
    }

    handleSubmit = (size) => {
        const currentPizza = {...this.props.pizza};
        this.props.addPizza(
            {
                ...currentPizza, 
                size,
                basePrice: (Number(currentPizza.basePrice) + size.price).toFixed(2),
                totalPrice: (Number(currentPizza.basePrice) + size.price).toFixed(2),
                quantity: 1
            }
        );
        this.props.clearPizza();
        this.props.setMenu(4);
    }

    render() {
        return (
            <div>
                <BaseDropDown
                    value={this.props.size.type || 'Choose Size'}
                    type={'Size'}
                    options={this.props.sizes}
                    handleChange={this.handleChange}
                />

                <StyledButton
                    variant="basicButton"
                    onClick={(e) => this.handleSubmit(this.props.size)}
                    disabled={this.props.size.type === null}
                    text="Add to Cart"
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    size : state.pizza.size,
    sizes: state.database.sizes,
    pizza: state.pizza
});
  
export default connect(mapStateToProps, { setBase, clearPizza, addPizza, setMenu })(SizePrompt);