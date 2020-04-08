const { ApolloServer } = require('apollo-server');
const sequelize = require('./db/dbConfig')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const port = 4000
const url = `http://localhost:${port}/graphql`

//sequelize models
const Crust = require('./db/sequelizeModels/crust')
const Sauce = require('./db/sequelizeModels/sauce')
const Size = require('./db/sequelizeModels/size')
const Meat = require('./db/sequelizeModels/meat')
const Cheese = require('./db/sequelizeModels/cheese')
const Veggie = require('./db/sequelizeModels/veggie')

const MeatSelect = require('./db/sequelizeModels/meatSelection')
const CheeseSelect = require('./db/sequelizeModels/cheeseSelection')
const VeggieSelect = require('./db/sequelizeModels/veggieSelection')

const Customer = require('./db/sequelizeModels/customer')
const Address = require('./db/sequelizeModels/address')
const Order = require('./db/sequelizeModels/order')
const Pizza = require('./db/sequelizeModels/pizza')
const OrderItem = require('./db/sequelizeModels/orderItem')

/*Defining db table relationships*/
//creates fk on pizza table with crust_id - refrences crust types
Crust.hasMany(Pizza, { foreignKey: { name: 'crust_id', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Pizza.belongsTo(Crust, { foreignKey: 'crust_id' })

//creates fk on pizza table with sauce_id - refrences sauce types
Sauce.hasMany(Pizza, { foreignKey: { name: 'sauce_id', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Pizza.belongsTo(Sauce, { foreignKey: 'sauce_id' })

//creates fk on pizza table with size_id - refrences size types
Size.hasMany(Pizza, { foreignKey: { name: 'size_id', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Pizza.belongsTo(Size, { foreignKey: 'size_id' })

//creates composite fk on meat selections table - many to many between pizza and meat types table
Pizza.hasMany(MeatSelect, { foreignKey: { name: 'pizza_id', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
MeatSelect.belongsTo(Pizza, { foreignKey:'pizza_id' })
Meat.hasMany(MeatSelect, { foreignKey: { name: 'meat_id', allowNull: false }, onDelete: 'CASCADE', onUdate: 'CASCADE'})
MeatSelect.belongsTo(Meat, {foreignKey: 'meat_id'})

//creates composite fk on cheese selections table - many to many between pizza and cheese types table
Pizza.hasMany(CheeseSelect, {foreignKey: {name: 'pizza_id', allowNull: false}, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
CheeseSelect.belongsTo(Pizza, {foreignKey: 'pizza_id'})
Cheese.hasMany(CheeseSelect, {foreignKey: {name: 'cheese_id', allowNull: false}, onDelete:'CASCADE', onUpdate: 'CASCADE'})
CheeseSelect.belongsTo(Cheese, {foreignKey: {name: 'cheese_id', allowNull: false}, onDelete: 'CASCADE', onUpdate:'CASCADE'})

//creates composite fk on veggie selections table - many to many between pizza and veggie types table
Pizza.hasMany(VeggieSelect, {foreignKey: {name: 'pizza_id', allowNull: false}, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
VeggieSelect.belongsTo(Pizza, {foreignKey: 'pizza_id'})
Veggie.hasMany(VeggieSelect, {foreignKey: {name: 'veggie_id', allowNull: false}, onDelete:'CASCADE', onUpdate: 'CASCADE'})
VeggieSelect.belongsTo(Cheese, {foreignKey: {name: 'veggie_id', allowNull: false}, onDelete: 'CASCADE', onUpdate:'CASCADE'})

//creates composite fk on order items table - many to many between pizzas and orders tables
Pizza.hasMany(OrderItem, {foreignKey: {name: 'pizza_id', allowNull: false}, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
OrderItem.belongsTo(Pizza, { foreignKey: 'pizza_id'})
Order.hasMany(OrderItem, {foreignKey: { name: 'order_id', allowNull: false}, onDelete: 'CASCADE', onDelete: 'CASCADE'})
OrderItem.belongsTo(Order, {foreignKey: 'order_id'})

//creates fk on order table with customer_id
Customer.hasMany(Order, {foreignKey: {name: 'customer_id', allowNull: false}, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
Order.belongsTo(Customer, {foreignKey: 'customer_id'})

//creates apollo server, passing db models as context 
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { Customer, Cheese, Crust, Order, Pizza, Sauce, Meat, Veggie, Size}
});

//connects to sql server and starts apollo server
sequelize.sync()
  .then(() => {
    server.listen(port ).then(() => {
      console.log(`Apollo server ready at ${url}`);
    });
  }).catch(error => {
    console.log(error)
  })

//shuts down sql connection on close
process.on('SIGTERM', () => {
  server.close(() => {
    sequelize.end()
  })

  setTimeout(() => {
    console.log('forcing db shutdown')
    process.exit(1)
  }, 30 * 1000)
})