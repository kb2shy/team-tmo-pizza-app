const Sequelize = require('sequelize');
const Op = Sequelize.Op; //allows you to query using joins on sequelize
const { authGetTokenByCustomer } = require('./auth');

// resolver functions for schema fields
const resolvers = {
  Query: {
    // used for login
    async getTokenByCustomer(root, { email, password }, { Customer }) {
      console.log('getTokenByCustomer')
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
    //gets all 
    async getAllPizzas(root, args, { Pizza, Size, Crust, Sauce, MeatSelect, CheeseSelect, VeggieSelect}) {
      return await Pizza.findAll({
        include: [Size, Crust, Sauce, MeatSelect, CheeseSelect, VeggieSelect]
      }).catch(err => console.log(err))

    },
    //performs three table joins to get all pizza ids for a specific customer
    //returns Pizza array that shows crust, size, and sauce
    //additional joins needed to find specific toppings
    async getPizzasByCustomer(root, { customer_id }, { OrderItem, Customer, Order, Pizza, MeatSelect, VeggieSelect, CheeseSelect, Meat, Veggie, Cheese }) {
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
      const res3 = await Pizza.findAll({
        where: {
          pizza_id: {
            [Op.in]: items
          }
        }, include: [MeatSelect, VeggieSelect, CheeseSelect]
      })
      //work in progress
      // const pizzas = Object.values(res3).map(e => {
      //   return parseIn(e)
      // })
      // return await 
    },
    //returns all order ids for a customer
    async getOrdersByCustomer(root, { customer_id }, { OrderItem, Order }) {
      return await Order.findAll({
        where: {
          customer_id: customer_id
        },
        include: [OrderItem, Customer]
      }).catch(err => console.log(err))
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
    //gets all selected cheese options for specific pizza
    async getSelectedCheeses(root, { pizza_id }, { CheeseSelect, Cheese }) {
      return await CheeseSelect.findAll({
        where: {
          pizza_id: pizza_id
        },
        include: [Cheese]
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
    async getTotalSelectedVeggie(root, {veggie_id}, { VeggieSelect, Veggie}){
      return await VeggieSelect.findAll({
        where:{
          veggie_id: veggie_id
        }, include: [Veggie]
      })
    },
    async getTotalSelectedMeat(root, {meat_id}, { MeatSelect, Meat}){
      return await MeatSelect.findAll({
        where:{
          meat_id: meat_id
        }, include: [Meat]
      })
    },
    async getTotalSelectedCheese(root, {cheese_id}, { CheeseSelect, Cheese}){
      return await CheeseSelect.findAll({
        where:{
          cheese_id: cheese_id
        }, include: [Cheese]
      })
    }
  },


  Mutation: {
    async createCheeseOp(root, { cheese_type, cheese_price }, { Cheese }) {
      return await Cheese.create({ cheese_type, cheese_price })
    },
    async createCrustOp(root, { crust_type }, { Crust }) {
      return await Crust.create({ crust_type })
    },
    async createSizeOp(root, { size_type, size_price }, { Size }) {
      return await Size.create({ size_type, size_price })
    },
    async createSauceOp(root, { sauce_type }, { Sauce }) {
      return await Sauce.create({ sauce_type })
    },
    async createVeggieOp(root, { veggie_type, veggie_price }, { Veggie }) {
      return await Veggie.create({ veggie_type, veggie_price })
    },
    async createMeatOp(root, { meat_type, meat_price }, { Meat }) {
      return await Meat.create({ meat_type, meat_price })
    },
    async createCustomer(
      root,
      { first_name, last_name, phone, email, password, isRegistered },
      { Customer }
    ) {
      try {
        return await Customer.create({
          first_name,
          last_name,
          phone,
          email,
          password,
          isRegistered,
        });
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    async createPizza(root, { size_id, crust_id, sauce_id }, { Pizza }) {
      return await Pizza.create({
        size_id, crust_id, sauce_id
      }).catch(error => console.log(error))
    },
    async setVeggieSelection(root, { veggie_id, pizza_id }, { VeggieSelect }) {
      return await VeggieSelect.create({ veggie_id, pizza_id })
    },
    async setCheeseSelection(root, { cheese_id, pizza_id }, { CheeseSelect }) {
      return await CheeseSelect.create({ cheese_id, pizza_id })
    },
    async setMeatSelection(root, { meat_id, pizza_id }, { MeatSelect }) {
      return await MeatSelect.create({ meat_id, pizza_id })
    },
    async setOrderItem(root, { order_id, pizza_id }, { OrderItem }) {
      return await OrderItem.create({ order_id, pizza_id })
    },
    async createOrder(root, { customer_id }, { Order }) {
      return await Order.create({ customer_id })
    }

  }
};

module.exports = resolvers;
