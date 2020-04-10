const { merge } = require ('lodash')
const query = require('./queries')
const mutation = require('./mutations')
// resolver functions for schema fields

const resolvers = merge(query, mutation)


module.exports = resolvers;
