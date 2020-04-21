import React, { useState } from 'react';
import { connect } from 'react-redux';
import PizzaCard from './PizzaCard';
import StyledButton from '../../common/Button/StyledButton';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { setPizza, setPizzaQty, clearPizza } from '../../../actions/pizza';
import {
  removePizza,
  addPizza,
  updatePizza,
  updatePizzaQty,
} from '../../../actions/pizzas';
import { previousMenu } from '../../../actions/menu';

/**
 * OrderSummary component
 * @param {*}  pizzas - reducer with info for all of the user's added to cart pizzas
 * 1. iterates through all pizzas associated with this user
 * 2. renders a card displaying each pizza's info via PizzaCard subcomponent
 */
const OrderSummary = ({
  pizzas,
  setPizza,
  setPizzaQty,
  clearPizza,
  removePizza,
  addPizza,
  updatePizza,
  updatePizzaQty,
  previousMenu,
}) => {
  const footerStyle = { display: 'flex', flexDirection: 'row' };

  const [data, setData] = useState({
    qty: '',
  });

  const editPizza = (index) => {
    const pizza = pizzas[index];
    console.log('gonna edit pizza: ', pizza);
    setPizza(pizza);
    removePizza(index);
    previousMenu();
  };

  //  let isValid = data.qty > 0 ? true : false

  
  const handleChange = (e, index, pz) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(`PizzaCard.js: handleChange: [name]:value = ${name}:${value}`)
    setData((d) => ({ ...d, [name]: value }));
    console.log('PizzaCard.js: data.qty: ', data.qty);

    console.log('pizza: ', pz);
    console.log('index: ', index);
    // if (isNaN(data.qty)) console.log('data.qty is NaN');
    // const newqty = parseInt(data.qty);
    // if (isNaN(newqty)){
    //   console.log('newqty is NaN');
    // } 
    // console.log('qty: ', newqty);
    updatePizzaQty(index, value)
    // updatePizzaQty(index, data.qty)
//    updatePizzaQty(index, newqty);
  };

  return (
    <div>
      {pizzas.map((pz, index) => {
        return (
          <div key={index}>
            <Card>
              <Card.Body>
                <PizzaCard
                  size={pz.size}
                  crust={pz.crust}
                  sauce={pz.sauce}
                  cheese={pz.cheese}
                  toppings={pz.toppings}
                  qty={pz.qty}
                  price={pz.totalPrice}
                  index={index}
                />
                {/* <hr /> */}
                {/* <Button onClick={() => editPizza(props.index)}>Edit Pizza</Button> */}
                <div style={footerStyle}>
                  <Form>
                    <Form.Group as={Row} controlId="horizontalQty">
                      <Form.Label column>Qty:</Form.Label>
                      <Col>
                        {/* <p>{props.qty}</p> */}
                        <Form.Control
                          name="qty"
                          type="text"
                          placeholder={pz.qty}
                          value={data.qty}
                          onChange={(e) => handleChange(e, index, pz)}
                        />{' '}
                        {/* <Form.Control.Feedback type="invalid">
                  {errors.qty}
                </Form.Control.Feedback> */}{' '}
                      </Col>
                    </Form.Group>
                  </Form>
                  {/* <p>Qty: </p>
                  <StyledButton text="+" type="button" variant="basicButton" />
                  <p>{props.qty}</p>
                  <StyledButton text="-" type="button" variant="basicButton" /> */}

                  <StyledButton
                    text="Edit Pizza"
                    type="Button"
                    variant="basicButton"
                    onClick={() => editPizza(index)}
                  />

                  <StyledButton
                    text="Remove Pizza*"
                    type="Button"
                    variant="basicButton"
                    //onClick={() => removePizza(props.index)} // to be implemented or found
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pizzas: state.pizzas,
  };
};

export default connect(mapStateToProps, {
  setPizza,
  removePizza,
  addPizza,
  clearPizza,
  previousMenu,
  setPizzaQty,
  updatePizzaQty,
  // updatePizza
})(OrderSummary);
