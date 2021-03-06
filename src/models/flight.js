'use strict'

const debug = require('debug')('aa-dev:flight-controller')
import Promise from 'bluebird'
import mongoose from 'mongoose'
import Location from './location'
import createError from 'http-errors'

const Schema = mongoose.Schema

const flightSchema = Schema({
  flightNum: {type: Number, required: true},
  departure: {type: String, required: true},
  destination: {type: String, required: true},
  arrivalTime: {type: String, required: true},
  departureTime: {type: String, required: true},
  departureCode: {type: String, required: true},
  destinationCode: {type: String, required: true},
  firstClassPrice: {type: Number, required: true},
  firstClassCount: {type: Number, required: true},
  departureMilitary: {type: Number, required: true},
  standardClassCount: {type: Number, required: true},
  standardClassPrice: {type: Number, required: true},
  locationId: {type: Schema.Types.ObjectId, ref: 'location'},
})

const Flight = mongoose.model('flight', flightSchema)

Flight.create = function(locationId, flightData){
  debug('Flight #createFlight')
  if(!flightData) Promise.reject(createError(400, 'No flightData included'))

  return Location.findById(locationId)
    .then(location => {
      return new Flight(flightData).save()
        .then(newFlight => {
          location.flightsOut.push(newFlight)
          return location.save()
            .then(() => Promise.resolve(newFlight))
            .catch(err => Promise.reject(createError(400, err.message)))
        })
        .then(location => Promise.resolve(location))
        .catch(err => Promise.reject(createError(400, err.message)))
    })
}

Flight.fetchOne = function(flightId){
  debug('Flight #fetchOne')
  if(!flightId) Promise.reject(createError(400, 'No flightId included'))

  return Flight.findById(flightId).populate('firstClass standardClass')
    .then(flight => Promise.resolve(flight))
    .catch(err => Promise.reject(createError(404, err.message)))
}

Flight.fetchAll = function(){
  debug('Flight #fetchAll')
  
  return Flight.find()
    .then(flights => Promise.resolve(flights))
    .catch(err => Promise.reject(createError(404, err.message)))
}

Flight.flightPlan = function(departureCode, destinationCode){
  debug('Flight #flightPlan')
  if(!departureCode) Promise.reject(createError(400, 'No departure code'))
  if(!destinationCode) Promise.reject(createError(400, 'No destination code'))

  return Location.findOne({ abbr: departureCode })
    .populate({
      path: 'flightsOut',
      match: { destinationCode: { $eq: destinationCode }},
    })
    .exec()
    .then(flights => Promise.resolve(flights))
    .catch(err => Promise.reject(createError(404, 'No flights found')))
}

Flight.delete = function(flightId){
  debug('Flight #deleteFlight')
  if(!flightId) Promise.reject(createError(400, 'No flightId included'))

  return Flight.findByIdAndRemove(flightId)
  .then(newFlight => Promise.resolve(newFlight))
  .catch(err => Promise.reject(createError(400, err.message)))
}

export default Flight