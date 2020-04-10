const { gql } = require('apollo-server')
const queries = require('./queryDefs')
const mutations = require('./mutationDefs')
const gqlModels = require('./modelDefs')

//graphql schemas 
//defines the data and how it can be created  
 const typeDefs = gql`
 
  ${gqlModels}
  ${queries}
  ${mutations}
    
 `;

module.exports = typeDefs;