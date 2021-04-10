const graphql = require('graphql')
const WineType = require('./types/WineType')
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList
} = graphql

const DB = [
    {
        name: 'Dummy Wine',
        id: '1',
        winery: 'Dummy Winery',
        vintage: '2020'
    },
    {
        name: 'Dummy Wine 2',
        id: '2',
        winery: 'Dummy Winery 2',
        vintage: '2020'
    },
    {
        name: 'Dummy Wine 3',
        id: '3',
        winery: 'Dummy Winery 3',
        vintage: '2019'
    },
    
]
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        wine: {
            type: new GraphQLList(WineType),
            resolve: (parentValue, args) => {
                return DB
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})