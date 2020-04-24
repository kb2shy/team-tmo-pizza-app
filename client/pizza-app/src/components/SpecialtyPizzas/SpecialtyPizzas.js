import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setBase, setPizza, clearPizza } from '../../actions/pizza';
import { addPizza } from '../../actions/pizzas';
import { setMenu, setPopCart } from '../../actions/menu';
import { GET_ALL_SPECIALTY_PIZZA_INFO } from '../../config/gqlDefines'
import './SpecialtyPizzas.css'
import PopCart from '../Cart/PopCart';

import StyledButton from '../common/Button/StyledButton';

class SpecialtyPizzas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSizeQuantityPrompt: false,
      currentPizza: null,
     // data: null
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

  componentDidMount = async () => {
    this.props.setPopCart(false);
    const { client } = this.props;
    //const results = await client.query({ query: GET_ALL_SPECIALTY_PIZZA_INFO})
    // this.setState({
    //   data: results
    // })
    // console.log(results)
  };

  //adds pizza to pizzas store
  handleSubmit = (pizza) => {
    const currentPizza = { ...props.pizza };
    const toppings = { cheeses: [...pizza.cheeses], veggies: [...pizza.veggies], meats: [...pizza.meats]};
    console.log(toppings)
    props.setPizza({
      ...currentPizza,
      name: pizza.pizza_name,
      toppings: toppings,
      crust: pizza.crust,
      sauce: pizza.sauce,
      basePrice: pizza.price.toFixed(2),
      totalPrice: pizza.price.toFixed(2),
      quantity: 1,
    });
    this.props.setMenu(8);
  };

  //Change to custom order
  // const handleCustomOrder = (e) => {
  //   props.clearPizza();
  //   props.setMenu(3);
  // };

  //Renders cards of all possible specialty pizza, when one is selected, the sizing prompt is render
  render() {

    return (
      <div>
        {props.popCart ? <PopCart /> : null}
  
        <CardGroup>
          {data.getAllSpecialtyPizzaInfo.map((item, id) => {
            console.log(item.pizza_name)
            return (
              <Card key={item.pizza_name} className='specialtyPizzaCard'>
                <Card.Body className="specialtyPizzaCardBody">
                  <Card.Title>{item.pizza_name}</Card.Title>
                  <Card.Text>Crust: {item.crust.crust_type}</Card.Text>
                  <Card.Text>Sauce: {item.sauce.sauce_type}</Card.Text>
                  <Card.Text key={`${item.cheeses.cheese}_cheeses${id}`}>
                    Cheese(s):
                    {item.cheeses.map((cheese, i) => {
                    console.log(cheese)
                    return i === 0 ? ` ${cheese.cheese_type}` : `, ${cheese.cheeese_type}`
                  }
                  )}
                  </Card.Text>
                  <Card.Text key={`${item.pizza_name}_veggies${id}`}>
                    Veggie(s):
                    {item.veggies.map((veggie, i) =>
                    i === 0 ? ` ${veggie.veggie_type}` : `, ${veggie.veggie_type}`
                  )}
                  </Card.Text>
                  <Card.Text key={`${item.pizza_name}_meats${id}`}>
                    Meat(s):
                    {item.meats.map((meat, i) =>
  
                    i === 0 ? ` ${meat.meat_type}` : `, ${meat.meat_type}`
                  )}
                  </Card.Text>
                  <Card.Text>
                    Price of Toppings: ${item.price.toFixed(2)}
                  </Card.Text>
  
  
                </Card.Body>
                <div className="addToCartButton">
                  <StyledButton
                    type="button"
                    onClick={(e) => handleSubmit(item)}
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
