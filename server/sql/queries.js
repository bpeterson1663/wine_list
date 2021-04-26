const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
const Wine = require('../db/models/Wine')

const selectAllWines = () => {
  return Wine.find({}, (err, items) => {
    if (err) {
      return { success: false, error: err }
    }
    return { success: true, items: items }
  })
}

const selectWineByVarietal = (varietal) => {
  return Wine.find({ varietal: varietal }, (err, items) => {
    if (err) {
      return { success: false, error: err }
    }
    return { success: true, items: items }
  })
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

module.exports = {
  selectAllWines,
  selectWineByVarietal,
  selectWineByVintage,
  selectWineByRegion,
  selectWineById,
}
