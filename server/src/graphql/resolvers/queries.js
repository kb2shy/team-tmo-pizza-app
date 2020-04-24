const { AuthenticationError } = require('apollo-server');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; //allows you to query using joins on sequelize
const getTokenByCustomer = require('./queries/getTokenByCustomer');
const getAllOrderInfoByOrderId = require('./queries/getAllOrderInfoByOrderId')
const getToppingsByPizzaId = require('./queries/getToppingsByPizzaId.js')

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
      { Order, Pizza, Size, Crust, Sauce}
    ) {
      
      return await Pizza.findAll({
        include: [Size, Crust, Sauce,
          {
            model: Order,
            where: {
              order_id: order_id
            }
          }]
      })
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
    getAllOrderInfoByOrderId,
    getToppingsByPizzaId
  },
};
