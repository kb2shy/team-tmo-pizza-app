const updateOrCreateCustomer = require('./updateOrCreateCustomer');

async function createGuestOrder(
  root,
  { first_name, last_name, phone, email, pizzas },
  { Customer }
) {
  // update or create guest customer
  let customer = null;
  try {
    customer = await updateOrCreateCustomer(
      root,
      { first_name, last_name, phone, email, isRegistered: false },
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

  // create order
  const order = null;
  try {
    order = await Order.create({ customer_id: customer.customer_id });
  } catch (err) {
    console.log('Error with Order.create:', err);
    return null; // @todo return error object
  }
  // order is never null here

  // create pizzas
  pizzas
}

module.exports = createGuestOrder;
