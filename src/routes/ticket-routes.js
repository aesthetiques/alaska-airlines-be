'use strict'

import expresss from 'express'
import Ticket from '../models/tickets'

const debug = require('debug')('aa-flight-routes')

module.exports = function(router){

  router.post('/ticket/new/:flightId', (req, res) => {
    debug('#POST /ticket/new/:flightId')

    req.body.flightId = req.params.flightId

    console.log(req.body)

    Ticket.create(req.params.flightId, req.body)
      .then(ticket => res.json(ticket))
      .catch(err => res.send(err))
  })

  router.put('/ticket/sell/:ticketId', (req, res) => {
    debug('#PUT /ticket/update/:ticketId')

    Ticket.sell(req.params.ticketId)
      .then(ticket => res.json(ticket))
      .catch(err => res.send(err))
  })

  router.put('/ticket/update/:ticketId', (req, res) => {
    debug('#PUT /ticket/reset/:ticketId')

    Ticket.update(req.params.ticketId, req.body)
      .then(ticket => res.json(req.body))
      .catch(err => res.status(err.status).send(err))
  })

  return router
}