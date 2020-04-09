const Sequelize = require('sequelize');
const Op = Sequelize.Op; //allows you to query using joins on sequelize
const { authGetTokenByCustomer } = require('./auth');

// resolver functions for schema fields
const resolvers = {
  Query: {
    // used for login
    async getTokenByCustomer(root, { email, password }, { Customer }) {
      return await authGetTokenByCustomer(email, password, Customer);
    },
    // used for validating current token
    // user, which is either null or {customer_id: Int} is extracted from token
    async getCustomerByToken(root, {}, { user, Customer }) {
      if (user !== null && user.customer_id) {
        try {
          return await Customer.findOne({
            where: {
              customer_id: user.customer_id
            }
          });
        } catch (err) {
          //console.log(err);
          return null;
        }
      }
      return null;
    },
  },
  Mutation: {
    async createCheeseOp(root, { cheese_type }, { Cheese }) {
      return await Cheese.create({ cheese_type });
    },
    async createCrustOp(root, { crust_type }, { Crust }) {
      return await Crust.create({ crust_type });
    },
    async createSizeOp(root, { size_type }, { Size }) {
      return await Size.create({ size_type });
    },
    async createSauceOp(root, { sauce_type }, { Sauce }) {
      return await Sauce.create({ sauce_type });
    },
    async createVeggieOp(root, { veggie_type }, { Veggie }) {
      return await Veggie.create({ veggie_type });
    },
    async createMeatOp(root, { meat_type }, { Meat }) {
      return await Meat.create({ meat_type });
    },
    async createCustomer(
      root,
      { first_name, last_name, phone, email, password, isRegistered },
      { Customer }
    ) {
      // return await Customer.create({
      //   first_name, last_name, phone, email, password, isRegistered
      // }).then(res => {return res})
      // .catch(error => console.log(error))
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
        //console.log(err);
        return null;
      }
    },
  },
};

module.exports = resolvers;
