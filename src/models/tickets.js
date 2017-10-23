'use strict'

const debug = require('debug')('aa-dev:location-controller')
import Flight from './flight'
import Promise from 'bluebird'
import mongoose from 'mongoose'
import createError from 'http-errors'

const Schema = mongoose.Schema


const ticketSchema = Schema({
  ticketCount: {type: Number, required: true},
  ticketPrice: {type: Number, required: true},
  flightId: {type: Schema.Types.ObjectId, ref: 'flight'},
  class: {type: String, default: 'standard', required: true},
})

const Ticket = mongoose.model('ticket', ticketSchema)

Ticket.create = function(flightId, ticketData){
  debug('#Ticket.create')
  if(!flightId) Promise.reject(createError(400, 'No flightId included'))
  if(!ticketData) Promise.reject(createError(400, 'No ticketData included'))

  return Flight.findById(flightId)
    .then(flight => {
      return new Ticket(ticketData)
        .then(newTicket => {
          if(newticket.class === 'first'){
            flight.firstClass.push(newTicket)
          }else{
            flight.standardClass.push(newTicket)
          }

          return flight.Save()
            .then(() => Promise.resolve(newFlight))
            .catch(err => Promise.reject(createError(400, err.message)))
        })
        .then(flight => Promise.resolve(flight))
        .catch(err => Promise.reject(createError(400, err.message)))
    })
}

export default Ticket