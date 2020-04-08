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
    }
    type Sauce{
      sauce_id: Int
      sauce_type: String
    }
    type Size{
      size_id: Int
      size_type: String
    }
    type Meat{
      meat_id: Int
      meat_type: String
    }
    type Veggie{
      veggie_id: Int
      veggie_type: String
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

    type Query{
      getCustomerByEmail(email: String): Customer 
    }




    type Mutation{
      createCheeseOp(cheese_type: String!): Cheese! 
      createCrustOp(crust_type: String!): Crust!
      createSauceOp(sauce_type: String!): Sauce!
      createSizeOp(size_type: String!): Size! 
      createMeatOp(meat_type: String!): Meat!
      createVeggieOp(veggie_type: String!): Veggie!
      createCustomer(
        first_name: String!
        last_name: String!
        phone: String!
        email: String!
        password: String
        isRegistered: Boolean 
      ): Customer
    }
 `;

module.exports = typeDefs;