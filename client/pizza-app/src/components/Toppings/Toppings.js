import React from 'react';
import { connect } from "react-redux";
import ToppingCard from '../ToppingCard/ToppingCard';

import { getAllToppings } from '../../actions/database';

class Toppings extends React.Component {

    // componentDidUpdate = (meats, veggies) => {
    //     this.props.getAllToppings();
    // }

    //Needs type (i.e. 'Meats') from parent components
    //Renders specific Topping section with cards for each topping
    render() {
        return (
            <div>
                {/* Map correct array (cheeses, veggies or meats) */}
                {this.props[this.props.type.toLowerCase()].map((item, i) => {
                    return (
                        <ToppingCard 
                            key={`${this.props.type}${i}`} 
                            type={this.props.type.toLowerCase()} 
                            item={item}
                        />
                    )
                })}
                <hr/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    meats: state.database.meats,
    veggies: state.database.veggies,
    cheeses: state.database.cheeses
  });
  
export default connect(mapStateToProps, { getAllToppings })(Toppings);