const createOrder = require('./createOrder');

async function createMemberOrder(root, attrs, { user, Customer, ...context }) {
  // get member from token
  if (user === null || user.customer_id === null) {
    return null; // @todo return an error object instead
  }

  // query customer from the id
  const customer = await Customer.findByPk(user.customer_id);
  if (!customer) {
    console.log('Could not reference Customer by token.');
    return null;
  }

  // create order
  const orderRecord = await createOrder(root, { customer, ...attrs }, context);

  return orderRecord;
}

module.exports = createMemberOrder;
