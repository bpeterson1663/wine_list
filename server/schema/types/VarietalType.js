const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const VarietalType = new GraphQLObjectType({
  name: 'Varietal',
  fields: () => ({
    varietal: { type: GraphQLString },
  }),
})

module.exports = VarietalType
