'use strict'

const debug = require('debug')('aa-dev:location-controller')
import Promise from 'bluebird'
import mongoose from 'mongoose'
import createError from 'http-errors'

const Schema = mongoose.Schema

const locationSchema = Schema({
  abbr: {type: String, required: true, unique: true},
  location: {type: String, required: true, unique: true},
  flightsOut: [{type: Schema.Types.ObjectId, ref: 'flight'}],
})

const Location = mongoose.model('location', locationSchema)

Location.createLocation = function(newDestination){
  debug('#createLocation')
  if(!newDestination) return Promise.reject(createError(400, 'no location included'))

  return new Location(newDestination).save()
    .then(newLocation => Promise.resolve(newLocation))
    .catch(err => Promise.reject(createError(400, err.message)))
}

Location.fetchAll = function(){
  debug('#fetchAll')

  return Location.find()
    .then(location => Promise.resolve(location))
    .catch(err => Promise.reject(createError(400, err.message)))
}

Location.fetchOne = function(locationId){
  debug('#fetchOne')
  if (!locationId) return Promise.reject(createError(400, 'No location id included'))

  return Location.findById(locationId)
    .then(location => Promise.resolve(location))
    .catch(err => Promise.reject(createError(404, err.message)))
}

Location.updateLocation = function(locationId, location){
  debug('#updateOne')
  if(!locationId) return Promise.reject(createError(400, 'No location id included'))
  if(!location) return Promise.reject(createError(400, 'No location object included'))

  return Location.findByIdAndUpdate

}

Location.deleteLocation = function(locationId){
  debug('#deleteLocation')
  if (!locationId) return Promise.reject(createError(400, 'No location included'))

  return Location.findByIdAndRemove(locationId)
    .then(location => promise.resolve(location))
    .catch(err => Promise.reject(createError(404, err.message)))
}

export default Location