const { gql } = require('apollo-server')

//graphql schemas 
 const typeDefs = gql`

    type Crust{
      crust_id: Int
      crust_type: String
    }
    type Cheese{
      cheese_id: Int
      cheese_type: String
      cheese_price: Float
    }
    type Sauce{
      sauce_id: Int
      sauce_type: String
    }
    type Size{
      size_id: Int
      size_type: String
      size_price: Float
    }
    type Meat{
      meat_id: Int
      meat_type: String
      meat_price: Float
    }
    type Veggie{
      veggie_id: Int
      veggie_type: String
      veggie_price: Float
    }
    type Order{
      order_id: Int
      customer_id: Int
      isCompleted: Int
    }
    type Customer{
      customer_id: Int
      first_name: String
      last_name: String 
      phone: String
      email: String
      password: String
      isRegistered: Boolean
    }
    type Pizza{
      pizza_id: Int
      size_id: Int
      crust_id: Int
      sauce_id: Int
      size: Size
      crust: Crust
      sauce: Sauce
    }
    type MeatSelection{
      meat_id: Int
      pizza_id: Int
      meat: Meat
    }
    type CheeseSelection{
      cheese_id: Int
      pizza_id: Int
      cheese: Cheese
    }
    type VeggieSelection{
      veggie_id: Int
      pizza_id: Int
      veggie: Veggie
    }
    type OrderItem{
      pizza_id: Int
      order_id: Int
      pizza: Pizza
      order: Order
    }

    type Query{
      getTokenByCustomer(
        email: String!
        password: String!
      ) : String
      getCustomerByToken(token: String) : Customer
      getCustomerByEmail(email: String): Customer 
      getOrderItems(order_id: Int): [OrderItem]
      getCartInfo(cart_items: [Int]): [Pizza]
      getAllPizzas: [Pizza]
      getMeatOptions: [Meat]
      getVeggieOptions: [Veggie]
      getCheeseOptions: [Cheese]
      getCrustOptions: [Crust]
      getSauceOptions: [Sauce]
      getSizeOptions: [Size]
      getSelectedMeats(pizza_id: Int): [MeatSelection]
      getSelectedVeggies(pizza_id: Int): [VeggieSelection]
      getSelectedCheeses(pizza_id: Int): [CheeseSelection]
      getPizzasByCustomer(customer_id: Int!): [Pizza]
      getRegisteredUsers: [Customer]
      getGuests: [Customer]
      getOrdersByCustomer(customer_id: Int): [Pizza]
    }

    type Mutation{
      createCheeseOp(
        cheese_type: String!
        cheese_price: Float!
      ): Cheese! 
      createCrustOp(crust_type: String!): Crust!
      createSauceOp(sauce_type: String!): Sauce!
      createSizeOp(
        size_type: String!
        size_price: Float
      ): Size! 
      createMeatOp(
        meat_type: String!
        meat_price: Float
      ): Meat!
      createVeggieOp(
        veggie_type: String!
        veggie_price: Float
      ): Veggie!

      setVeggieSelection(
        veggie_id: Int! 
        pizza_id: Int!
      ): VeggieSelection

      setCheeseSelection(
        cheese_id: Int! 
        pizza_id: Int!
      ): CheeseSelection

      setMeatSelection(
        meat_id: Int! 
        pizza_id: Int!
      ): MeatSelection

      setOrderItem(
        order_id: Int!
        pizza_id: Int!
      ): OrderItem

      createCustomer(
        first_name: String!
        last_name: String!
        phone: String!
        email: String!
        password: String
        isRegistered: Boolean 
      ): Customer

      createOrder(
        customer_id: Int!
      ): Order

      createPizza(
        size_id: Int
        crust_id: Int
        sauce_id: Int
      ): Pizza

    }
 `;

module.exports = typeDefs;