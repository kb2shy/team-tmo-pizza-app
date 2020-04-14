const createAndFillPizza = require('./createAndFillPizza');

async function createMemberOrder(
  root,
  { pizzas },
  { user, Customer, Order, OrderItem, ...rest }
) {
  // get user from token
  if (user === null || user.customer_id === null) {
    return null; // @todo return an error object instead
  }

  // create pizzas
  const pizza_ids = [];
  for (let pizza of pizzas) {
    try {
      const pizzaRecord = await createAndFillPizza(root, { pizza }, rest);
      pizza_ids.push(pizzaRecord.pizza_id);
    } catch (err) {
      console.log('An error ocurred with creating a pizza:', err);
      return null; // @todo delete all other created pizzas
    }
  }

  // create order
  let order = null;
  try {
    order = await Order.create({ customer_id: user.customer_id });
  } catch (err) {
    console.log('Error with Order.create:', err);
    return null; // @todo return error object
  }
  // order is never null here

  // tie pizzas to the order
  for (let pizza_id of pizza_ids) {
    try {
      await OrderItem.create({ order_id: order.order_id, pizza_id });
    } catch (err) {
      console.log('Error with OrderItem.create:', err);
      return null;
    }
  }

  // return the order
  return order;
}

module.exports = createMemberOrder;