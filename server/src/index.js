const { ApolloServer } = require('apollo-server');
const sequelize = require('./db/dbConfig')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const port = 4000
const url = `http://localhost:${port}/graphql`

const Customer = require('./db/sequelizeModels/customer')
const Cheese = require('./db/sequelizeModels/cheese')
const Crust = require('./db/sequelizeModels/crust')
const Order = require('./db/sequelizeModels/order')
const Pizza = require('./db/sequelizeModels/pizza')


const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: {Customer, Cheese, Crust, Order, Pizza} 
});

sequelize.sync()
  .then(() => {
    server.listen().then(() => {
      console.log(`Apollo server ready at ${url}`);
    });
  }).catch(error => {
    console.log(error)
  })

process.on('SIGTERM', () => {
  server.close(() => {
    sequelize.end()
  })

  setTimeout(() => {
    console.log('forcing db shutdown')
    process.exit(1)
  }, 30 * 1000)
})