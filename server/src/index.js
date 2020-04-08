const { ApolloServer} = require('apollo-server');
const sequelize = require('./db/dbConfig')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const port = 4000
const url = `http://localhost:${port}/graphql`

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(() => {
  console.log(`Apollo server ready at ${url}`);
});