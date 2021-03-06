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

    setCheeseSelection(
      cheese_id: Int!
      pizza_id: Int!
    ): CheeseSelection

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
      registered: Boolean
    ): Customer

    createOrder(
      customer_id: Int!
      delivery: Boolean
      address_id: Int
    ): Order

    createPizza(
      size_id: Int
      crust_id: Int
      sauce_id: Int
      quantity: Int
      price: Float
    ): Pizza

    createAddress(
      street: String
      city: String
      state: String
      zip: String
      address_type_id: Int
    ): Address

    createAddressType(
      address_type: String
    ): AddressType

    createGuestOrder(
      guest: GuestInput!
      pizzas: [PizzaInput!]!
    ): CreatedOrderInfo

    createMemberOrder(
      pizzas: [PizzaInput!]!
    ): CreatedOrderInfo

    createSpecialtyPizza(
      crust_id: Int
      sauce_id: Int
      pizza_name: String
    ): Pizza
  }`;

module.exports = mutations;
