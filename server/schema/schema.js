const graphql = require('graphql')
const WineType = require('./types/WineType')
const VarietalType = require('./types/VarietalType')
const VintageType = require('./types/VintageType')
const RegionType = require('./types/RegionType')

const {
  selectAllWines,
  selectWineByVarietal,
  selectWineByRegion,
  selectWineByVintage,
  selectWineById,
  getVarietals,
  getVintages,
  getRegions,
  searchForWines,
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
        winery: { type: GraphQLString },
        name: { type: GraphQLString }
      },
      resolve: (parentValue, args) => {
        if (args.winery || args.name) {
          return searchForWines({winery: args.winery, name: args.name}).then((res) => res.items)
        } else if (args.varietal) {
          return selectWineByVarietal(args.varietal).then((res) => res.items)
        } else if (args.region) {
          return selectWineByRegion(args.region).then((res) => res.items)
        } else if (args.vintage) {
          return selectWineByVintage(args.vintage).then((res) => res.items)
        } else if (args.id) {
          return selectWineById(args.id).then((res) => res.items)
        } else {
          return selectAllWines().then((res) => res.items)
        }
      },
    },
    varietals: {
      type: new GraphQLList(VarietalType),
      resolve: () => {
        return getVarietals().then((res) => res.items)
      },
    },
    vintages: {
      type: new GraphQLList(VintageType),
      resolve: () => {
        return getVintages().then((res) => res.items)
      },
    },
    regions: {
      type: new GraphQLList(RegionType),
      resolve: () => {
        return getRegions().then((res) => res.items)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
