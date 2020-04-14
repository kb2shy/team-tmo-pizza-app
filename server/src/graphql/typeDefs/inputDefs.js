const gqlModels = `
  input PizzaContent {
    size: String!
    crust: String!
    sauce: String!
    cheese: String!
    meats: [String!]!
    veggies: [String!]!
  }`;

module.exports = gqlModels;
