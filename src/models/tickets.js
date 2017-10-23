'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticketSchema = Schema({
  class: {type: String, default: 'standard', required: true},
  flight: {type: Schema.Types.ObjectId, ref: 'flight'},
  ticketCount: {type: Number, required: true},
  ticketPrice: {type: Number, required: true},
})

module.exports = mongoose.model('ticket', ticketSchema)