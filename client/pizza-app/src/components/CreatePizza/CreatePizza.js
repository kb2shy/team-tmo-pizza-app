import React from 'react';
import { connect } from "react-redux";
import { getToppings, getOrderIds } from '../../actions/toppings';
import Toppings from '../Toppings/Toppings';

class CreatePizza extends React.Component {

    componentDidMount = () => {
        this.props.getToppings('veggies');
        this.props.getToppings('meats');
        // if(this.props.user !== null) {
        //     this.props.getTotalNumberOrders(this.props.user.customer_id);
        // }
        this.props.getOrderIds(1);
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
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    orders: state.toppings.pastOrderIds
});

export default connect(mapStateToProps, { getToppings, getOrderIds })(CreatePizza);