const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const RegionType = new GraphQLObjectType({
  name: 'Region',
  fields: () => ({
    region: { type: GraphQLString },
  }),
})

module.exports = RegionType
