const inputDefs = `
  input GuestInput {
    first_name: String!
    last_name: String!
    phone: String!
    email: String!
  }
  input ToppingsInput {
    meats: [String!]!
    veggies: [String!]!
  }
  input PizzaInput {
    size: String!
    crust: String!
    sauce: String!
    cheese: String!
    toppings: ToppingsInput!
  }
`;

module.exports = inputDefs;
