const updateOrCreateCustomer = require('./updateOrCreateCustomer');
const createAndFillPizza = require('./createAndFillPizza');

async function createGuestOrder(
  root,
  { guest, pizzas },
  { Customer, Order, OrderItem, ...rest }
) {
  // update or create guest customer
  let customer = null;
  try {
    customer = await updateOrCreateCustomer(
      root,
      { ...guest, isRegistered: false },
      { Customer }
    );
  } catch (err) {
    console.log('Error with updateOrCreateCustomer:', err);
    return null; // @todo return error object
  }

  // Usually customer can be null if given email references a registered customer
  if (!customer) {
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
    order = await Order.create({ customer_id: customer.customer_id });
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

module.exports = createGuestOrder;
