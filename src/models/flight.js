'use strict'

const debug = require('debug')('aa-dev:flight-controller')
import Promise from 'bluebird'
import mongoose from 'mongoose'
import Location from './location'
import createError from 'http-errors'

const Schema = mongoose.Schema

const flightSchema = Schema({
  arrival: {type: String, required: true},
  flightNum: {type: Number, required: true},
  departure: {type: String, required: true},
  departureCode: {type: String, required: true},
  destinationCode: {type: String, required: true},
  locationId: {type: Schema.Types.ObjectId, ref: 'location'},
  firstClass: [{type: Schema.Types.ObjectId, ref: 'ticket'}],
  standardClass: [{type: Schema.Types.ObjectId, ref: 'ticket'}],
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

  return Flight.findById(flightId)
    .then(flight => Promise.resolve(flight))
    .catch(err => Promise.reject(createError(404, err.message)))
}

Flight.fetchAll = function(){
  debug('Flight #fetchAll')
  
  return Flight.find()
    .then(flights => Promise.resolve(flights))
    .catch(err => Promise.reject(createError(404, err.message)))
}

Flight.delete = function(flightId){
  debug('Flight #deleteFlight')
  if(!flightId) Promise.reject(createError(400, 'No flightId included'))

  return Flight.findByIdAndRemove(flightId)
  .then(newFlight => Promise.resolve(newFlight))
  .catch(err => Promise.reject(createError(400, err.message)))
}

export default Flight