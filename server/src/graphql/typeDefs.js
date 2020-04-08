const { gql } = require('apollo-server')

//graphql schemas 
 const typeDefs = gql`

    type Selection{
      id: Int!
      type: String!
    }
    type Query{
      getId: ID
    }
    type Mutation{
      createCheese(
        cheese_type: String!
      ): Selection
      createCrust(
        crust_type: String!
      ): Selection
    }
 `;

module.exports = typeDefs;