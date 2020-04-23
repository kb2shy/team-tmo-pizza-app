const updateOrCreateCustomer = require('./updateOrCreateCustomer');
const createOrder = require('../helpers/createOrder');

async function createGuestOrder(root, { guest, ...attrs }, context) {
  // update or create guest customer
  let customer = null;
  try {
    customer = await updateOrCreateCustomer(
      root,
      { ...guest, registered: false },
      context
    );
  } catch (err) {
    console.log('Error with updateOrCreateCustomer:', err);
    return null; // @todo return error object
  }

  // Usually customer can be null if given email references a registered customer
  if (!customer) {
    return null; // @todo return an error object instead
  }

  try {
    return await createOrder(
      { customer, ...attrs },
      context
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = createGuestOrder;
