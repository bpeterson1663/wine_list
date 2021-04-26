const graphql = require('graphql')
const WineType = require('./types/WineType')
const VarietalType = require('./types/VarietalType')
const VintageType = require('./types/VintageType')
const RegionType = require('./types/RegionType')
const Wine = require('../db/models/Wine')
const {
  selectAllWines,
  selectWineByVarietal,
  selectWineByRegion,
  selectWineByVintage,
  selectWineById,
} = require('../sql/queries')

const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLString } = graphql

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    wines: {
      type: new GraphQLList(WineType),
      args: {
        varietal: { type: GraphQLString },
        id: { type: GraphQLString },
        vintage: { type: GraphQLString },
        region: { type: GraphQLString },
      },
      resolve: (parentValue, args) => {
        if (args.varietal) {
          return args.varietal === 'All Varietals' ? selectAllWines() : selectWineByVarietal(args.varietal)
        } else if (args.region) {
          return selectWineByRegion(args.region)
        } else if (args.vintage) {
          return selectWineByVintage(args.vintage)
        } else if (args.id) {
          return selectWineById(args.id)
        } else {
          return selectAllWines()
        }
      },
    },
    varietals: {
      type: new GraphQLList(VarietalType),
      resolve: () => {
        return Wine.distinct('varietal')
      },
    },
    vintages: {
      type: new GraphQLList(VintageType),
      resolve: () => {
        return Wine.distinct('vintage')
      },
    },
    regions: {
      type: new GraphQLList(RegionType),
      resolve: () => {
        return Wine.distinct('region')
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
