const updateOrCreateCustomer = require('./mutations/updateOrCreateCustomer');
const createGuestOrder = require('./mutations/createGuestOrder');
const createMemberOrder = require('./mutations/createMemberOrder');

const errHandler = (err) => {
  console.error('Error: ', err);
};

module.exports = {
  Mutation: {
    //creates cheese options in db
    async createCheeseOp(root, { cheese_type, cheese_price }, { Cheese }) {
      return await Cheese.create({ cheese_type, cheese_price }).catch(
        errHandler
      );
    },
    //creates crust options in db
    async createCrustOp(root, { crust_type }, { Crust }) {
      return await Crust.create({ crust_type }).catch(errHandler);
    },
    //creates size options in db
    async createSizeOp(root, { size_type, size_price }, { Size }) {
      return await Size.create({ size_type, size_price }).catch(errHandler);
    },
    //creates sauce options in db
    async createSauceOp(root, { sauce_type }, { Sauce }) {
      return await Sauce.create({ sauce_type }).catch(errHandler);
    },
    //creates veggie options in db
    async createVeggieOp(root, { veggie_type, veggie_price }, { Veggie }) {
      return await Veggie.create({ veggie_type, veggie_price }).catch(
        errHandler
      );
    },
    //creates meat options in db
    async createMeatOp(root, { meat_type, meat_price }, { Meat }) {
      return await Meat.create({ meat_type, meat_price }).catch(errHandler);
    },
    updateOrCreateCustomer, // error handling done in file
    createGuestOrder, // error handling done in file
    createMemberOrder, // error handling done in file
    //creates a pizza with basic info (size, sauce, crust)
    async createPizza(
      root,
      { size_id, crust_id, sauce_id},
      { Pizza }
    ) {
      return await Pizza.create({
        size_id,
        crust_id,
        sauce_id
      }).catch(errHandler);
    },
    //sets a veggie selection for a pizza
    async setVeggieSelection(root, { veggie_id, pizza_id }, { VeggieSelect }) {
      return await VeggieSelect.create({ veggie_id, pizza_id }).catch(
        errHandler
      );
    },
    //sets a meat selection to a pizza
    async setMeatSelection(root, { meat_id, pizza_id }, { MeatSelect }) {
      return await MeatSelect.create({ meat_id, pizza_id }).catch(errHandler);
    },
    //sets a cheese selection to a pizza
    async setCheeseSelection(root, { cheese_id, pizza_id }, { CheeseSelect }) {
      return await CheeseSelect.create({ cheese_id, pizza_id }).catch(errHandler);
    },
    //sets an order items/pizza to an order
    async setOrderItem(root, { order_id, pizza_id }, { OrderItem }) {
      return await OrderItem.create({ order_id, pizza_id }).catch(errHandler);
    },
    //creates an order for a customer
    async createOrder(root, { customer_id }, { Order }) {
      return await Order.create({ customer_id }).catch(errHandler);
    },
  },
};
