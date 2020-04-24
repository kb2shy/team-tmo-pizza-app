const updateOrCreateCustomer = require('./updateOrCreateCustomer');
const createOrder = require('../helpers/createOrder');

async function createGuestOrder(root, { guest, ...attrs }, context) {
  // update or create guest customer
  const customer = await updateOrCreateCustomer(
    root,
    { ...guest, registered: false },
    context
  );

  return await createOrder({ customer, ...attrs }, context);
}

module.exports = createGuestOrder;
