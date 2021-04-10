const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString
} = graphql

const WineType = new GraphQLObjectType({
    name: 'Wine',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        winery: { type: GraphQLString },
        vintage: { type: GraphQLString },
    })
})

module.exports = WineType