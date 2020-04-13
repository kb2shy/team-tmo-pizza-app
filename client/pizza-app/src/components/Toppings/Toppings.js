import React from 'react';
import { connect } from "react-redux";
import ToppingCard from '../ToppingCard/ToppingCard';

class Toppings extends React.Component {

    //Needs type (i.e. 'Meats') from parent components
    //Renders specific Topping section with cards for each topping
    render() {
        //console.log(this.props.meats)
        return (
            <div>
                {/* Map correct array (veggies or meats) */}
                {this.props[this.props.type.toLowerCase()].map((item, i) => {
                    const itemLabel = this.props.type === 'Meats' ? item.meats.meat_type : item.veggies.veggie_type;

                    return <ToppingCard key={`${this.props.type}${i}`} label={itemLabel} type={this.props.type.toLowerCase()} count={item.count}/>
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    meats: state.database.meats,
    veggies: state.database.veggies
  });
  
export default connect(mapStateToProps)(Toppings);