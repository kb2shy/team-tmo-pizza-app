const { AuthenticationError } = require('apollo-server');
const createOrder = require('../helpers/createOrder');

async function createMemberOrder(root, attrs, { user, Customer, ...context }) {
  // get member from token
  if (user === null || user.customer_id === null) {
    throw new AuthenticationError('Invalid credentials');
  }

  // query customer from the id
  const customer = await Customer.findByPk(user.customer_id);
  if (!customer) {
    throw new AuthenticationError(
      'Invalid credentials; could not reference Customer by token.'
    );
  }

  // create order
  return await createOrder({ customer, ...attrs }, context);
}

module.exports = createMemberOrder;
