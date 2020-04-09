import React from 'react';
import Toppings from '../Toppings/Toppings';

class CreatePizza extends React.Component {

    
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

export default CreatePizza;