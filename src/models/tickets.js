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
      return new Ticket(ticketData).save()
        .then(newTicket => {
          if(newTicket.class === 'first'){
            flight.firstClass.push(newTicket)
          }else{
            flight.standardClass.push(newTicket)
          }

          return flight.save()
            .then(() => Promise.resolve(newTicket))
            .catch(err => Promise.reject(createError(400, err.message)))
        })
        .then(flight => Promise.resolve(flight))
        .catch(err => Promise.reject(createError(400, err.message)))
    })
}

Ticket.sell = function(ticketId){
  debug('#Ticket.sell')
  if(!ticketId) Promise.reject(createError(400, 'No ticketId included'))

  return Ticket.findById(ticketId)
    .then(ticket => {
      ticket.ticketCount -= 1
      ticket.save()
    })
    .catch(err => Promise.reject(createError(404, err.message)))
}

Ticket.update = function(ticketId, newData){
  debug('#Ticket.update')
  if(!ticketId) Promise.reject(createError(400, 'No flightId included'))
  if(!newData) Promise.reject(createError(400, 'No ticketData included'))

  return Ticket.findByIdAndUpdate(ticketId, newData)
    .then(ticket => Promise.resolve(ticket))
    .catch(err => Promise.reject(createError(404, 'No ticket found')))
}

export default Ticket