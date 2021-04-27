const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const WineType = new GraphQLObjectType({
  name: 'Wine',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    winery: { type: GraphQLString },
    vintage: { type: GraphQLString },
    varietal: { type: GraphQLString },
    price: { type: GraphQLString },
    description: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    region: { type: GraphQLString },
  }),
})

module.exports = WineType
