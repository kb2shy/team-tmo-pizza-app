import React from 'react';
import Toppings from '../Toppings/Toppings';

class CreatePizza extends React.Component {

    
    //Renders topping sections
    render() {
        return (
            <div>
                <Toppings type={'Meats'}/>
                <Toppings type={'Veggies'}/>
            </div>
        )
    }
}

export default CreatePizza;