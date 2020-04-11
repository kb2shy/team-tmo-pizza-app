const Sequelize = require('sequelize');
const Op = Sequelize.Op; //allows you to query using joins on sequelize
const { authGetTokenByCustomer } = require('../auth');

module.exports = {
  Query: {
    // used for login
    async getTokenByCustomer(root, { email, password }, { Customer }) {
      return await authGetTokenByCustomer(email, password, Customer);
    },
    // used for validating current token
    // user, which is either null or {customer_id: Int} is extracted from token
    async getCustomerByToken(root, { token }, { user, Customer }) {
      if (user !== null && user.customer_id) {
        try {
          return await Customer.findOne({
            where: {
              customer_id: user.customer_id
            }
          });
        } catch (err) {
          console.log(err);
          return null;
        }
      }
      return null;
    },
    //gets all basic pizza data (size, crust, sauce, cheese)
    async getAllPizzas(root, args, { Pizza, Size, Crust, Sauce, Cheese, MeatSelect, VeggieSelect }) {
      return await Pizza.findAll({
        include: [Size, Crust, Sauce, Cheese, MeatSelect, VeggieSelect]
      }).catch(err => console.log(err))

    },
    //performs three table joins to get all pizza ids for a specific customer
    //returns Pizza array that shows crust, size, and sauce
    //additional joins needed to find specific toppings
    //returns all id info
    async getAllPizzasByCustomer(root, { customer_id }, { OrderItem, Customer, Order, Pizza, Size, Crust, Sauce, Cheese}) {
      const res1 = await Order.findAll({
        attributes: ['order_id'],
        where: {
          customer_id: customer_id
        },
        include: [OrderItem, Customer]
      }).catch(err => console.log(err))

      const values = Object.values(res1).map(v => {
        return parseInt(v.order_id)
      })
      const res2 = await OrderItem.findAll({
        attributes: ['pizza_id'],
        where: {
          order_id: {
            [Op.in]: values
          }
        },
        include: [Pizza]
      })

      const items = Object.values(res2).map(i => {
        return parseInt(i.pizza_id)
      })
      return await Pizza.findAll({
        where: {
          pizza_id: {
            [Op.in]: items
          }
        }, include: [Size, Crust, Sauce, Cheese]
      })
    },
    //returns all order ids for a customer
    async getAllOrdersByCustomer(root, { customer_id }, { Order }) {
      return await Order.findAll({
        where: {
          customer_id: customer_id
        }
      }).catch(err => console.log(err))
    },
    //returns all pizza ids by order
    async getAllPizzasByOrder(rood, { order_id }, { Order, OrderItem, Pizza, Size, Crust, Sauce, Cheese}) {
      const res = await OrderItem.findAll({
        attributes: ['pizza_id'],
        where: {
          order_id: order_id
        }, include: [Order]
      })
      const ids = Object.values(res).map(id => {
        return parseInt(id.pizza_id)
      })
      return await Pizza.findAll({
        where: {
          pizza_id: {
            [Op.in]: ids
          }
        }, include: [Size, Crust, Sauce, Cheese]
      })
    },
    //gets all possible meat options
    async getMeatOptions(root, args, { Meat }) {
      return await Meat.findAll({})
    },
    //gets all possible veggie options
    async getVeggieOptions(root, args, { Veggie }) {
      return await Veggie.findAll({})
    },
    //gets all possible cheese options
    async getCheeseOptions(root, args, { Cheese }) {
      return await Cheese.findAll({})
    },
    //gets all possible crust options
    async getCrustOptions(root, args, { Crust }) {
      return await Crust.findAll({})
    },
    //gets all possible sauce options
    async getSauceOptions(root, args, { Sauce }) {
      return await Sauce.findAll({})
    },
    //gets all possible size options
    async getSizeOptions(root, args, { Size }) {
      return await Size.findAll({})
    },
    //gets all selected meat options for specific pizza
    async getSelectedMeats(root, { pizza_id }, { MeatSelect, Meat }) {
      return await MeatSelect.findAll({
        where: {
          pizza_id: pizza_id
        },
        include: [Meat]
      }).catch(err => console.log(err))
    },
    //gets all selected veggie options for specific pizza
    async getSelectedVeggies(root, { pizza_id }, { VeggieSelect, Veggie }) {
      return await VeggieSelect.findAll({
        where: {
          pizza_id: pizza_id
        },
        include: [Veggie]
      }).catch(err => console.log(err))
    },
    //gets all registered customers
    async getRegisteredUsers(root, args, { Customer }) {
      return await Customer.findAll({
        where: {
          isRegistered: true
        }
      })
    },
    //gets all customers who haven't registered
    async getGuests(root, args, { Customer }) {
      return await Customer.findAll({
        where: {
          isRegistered: null
        }
      })
    },
    async getTotalSelectedVeggie(root, { veggie_id }, { VeggieSelect}) {
      return await VeggieSelect.findAll({
        where: {
          veggie_id: veggie_id
        }
      })
    },
    async getTotalSelectedMeat(root, { meat_id }, { MeatSelect}) {
      return await MeatSelect.findAll({
        where: {
          meat_id: meat_id
        }
      })
    }
  },

}
