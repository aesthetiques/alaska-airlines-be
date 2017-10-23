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

  return router
}