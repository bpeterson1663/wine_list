const graphql = require('graphql')
const WineType = require('./types/WineType')
const { Client } = require('pg')
const { selectAllWines } = require('../sql/queries') 

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

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        wines: {
            type: new GraphQLList(WineType),
            resolve: () => {
                return client.query(selectAllWines).then(res => {
                    return res.rows
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})