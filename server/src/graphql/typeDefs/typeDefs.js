const { gql } = require('apollo-server');
const inputDefs = require(`./inputDefs`);
const gqlModels = require('./modelDefs');
const queries = require('./queryDefs');
const mutations = require('./mutationDefs');

//graphql schemas
//defines the data and how it can be created
const typeDefs = gql`
  ${inputDefs}
  ${gqlModels}
  ${queries}
  ${mutations}
`;

module.exports = typeDefs;
