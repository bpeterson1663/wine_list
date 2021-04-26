const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Wine = new Schema({
  name: { type: String },
  winery: { type: String },
  varietal: { type: String },
  region: { type: String },
  vintage: { type: String },
  price: { type: Number },
  description: { type: String },
})

module.exports = mongoose.model('wines', Wine)
