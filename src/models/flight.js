'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const flightSchema = Schema({
  locationId: {type: Schema.Types.ObjectId, ref: 'location'},
  startLocation: {type: String, required: true},
  destination: {type: String, required: true},
  flightNum: {type: Number, required: true},
  departure: {type: Number, required: true},
  arrival: {type: Number, required: true},
  standardClass: [{type: Schema.Types.ObjectId, ref: 'ticket'}],
  firstClass: [{type: Schema.Types.ObjectId, ref: 'ticket'}],
})

module.exports = mongoose.model('flight', flightSchema)