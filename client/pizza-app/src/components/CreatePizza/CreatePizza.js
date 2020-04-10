import React from 'react';
import { connect } from "react-redux";
import { getToppings } from '../../actions/toppings';
import Toppings from '../Toppings/Toppings';

class CreatePizza extends React.Component {

    componentDidMount = () => {
        this.props.getToppings('veggies');
        this.props.getToppings('meats');
    }

    //Renders topping sections
    render() {
        return (
            <div>
                <Toppings type={'Veggies'}/>
                <Toppings type={'Meats'}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { getToppings })(CreatePizza);