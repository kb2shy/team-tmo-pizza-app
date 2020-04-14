const queries = `
  type Query {
    getTokenByCustomer(
      email: String!,
      password: String!
    ): String
    getCustomerByToken: Customer
    getCustomerByEmail(email: String): Customer

    getRegisteredUsers: [Customer]
    getGuests: [Customer]

    getAllOrdersByCustomer(customer_id: Int): [Order]
    getCartInfo(cart_items: [Int]): [Pizza]

    getAllPizzasByOrder(order_id: Int): [Pizza]

    getMeatOptions: [Meat]
    getVeggieOptions: [Veggie]
    getCheeseOptions: [Cheese]
    getCrustOptions: [Crust]
    getSauceOptions: [Sauce]
    getSizeOptions: [Size]

    getAllPizzas: [Pizza]
    getAllPizzasByCustomer(customer_id: Int!): [Pizza]
    getSelectedMeats(pizza_id: Int): [MeatSelection]
    getSelectedVeggies(pizza_id: Int): [VeggieSelection]

    getTotalSelectedVeggie(veggie_id: Int): [Veggie]
    getTotalSelectedMeat(meat_id: Int): [MeatSelection]
  }
`;

module.exports = queries;
