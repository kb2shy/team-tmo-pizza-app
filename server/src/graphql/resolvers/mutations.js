const updateOrCreateCustomer = require('./mutations/updateOrCreateCustomer');
const createGuestOrder = require('./mutations/createGuestOrder');
const createMemberOrder = require('./mutations/createMemberOrder');
const createAndFillPizzaFunc = require('./mutations/createAndFillPizza');

const errHandler = (err) => {
  console.error('Error: ', err);
};

module.exports = {
  Mutation: {
    async createCheeseOp(root, { cheese_type, cheese_price }, { Cheese }) {
      return await Cheese.create({ cheese_type, cheese_price }).catch(
        errHandler
      );
    },
    async createCrustOp(root, { crust_type }, { Crust }) {
      return await Crust.create({ crust_type }).catch(errHandler);
    },
    async createSizeOp(root, { size_type, size_price }, { Size }) {
      return await Size.create({ size_type, size_price }).catch(errHandler);
    },
    async createSauceOp(root, { sauce_type }, { Sauce }) {
      return await Sauce.create({ sauce_type }).catch(errHandler);
    },
    async createVeggieOp(root, { veggie_type, veggie_price }, { Veggie }) {
      return await Veggie.create({ veggie_type, veggie_price }).catch(
        errHandler
      );
    },
    async createMeatOp(root, { meat_type, meat_price }, { Meat }) {
      return await Meat.create({ meat_type, meat_price }).catch(errHandler);
    },
    updateOrCreateCustomer, // error handling done in file
    createGuestOrder, // error handling done in file
    createMemberOrder, // error handling done in file
    async createAndFillPizza(root, attrs, context) {
      try {
        return await createAndFillPizzaFunc(root, attrs, context); // error handling done below
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    async createPizza(
      root,
      { size_id, crust_id, sauce_id, cheese_id },
      { Pizza }
    ) {
      return await Pizza.create({
        size_id,
        crust_id,
        sauce_id,
        cheese_id,
      }).catch(errHandler);
    },
    async setVeggieSelection(root, { veggie_id, pizza_id }, { VeggieSelect }) {
      return await VeggieSelect.create({ veggie_id, pizza_id }).catch(
        errHandler
      );
    },
    async setMeatSelection(root, { meat_id, pizza_id }, { MeatSelect }) {
      return await MeatSelect.create({ meat_id, pizza_id }).catch(errHandler);
    },
    async setOrderItem(root, { order_id, pizza_id }, { OrderItem }) {
      return await OrderItem.create({ order_id, pizza_id }).catch(errHandler);
    },
    async createOrder(root, { customer_id }, { Order }) {
      return await Order.create({ customer_id }).catch(errHandler);
    },
  },
};
