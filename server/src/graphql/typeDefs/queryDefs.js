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

    getAllPizzasByOrder(order_id: Int): [Pizza]
    getAllOrderInfoByOrderId(order_id: Int): Order

    getMeatOptions: [Meat]
    getVeggieOptions: [Veggie]
    getCheeseOptions: [Cheese]
    getCrustOptions: [Crust]
    getSauceOptions: [Sauce]
    getSizeOptions: [Size]

    getToppingsByPizzaId(pizza_id: Int): Pizza
    getAllSpecialtyPizzaInfo: [Pizza]
  }
`;

module.exports = queries;
