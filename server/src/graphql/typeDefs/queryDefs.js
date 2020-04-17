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
    getAllPizzaInfoByOrder(order_id: Int): [Pizza]

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
    getSelectedCheeses(pizza_id: Int): [CheeseSelection]

    getTotalSelectedVeggie(veggie_id: Int): [Veggie]
    getTotalSelectedMeat(meat_id: Int): [Meat]
    getTotalSelectedCheese(cheese_id: Int): [Cheese]
  }
`;

module.exports = queries;
