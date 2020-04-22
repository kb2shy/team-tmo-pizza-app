const { ApolloServer } = require('apollo-server');
const sequelize = require('./db/dbConfig')
const resolvers = require('./graphql/resolvers/resolvers')
const typeDefs = require('./graphql/typeDefs/typeDefs')
const authContext = require('./graphql/contexts/auth') // used for JWT authentication
//sequelize models
const Crust = require('./db/sequelizeModels/crust')
const Sauce = require('./db/sequelizeModels/sauce')
const Size = require('./db/sequelizeModels/size')
const Meat = require('./db/sequelizeModels/meat')
const Cheese = require('./db/sequelizeModels/cheese')
const Veggie = require('./db/sequelizeModels/veggie')

const MeatSelection = require('./db/sequelizeModels/meatSelection')
const CheeseSelection = require('./db/sequelizeModels/cheeseSelection')
const VeggieSelection = require('./db/sequelizeModels/veggieSelection')

const Customer = require('./db/sequelizeModels/customer')
const Address = require('./db/sequelizeModels/address')
const AddressType = require('./db/sequelizeModels/addressType')
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
Pizza.belongsToMany(Meat, { through: MeatSelection, foreignKey: 'pizza_id' })
Meat.belongsToMany(Pizza, { through: MeatSelection, foreignKey: 'meat_id' })
Pizza.hasMany(MeatSelection, { foreignKey: { name: 'pizza_id', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
MeatSelection.belongsTo(Pizza, { foreignKey: 'pizza_id' })
Meat.hasMany(MeatSelection, { foreignKey: { name: 'meat_id', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
MeatSelection.belongsTo(Meat, { foreignKey: 'meat_id' })

//creates composite fk on cheese selections table - many to many between pizza and cheese types table
Pizza.belongsToMany(Cheese, { through: CheeseSelection, foreignKey: 'pizza_id' })
Cheese.belongsToMany(Pizza, { through: CheeseSelection, foreignKey: 'cheese_id' })
Pizza.hasMany(CheeseSelection, { foreignKey: { name: 'pizza_id', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
CheeseSelection.belongsTo(Pizza, { foreignKey: 'pizza_id' })
Cheese.hasMany(CheeseSelection, { foreignKey: { name: 'cheese_id', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
CheeseSelection.belongsTo(Cheese, { foreignKey: { name: 'cheese_id', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })

//creates composite fk on veggie selections table - many to many between pizza and veggie types table
Pizza.belongsToMany(Veggie, { through: VeggieSelection, foreignKey: 'pizza_id' })
Veggie.belongsToMany(Pizza, { through: VeggieSelection, foreignKey: 'veggie_id' })
Pizza.hasMany(VeggieSelection, { foreignKey: { name: 'pizza_id', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
VeggieSelection.belongsTo(Pizza, { foreignKey: 'pizza_id' })
Veggie.hasMany(VeggieSelection, { foreignKey: { name: 'veggie_id', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
VeggieSelection.belongsTo(Veggie, { foreignKey: { name: 'veggie_id', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })

//creates composite fk on order items table - many to many between pizzas and orders tables
Pizza.belongsToMany(Order, { through: OrderItem, foreignKey: 'pizza_id' })
Order.belongsToMany(Pizza, { through: OrderItem, foreignKey: 'order_id' })
Pizza.hasMany(OrderItem, { foreignKey: { name: 'pizza_id', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
OrderItem.belongsTo(Pizza, { foreignKey: 'pizza_id' })
Order.hasMany(OrderItem, { foreignKey: { name: 'order_id', allowNull: false }, onDelete: 'CASCADE', onDelete: 'CASCADE' })
OrderItem.belongsTo(Order, { foreignKey: 'order_id' })

//creates fk on order table with customer_id
Customer.hasMany(Order, { foreignKey: { name: 'customer_id', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Order.belongsTo(Customer, { foreignKey: 'customer_id' })

//creates fk on order table with address_id
Address.hasMany(Order, { foreignKey: { name: 'address_id', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Order.belongsTo(Address, { foreignKey: 'address_id' })

//creates fk on store table with address_id
AddressType.hasMany(Address, { foreignKey: { name: 'address_type_id', allowNull: true }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Address.belongsTo(AddressType, { foreignKey: 'address_type_id', allowNull: true })

//creates apollo server, passing db models as context 
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (integrationContext) => ({
    Customer, Cheese, Crust, Order, Pizza, Sauce, Meat, Veggie, Size,
    MeatSelection, VeggieSelection, OrderItem, CheeseSelection,
    Address, AddressType,
    ...authContext(integrationContext)
  }),
});

//connects to sql server and starts apollo server
sequelize.sync()
  .then(() => {
    server.listen({ port: 4000 }).then(({ url }) => {
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