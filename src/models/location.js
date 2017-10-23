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

Location.createLocation = function(locationData){
  debug('Location #createLocation')
  if(!locationData) return Promise.reject(createError(400, 'no location included'))

  return new Location(locationData).save()
    .then(newLocation => Promise.resolve(newLocation))
    .catch(err => Promise.reject(createError(400, err.message)))
}

Location.fetchAll = function(){
  debug('Location #fetchAll')

  return Location.find()
    .then(location => Promise.resolve(location))
    .catch(err => Promise.reject(createError(400, err.message)))
}

Location.fetchOne = function(locationId){
  debug('Location #fetchOne')
  if (!locationId) return Promise.reject(createError(400, 'No location id included'))

  return Location.findById(locationId)
    .then(location => Promise.resolve(location))
    .catch(err => Promise.reject(createError(404, err.message)))
}

Location.updateLocation = function(locationId, newData){
  debug('Location #updateOne')
  if(!locationId) return Promise.reject(createError(400, 'No location id included'))
  if(!newData) return Promise.reject(createError(400, 'No location object included'))

  return Location.findByIdAndUpdate(locationId, newData)
    .then(location => Promise.resolve(location))
    .catch(err => Promise.reject(createError(404, 'No location found')))
}

Location.deleteLocation = function(locationId){
  debug('Location #deleteLocation')
  if (!locationId) return Promise.reject(createError(400, 'No location included'))

  return Location.findByIdAndRemove(locationId)
    .then(location => Promise.resolve(location))
    .catch(err => Promise.reject(createError(404, err.message)))
}

export default Location