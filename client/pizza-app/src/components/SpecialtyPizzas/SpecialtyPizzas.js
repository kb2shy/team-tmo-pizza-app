import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setBase, setPizza, clearPizza } from '../../actions/pizza';
import { addPizza } from '../../actions/pizzas';
import { setMenu, setPopCart } from '../../actions/menu';

import './SpecialtyPizzas.css'
import PopCart from '../Cart/PopCart';

import StyledButton from '../common/Button/StyledButton';

class SpecialtyPizzas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSizeQuantityPrompt: false,
      currentPizza: null,
      data: [
        //sample data
        {
          name: 'Meats Lovers',
          crust: { type: 'Hand Tossed Garlic', id: 1 },
          sauce: { type: 'Tomato', id: 1 },
          size: { type: null },
          toppings: {
            cheeses: [],
            veggies: [],
            meats: [
              { type: 'Ham', id: 1, price: 2.5 },
              { type: 'Beef', id: 2, price: 2 },
              { type: 'Sausage', id: 4, price: 2.25 },
              { type: 'Bacon', id: 6, price: 1.75 },
            ],
          },
          basePrice: 8.5,
          id: 1,
        },
        {
          name: 'Cheese Pizza',
          crust: { type: 'Hand Tossed Garlic', id: 2 },
          sauce: { type: 'Tomato', id: 1 },
          size: { type: null },
          toppings: {
            cheeses: [],
            veggies: [],
            meats: [],
          },
          basePrice: 0,
          id: 2,
        },
        {
          name: 'Veggie Pizza',
          crust: { type: 'Hand Tossed Garlic', id: 2 },
          sauce: { type: 'Tomato', id: 1 },
          size: { type: null },
          toppings: {
            cheeses: [],
            veggies: [
              { type: 'Mushrooms', id: 4, price: 1 },
              { type: 'Spinach', id: 5, price: 1.25 },
              { type: 'Onions', id: 2, price: 0.75 },
              { type: 'Black Olives', id: 3, price: 0.75 },
            ],
            meats: [],
          },
          basePrice: 3.75,
          id: 2,
        },
        {
          name: 'Hawaiian',
          crust: { type: 'Hand Tossed Garlic', id: 2 },
          sauce: { type: 'Tomato', id: 1 },
          size: { type: null },
          toppings: {
            cheeses: [],
            veggies: [{ type: 'Pineapple', id: 7, price: 1 }],
            meats: [{ type: 'Ham', id: 1, price: 2.5 }],
          },
          basePrice: 3.5,
          id: 2,
        },
        {
          name: 'Margarita',
          crust: { type: 'Hand Tossed Garlic', id: 2 },
          sauce: { type: 'Tomato', id: 1 },
          size: { type: null },
          toppings: {
            cheeses: [{ type: 'Mozzarella', id: 1, price: 2 }],
            veggies: [{ type: 'Spinach', id: 5, price: 1.25 }],
            meats: [],
          },
          basePrice: 3.25,
          id: 2,
        },
      ],
    };
  }

  componentDidMount = () => {
    this.props.setPopCart(false);
  };

  //adds pizza to pizzas store
  handleSubmit = (pizza) => {
    const currentPizza = { ...this.props.pizza };
    this.props.setPizza({
      ...currentPizza,
      name: pizza.name,
      toppings: pizza.toppings,
      crust: pizza.crust,
      sauce: pizza.sauce,
      basePrice: pizza.basePrice.toFixed(2),
      totalPrice: pizza.basePrice.toFixed(2),
      quantity: 1,
    });
    this.props.setMenu(8);
  };

  //Change to custom order
  handleCustomOrder = (e) => {
    this.props.clearPizza();
    this.props.setMenu(3);
  };

  //Renders cards of all possible specialty pizza, when one is selected, the sizing prompt is render
  render() {
    return (
      <div>
        {this.props.popCart ? <PopCart /> : null}

        <CardGroup>
          {this.state.data.map((item) => {
            return (
              <Card key={item.name} className='specialtyPizzaCard'>
                <Card.Body className="specialtyPizzaCardBody">
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Crust: {item.crust.type}</Card.Text>
                  <Card.Text>Sauce: {item.sauce.type}</Card.Text>
                  <Card.Text>
                    {item.toppings.cheeses.map((cheese, i) =>
                      i === 0 ? `Cheese(s): ${cheese.type}` : `, ${cheese.type}`
                    )}
                  </Card.Text>
                  <Card.Text>
                    {item.toppings.veggies.map((veggie, i) =>
                      i === 0 ? `Veggie(s): ${veggie.type}` : `, ${veggie.type}`
                    )}
                  </Card.Text>
                  <Card.Text>
                    {item.toppings.meats.map((meat, i) =>
                      i === 0 ? `Meat(s): ${meat.type}` : `, ${meat.type}`
                    )}
                  </Card.Text>
                  <Card.Text>
                    Price of Toppings: ${item.basePrice.toFixed(2)}
                  </Card.Text>
                    
            
                    </Card.Body>
                    <div className="addToCartButton">      <StyledButton
                    type="button"
                    onClick={(e) => this.handleSubmit(item)}
                    text="Add to Cart"
                    variant="orderChoiceButton"
                  />
                        </div>
              </Card>
            );
          })}
        </CardGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  size: state.pizza.size,
  sizes: state.database.sizes,
  popCart: state.menu.popCart,
  pizza: state.pizza
});

export default connect(mapStateToProps, {
  setMenu,
  addPizza,
  setPizza,
  clearPizza,
  setPopCart,
  setBase,
})(SpecialtyPizzas);
