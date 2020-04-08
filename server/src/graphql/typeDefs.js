const { gql } = require('apollo-server')

//graphql schemas 
 const typeDefs = gql`
    type Query{
      getId: ID
    }
 `;

module.exports = typeDefs;