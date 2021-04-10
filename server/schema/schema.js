const graphql = require('graphql')
const WineType = require('./types/WineType')
const { Client } = require('pg')
const client = new Client({
    host: '0.0.0.0',
    port: 5432
})
client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
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
        wines: {
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