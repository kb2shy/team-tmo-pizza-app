const { gql } = require('apollo-server');
const queries = require('./queryDefs');
const mutations = require('./mutationDefs');
const gqlModels = require('./modelDefs');
const inputDefs = require(`./inputDefs`);

//graphql schemas
//defines the data and how it can be created
const typeDefs = gql`
  ${inputDefs}
  ${gqlModels}
  ${queries}
  ${mutations}
`;

module.exports = typeDefs;
