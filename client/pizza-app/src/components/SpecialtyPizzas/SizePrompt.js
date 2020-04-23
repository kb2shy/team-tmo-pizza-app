import React from 'react';
import { connect } from 'react-redux';
import { setBase } from '../../actions/pizza';

import StyledButton from '../common/Button/StyledButton';
import BaseDropDown from '../CreatePizza/BaseDropDown';

class SpecialtyPizzas extends React.Component {
    handleChange = (type, item) => {
        this.props.setBase('size', item);
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
                    onClick={(e) => this.props.handleSubmit(this.props.pizza, this.props.size)}
                    disabled={this.props.size.type === null}
                    text="Add to Cart"
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    size : state.pizza.size,
    sizes: state.database.sizes
});
  
export default connect(mapStateToProps, { setBase })(SpecialtyPizzas);