import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setBase, clearPizza } from '../../actions/pizza';
import { addPizza } from '../../actions/pizzas';
import { setMenu, setPopCart } from '../../actions/menu';

import SizePrompt from './SizePrompt';
import PopCart from '../Cart/PopCart';

import StyledButton from '../common/Button/StyledButton';

class SpecialtyPizzas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSizePrompt: false,
            currentPizza: null,
            data:  [
                {
                    name: 'Meats Lovers',
                    crust: {type: 'Hand Tossed Garlic', id: 1},
                    sauce: {type: 'Tomato', id: 1},
                    size: {type: null},
                    toppings: {
                        cheeses: [],
                        veggies: [],
                        meats: [{type: 'Ham', id: 1}, {type:'Beef', id: 2}, {type:'Sausage', id: 4}, {type:'Bacon', id: 6}]
                    },
                    totalPrice: 5.5,
                    id: 1
                },
                {
                    name: 'Cheese Pizza',
                    crust: {type: 'Hand Tossed Garlic', id: 2},
                    sauce: {type: 'Tomato', id: 1},
                    size: {type: null},
                    toppings: {
                        cheeses: [],
                        veggies: [],
                        meats: []
                    },
                    totalPrice: 0,
                    id: 2
                },
                {
                    name: 'Veggie Pizza',
                    crust: {type: 'Hand Tossed Garlic', id: 2},
                    sauce: {type: 'Tomato', id: 1},
                    size: {type: null},
                    toppings: {
                        cheeses: [],
                        veggies: [{type: 'Mushrooms', id: 4}, {type:'Spinach', id: 5}, {type:'Onions', id: 2}, {type:'Black Olives', id: 3}],
                        meats: []
                    },
                    totalPrice: 4,
                    id: 2
                },
                {
                    name: 'Hawaiian',
                    crust: {type: 'Hand Tossed Garlic', id: 2},
                    sauce: {type: 'Tomato', id: 1},
                    size: {type: null},
                    toppings: {
                        cheeses: [],
                        veggies: [{type: 'Pineapple', id: 7}],
                        meats: [{type: 'Ham', id: 1}]
                    },
                    totalPrice: 4.5,
                    id: 2
                },
                {
                    name: 'Margarita',
                    crust: {type: 'Hand Tossed Garlic', id: 2},
                    sauce: {type: 'Tomato', id: 1},
                    size: {type: null},
                    toppings: {
                        cheeses: [{type: 'Mozzarella', id: 1}],
                        veggies: [{type: 'Spinach', id: 5}],
                        meats: []
                    },
                    totalPrice: 3.5,
                    id: 2
                }
            ]
        }
    }

    componentDidMount = () => {
        this.props.setPopCart(false);
    }

    handleSubmit = (pizza, size) => {
        this.props.addPizza({...pizza, size, totalPrice: pizza.totalPrice + size.price, qty: 1});
        this.props.clearPizza();
        this.setState({showSizePrompt: false});
        this.props.setMenu(4, this.props.step);
    }

    getSize = (pizza) => {
        this.setState({showSizePrompt: true, currentPizza: pizza});
    }

    handleChange = (name, item) => {
        this.props.setBase(name.toLowerCase(), item);
    }

    handleCustomOrder = (e) => {
        this.props.clearPizza();
        this.props.setMenu(3, this.props.step);
    };

    render() {
        console.log(this.props.step)
        const style = {
            margin: 'auto auto',
            padding: '100px',
            width: '200px',
            height: '100px'

        }
        if (this.state.showSizePrompt) {
            return (
                <div style={{textAlign: 'center'}}>
                    {this.props.popCart ? <PopCart/> : null}
                    <SizePrompt style={style} handleSubmit={this.handleSubmit} pizza={this.state.currentPizza}/>
                </div>
            )
        } else {
            return (
                <div>   
                    {this.props.popCart ? <PopCart/> : null}
                    <div style={{textAlign: 'center'}}>
                        <StyledButton
                            type="button"
                            onClick={(e) => this.handleCustomOrder()}
                            text="Make a Custom Pizza"
                            variant="basicButton"
                        />
                    </div>
                    <CardGroup>
                        {this.state.data.map(item => {
                            return (
                                <Card key={item.name} style={{width: '300px'}}>
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>Crust: {item.crust.type}</Card.Text>
                                        <Card.Text>Sauce: {item.sauce.type}</Card.Text>
                                        <Card.Text>{item.toppings.cheeses.map((cheese, i) => i === 0 ? `Cheese(s): ${cheese.type}` : `, ${cheese.type}`)}</Card.Text>
                                        <Card.Text>{item.toppings.veggies.map((veggie, i) => i === 0 ? `Veggie(s): ${veggie.type}` : `, ${veggie.type}`)}</Card.Text>
                                        <Card.Text>{item.toppings.meats.map((meat, i) => i === 0 ? `Meat(s): ${meat.type}` : `, ${meat.type}`)}</Card.Text>
                                        <Card.Text>Price of Toppings: ${item.totalPrice.toFixed(2)}</Card.Text>
                                        
                                        <StyledButton
                                            type="button"
                                            onClick={(e) => this.getSize(item)}
                                            text="Add to Cart"
                                            variant="orderChoiceButton"
                                        />
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </CardGroup>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    size : state.pizza.size,
    sizes: state.database.sizes,
    popCart: state.menu.popCart,
    step: state.menu.step
});
  
export default connect(mapStateToProps, {
    setMenu,
    addPizza,
    clearPizza,
    setBase,
    setPopCart
})(SpecialtyPizzas);