const inputDefs = `
  input GuestInput {
    first_name: String!
    last_name: String!
    phone: String!
    email: String!
  }
  input ToppingsInput {
    meats: [Int!]
    veggies: [Int!]
    cheeses: [Int!]
  }
  input PizzaInput {
    size: Int!
    crust: Int!
    sauce: Int!
    toppings: ToppingsInput
  }
`;

module.exports = inputDefs;
