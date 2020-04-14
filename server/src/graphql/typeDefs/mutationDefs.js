const mutations = `
    type Mutation{

    createCrustOp(crust_type: String!): Crust!
    
    createSauceOp(sauce_type: String!): Sauce!

    createCheeseOp(
      cheese_type: String!
      cheese_price: Float!
    ): Cheese! 
    
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

    setMeatSelection(
      meat_id: Int! 
      pizza_id: Int!
    ): MeatSelection

    setOrderItem(
      order_id: Int!
      pizza_id: Int!
    ): OrderItem

    updateOrCreateCustomer(
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
      cheese_id: Int
    ): Pizza

    createAndFillPizza(
      pizza: PizzaInput!
    ): Pizza

    createGuestOrder(
      guest: GuestInput!
      pizzas: [PizzaInput!]!
    ): Order

    createMemberOrder(
      pizzas: [PizzaInput!]!
    ): Order
  }`;

module.exports = mutations;
