const Sequelize = require('sequelize')
const Op = Sequelize.Op //allows you to query using joins on sequelize 

// resolver functions for schema fields
const resolvers = {
  Query: {

  },
  Mutation: {
    async createCheese(root, {cheese_type}, {Cheese}){
      await Cheese.create({cheese_type})
      .then((results) => {
          return results
      }).catch(error => console.log(error))
    },
    async createCrust(root, {crust_type}, {Crust}){
      await Crust.create({crust_type})
      .then((results) => {
        return results
      }).catch(error => console.log(error))

    }

  }
};

module.exports = resolvers