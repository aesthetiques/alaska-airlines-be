'use strict'

import express from 'express'
import Flight from '../models/flight.js'

const debug = require('debug')('aa-flight-routes')

module.exports = function(router){

  router.post('/flight/new/:locationId', (req, res) => {
    debug('#POST /flight/new/:locationId')

    req.body.locationId = req.params.locationId
    Flight.create(req.params.locationId, req.body)
      .then(flight => res.json(flight))
      .catch(err => res.status(err.status).send(err))
  })

  router.get('/flights', (req, res) => {
    debug('#GET /flights')

    Flight.fetchAll()
      .then(location => res.json(location))
      .catch(err => res.status(err.status).send(err))
  })

  router.get('/flight/:flightId', (req, res) => {
    debug('#GET /flight/:flightId')

    Flight.fetchOne(req.params.flightId)
      .then(flight => res.json(flight))
      .catch(err => res.status(err.status).send(err))
  })

  router.delete('/flight/delete/:flightId', (req, res) => {
    debug('#Delete /flight/delete/:flightId')

    Flight.delete(req.params.flightId)
      .then(flight => res.json(flight))
      .catch(err => res.status(err.status).send(err))      
  })

  return router
}