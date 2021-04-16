const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const VintageType = new GraphQLObjectType({
  name: 'Vintage',
  fields: () => ({
    vintage: { type: GraphQLString },
  }),
})

module.exports = VintageType
