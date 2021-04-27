const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
const Wine = require('../db/models/Wine')

const selectAllWines = async () => {
  const response = await Wine.find({})
  return {
    items: response,
  }
}

const selectWineByVarietal = async (varietal) => {
  const response = await Wine.find({ varietal: varietal })
  return {
    items: response,
  }
}

const selectWineByRegion = (region) => {
  return Wine.find({ region: region }, (err, items) => {
    if (err) {
      return { success: false, error: err }
    }
    return { success: true, items: items }
  })
}

const selectWineByVintage = (vintage) => {
  return Wine.find({ vintage: vintage }, (err, items) => {
    if (err) {
      return { success: false, error: err }
    }
    return { success: true, items: items }
  })
}

const selectWineById = (id) => {
  return Wine.find({ _id: new ObjectId(id) }, (err, items) => {
    if (err) {
      return { success: false, error: err }
    }
    return { success: true, items: items }
  })
}

const getVarietals = async () => {
    const response = await Wine.distinct('varietal')
    return {
      items: response.map(item => {
        return { varietal: item }
      }),
    }
  }
  
  const getVintages = async () => {
    const response = await Wine.distinct('vintage')
    return {
      items: response.map(item => {
        return { vintage: item }
      })
    }
  }
  
  const getRegions = async () => {
    const response = await Wine.distinct('region')
    return {
      items: response.map(item => {
        return { region: item }
      })
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
  getRegions
}
