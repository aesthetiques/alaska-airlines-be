'use strict'

const mongoose = require('mongooose')
const Schema = mongoose.Schema
const debug = require('debug')('aa-dev:location-controller')
const Promise = require('bluebird')
const createError = require('http-errors')

const locationSchema = Schema({
  location: {type: String, required: true, unique: true},
  flightsOut: [{type: Schema.Types.ObjectId, ref: 'flight'}],
})

locationSchema.createLocation = newDestination => {
  debug('#createLocation')
  if (!newDestination.location) 
    return Promise.reject(createError(400, 'no location included'))

  return new Location(newDestination)
    .save()
    .then(newLocation => newLocation)
    .catch(err => Promise.reject(createError(400, err.message)))
}

locationSchema.fetchAll = () => {
  debug('#fetchAll')

  return Location
    .find()
    .then(location => Promise.resolve(location))
    .catch(err => Promise.reject(createError(400, err.message)))
}

locationSchema.fetchOne = locationId => {
  debug('#fetchOne')
  if (!locationId) 
    return Promise.reject(createError(400, 'No location included'))

  return Location
    .findOne(locationId)
    .then(location => Promise.resolve(location))
    .catch(err => Promise.reject(createError(404, err.message)))
}

locationSchema.deleteLocataion = locationId => {
  debug('#deleteLocation')
  if (!locationId) 
    return Promise.reject(createError(400, 'No location included'))

  return Location
    .findByIdAndRemove(locationId)
    .then(location => promise.resolve(location))
    .catch(err => Promise.reject(createError(404, err.message)))
}

module.exports = mongoose.model('location', locationSchema)