const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
const Wine = require('../db/models/Wine')

const transformWines = (wines) => {
  return wines.map((wine) => {
    const wineItem = wine.toObject()
    wineItem.imageUrl = decodeURIComponent(wineItem.imageUrl)
    wineItem.id = wineItem._id
    return wineItem
  })
}

const selectAllWines = async () => {
  const response = await Wine.find({})
  const items = transformWines(response)
  return {
    items: items,
  }
}

const selectWineByVarietal = async (varietal) => {
  const response = await Wine.find({ varietal: varietal })
  const items = transformWines(response)
  return {
    items: items,
  }
}

const selectWineByRegion = async (region) => {
  const response = await Wine.find({ region: region })
  const items = transformWines(response)
  return {
    items: items,
  }
}

const selectWineByVintage = async (vintage) => {
  const response = await Wine.find({ vintage: vintage })
  const items = transformWines(response)
  return {
    items: items,
  }
}

const selectWineById = async (id) => {
  const response = await Wine.find({ _id: new ObjectId(id) })
  const items = transformWines(response)
  return {
    items: items,
  }
}

const getVarietals = async () => {
  const response = await Wine.distinct('varietal')
  return {
    items: response.map((item) => {
      return { varietal: item }
    }),
  }
}

const getVintages = async () => {
  const response = await Wine.distinct('vintage')
  return {
    items: response.map((item) => {
      return { vintage: item }
    }),
  }
}

const getRegions = async () => {
  const response = await Wine.distinct('region')
  return {
    items: response.map((item) => {
      return { region: item }
    }),
  }
}
module.exports = {
  selectAllWines,
  selectWineByVarietal,
  selectWineByVintage,
  selectWineByRegion,
  selectWineById,
  getVarietals,
  getVintages,
  getRegions,
}
