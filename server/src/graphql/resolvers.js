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
    async getAllPizzas(root, args, { Pizza, Size, Crust, Sauce }) {
      return await Pizza.findAll({
        include: [Size, Crust, Sauce]
      }).catch(err => console.log(err))
    },
    //performs three table joins to get all pizza ids for a specific customer
    async getPizzasByCustomer(root, { customer_id }, { OrderItem, Customer, Order, Pizza }) {
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
        }
      })
    },
    async getOrdersByCustomer(root, { customer_id }, { OrderItem, Order }) {
      return await Order.findAll({
        where: {
          customer_id: customer_id
        },
        include: [OrderItem, Customer]
      }).catch(err => console.log(err))
    },
    async getMeatOptions(root, args, { Meat }) {
      return await Meat.findAll({})
    },
    async getVeggieOptions(root, args, { Veggie }) {
      return await Veggie.findAll({})
    },
    async getCheeseOptions(root, args, { Cheese }) {
      return await Cheese.findAll({})
    },
    async getCrustOptions(root, args, { Crust }) {
      return await Crust.findAll({})
    },
    async getSauceOptions(root, args, { Sauce }) {
      return await Sauce.findAll({})
    },
    async getSizeOptions(root, args, { Size }) {
      return await Size.findAll({})
    },
    async getSelectedMeats(root, { pizza_id }, { MeatSelect, Meat }) {
      return await MeatSelect.findAll({
        where: {
          pizza_id: pizza_id
        },
        include: [Meat]
      }).catch(err => console.log(err))
    },
    async getSelectedVeggies(root, { pizza_id }, { VeggieSelect, Veggie }) {
      return await VeggieSelect.findAll({
        where: {
          pizza_id: pizza_id
        },
        include: [Veggie]
      }).catch(err => console.log(err))
    },
    async getSelectedCheeses(root, { pizza_id }, { CheeseSelect, Cheese }) {
      return await CheeseSelect.findAll({
        where: {
          pizza_id: pizza_id
        },
        include: [Cheese]
      }).catch(err => console.log(err))
    },
    async getRegisteredUsers(root, args, { Customer }) {
      return await Customer.findAll({
        where: {
          isRegistered: true
        }
      })
    },
    async getGuests(root, args, { Customer }) {
      return await Customer.findAll({
        where: {
          isRegistered: null
        }
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

    // In addition to creating customers, this is also used for updating an
    // already-created and non-registered customer.
    // Updating already-created customers is needed to allow a guest, whom ordered a pizza,
    // to reuse their email for registering later or making an additional order.
    // Cases to consider:
    // @todo
    // 1. What happens if guest orders with email of a registered customer?
    //    Should we link the registered customer to the unauthenticated customer? No! Yes for easy fix;
    //    It is better to encourage the user to sign in by outing a message:
    //    "Looks like you already have an account. Please sign to order a pizza"
    //    Please sign in to order a pizza
    async CreateCustomer(
      root,
      { first_name, last_name, phone, email, password, isRegistered },
      { Customer }
    ) {
      // override registered if password is falsy (null, undefined, '')
      let isRegistered2 = isRegistered && password ? true : false;

      // query a customer by the given email
      let existingCustomer = null;
      try {
        existingCustomer = Customer.findOne({ where: { email } });
      } catch (err) {
        console.log(err);
        return null;
      }

      // In case an attempt is made to register/order pizza as guest
      // (but passing an email of an existing account)
      // Encourage the order
      if (existingCustomer && existingCustomer.isRegistered) {
        // @todo it is better to return an error (and not just for this case)
        return null;
      }

      try {
        // generate hash from password
        let passHash = null;
        if (password) {
          passHash = await bcrypt.hash(password, 10);
        }

        return await Customer.create({
          first_name,
          last_name,
          phone,
          email,
          password: passHash,
          isRegistered: isRegistered2,
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
