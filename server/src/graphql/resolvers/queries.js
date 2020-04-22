const { AuthenticationError } = require('apollo-server');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; //allows you to query using joins on sequelize
const getTokenByCustomer = require('./queries/getTokenByCustomer');
const getAllOrderInfoByOrderId = require('./queries/getAllOrderInfoByOrderId')
const getToppingsCountByCustomerId = require('./queries/getToppingsCountByCustomerId.js')

const errHandler = (err) => {
  console.error('Error: ', err);
};

module.exports = {
  Query: {
    // used for login, which returns token
    getTokenByCustomer,
    // used for validating current token
    // `user`, either null or {customer_id: Int}, is extracted from token by
    // the auth context.
    async getCustomerByToken(root, _, { user, Customer }) {
      if (user !== null && user.customer_id) {
        try {
          return await Customer.findOne({
            where: {
              customer_id: user.customer_id,
            },
          });
        } catch (err) {
          throw new AuthenticationError('Invalid credentials');
        }
      } else {
        throw new AuthenticationError('Invalid credentials');
      }
    },
    //gets all basic pizza data (size, crust, sauce, cheese)
    async getAllPizzas(root, args, { Pizza, Size, Crust, Sauce }) {
      return await Pizza.findAll({
        include: [Size, Crust, Sauce],
      }).catch((err) => console.log(err));
    },
    //performs three table joins to get all pizza ids for a specific customer
    //returns Pizza array that shows crust, size, and sauce
    //additional joins needed to find specific toppings
    //returns all id info
    async getAllPizzasByCustomer(
      root,
      { customer_id },
      { OrderItem, Customer, Order, Pizza, Size, Crust, Sauce }
    ) {
      const res1 = await Order.findAll({
        attributes: ['order_id'],
        where: {
          customer_id: customer_id,
        },
        include: [OrderItem, Customer],
      }).catch((err) => console.log(err));

      const values = Object.values(res1).map((v) => {
        return parseInt(v.order_id);
      });
      const res2 = await OrderItem.findAll({
        attributes: ['pizza_id'],
        where: {
          order_id: {
            [Op.in]: values,
          },
        },
        include: [Pizza],
      }).catch(errHandler);

      const items = Object.values(res2).map((i) => {
        return parseInt(i.pizza_id);
      });
      return await Pizza.findAll({
        where: {
          pizza_id: {
            [Op.in]: items,
          },
        },
        include: [Size, Crust, Sauce],
      }).catch(errHandler);
    },
    //returns all order ids for a customer
    async getAllOrdersByCustomer(root, { customer_id }, { Order }) {
      return await Order.findAll({
        where: {
          customer_id: customer_id,
        },
      }).catch((err) => console.log(err));
    },
    //returns all pizza ids by order
    async getAllPizzasByOrder(
      root,
      { order_id },
      { Order, OrderItem, Pizza, Size, Crust, Sauce }
    ) {
      const res = await OrderItem.findAll({
        attributes: ['pizza_id'],
        where: {
          order_id: order_id,
        },
        include: [Order],
      }).catch(errHandler);
      const ids = Object.values(res).map((id) => {
        return parseInt(id.pizza_id);
      });
      return await Pizza.findAll({
        where: {
          pizza_id: {
            [Op.in]: ids,
          },
        },
        include: [Size, Crust, Sauce],
      }).catch(errHandler);
    },
    //gets all possible meat options
    async getMeatOptions(root, args, { Meat }) {
      return await Meat.findAll({}).catch(errHandler);
    },
    //gets all possible veggie options
    async getVeggieOptions(root, args, { Veggie }) {
      return await Veggie.findAll({}).catch(errHandler);
    },
    //gets all possible cheese options
    async getCheeseOptions(root, args, { Cheese }) {
      return await Cheese.findAll({}).catch(errHandler);
    },
    //gets all possible crust options
    async getCrustOptions(root, args, { Crust }) {
      return await Crust.findAll({}).catch(errHandler);
    },
    //gets all possible sauce options
    async getSauceOptions(root, args, { Sauce }) {
      return await Sauce.findAll({}).catch(errHandler);
    },
    //gets all possible size options
    async getSizeOptions(root, args, { Size }) {
      return await Size.findAll({}).catch(errHandler);
    },
    //gets all selected meat options for specific pizza
    async getSelectedMeats(root, { pizza_id }, { MeatSelect, Meat }) {
      return await MeatSelect.findAll({
        where: {
          pizza_id: pizza_id,
        },
        include: [Meat],
      }).catch((err) => console.log(err));
    },
    //gets all selected veggie options for specific pizza
    async getSelectedVeggies(root, { pizza_id }, { VeggieSelect, Veggie }) {
      return await VeggieSelect.findAll({
        where: {
          pizza_id: pizza_id,
        },
        include: [Veggie],
      }).catch((err) => console.log(err));
    },
    //gets selected cheese options for specific pizza
    async getSelectedCheeses(root, { pizza_id }, { CheeseSelect, Cheese }) {
      return await CheeseSelect.findAll({
        where: {
          pizza_id: pizza_id,
        },
        include: [Cheese],
      }).catch((err) => console.log(err));
    },
    //gets all registered customers
    async getRegisteredUsers(root, args, { Customer }) {
      return await Customer.findAll({
        where: {
          registered: true,
        },
      }).catch(errHandler);
    },
    //gets all customers who haven't registered
    async getGuests(root, args, { Customer }) {
      return await Customer.findAll({
        where: {
          registered: null,
        },
      }).catch(errHandler);
    },
    //gets all order items/pizza ids that selected a certain veggie
    async getTotalSelectedVeggie(root, { veggie_id }, { VeggieSelect }) {
      return await VeggieSelect.findAll({
        where: {
          veggie_id: veggie_id,
        },
      }).catch(errHandler);
    },
    //gets all order items/pizza ids that selected a certain meat
    async getTotalSelectedMeat(root, { meat_id }, { MeatSelect }) {
      return await MeatSelect.findAll({
        where: {
          meat_id: meat_id,
        },
      }).catch(errHandler);
    },
    //gets all order items/pizza ids that selected a certain cheese
    async getTotalSelectedCheese(root, { cheese_id }, { CheeseSelect }) {
      return await CheeseSelect.findAll({
        where: {
          cheese_id: cheese_id,
        },
      }).catch(errHandler);
    },
    getAllOrderInfoByOrderId,
    getToppingsCountByCustomerId
  },
};
