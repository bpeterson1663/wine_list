const graphql = require('graphql')
const WineType = require('./types/WineType')
const VarietalType = require('./types/VarietalType')
const { Client } = require('pg')
const { selectAllWines, selectWineByVarietal } = require('../sql/queries')

const client = new Client({
  host: '0.0.0.0', //TODO: dynamically set to db for docker-compose
  port: 5432,
})
client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLString } = graphql

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    wines: {
      type: new GraphQLList(WineType),
      args: { varietal: { type: GraphQLString } },
      resolve: (parentValue, args) => {
        if (args.varietal) {
          return client.query(selectWineByVarietal(args.varietal)).then((res) => res.rows)
        } else {
          return client.query(selectAllWines).then((res) => res.rows)
        }
      },
    },
    varietals: {
      type: new GraphQLList(VarietalType),
      resolve: () => {
        return client
          .query('SELECT DISTINCT varietal FROM wines')
          .then((res) => res.rows)
          .catch((err) => console.log('ERROR: ', err))
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
