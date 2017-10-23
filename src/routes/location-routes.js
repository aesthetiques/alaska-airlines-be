'use strict'

import express from 'express'
import Location from '../models/location.js'
const debug = require('debug')('aa-location-routes')
// import bearerAuth from '../lib/bearer-auth-middleware'

module.exports = function(router){

  router.post('/location/new', (req, res) => {
    debug('#Post /newlocation')
    
    Location.createLocation(req.body)
      .then(location => res.json(location))
      .catch(err => res.status(err.status).send(err))
  })

  router.get('/locations', (req, res) => {
    debug('#GET /locations')

    Location.fetchAll()
      .then(location => res.json(location))
      .catch(err => res.status(err.stats).send(err))
  })

  router.get('/location/:locationId', (req, res) => {
    debug('#GET /location/locationId')

    Location.fetchOne(req.params.locationId)
      .then(location => res.json(location))
      .catch(err => res.status(err.status).send(err))
  })

  router.put('/location/update/:locationId', (req, res) => {
    debug('#PUT /updatelocation/locationId')

    Location.updateLocation(req.params.locationId, req.body)
      .then(location => res.json(location))
      .catch(err => res.status(err.status).send(err.message))
  })

  router.delete('/location/delete/:locationId', (req, res) => {
    debug('#Delete /removelocation/:locationId')

    Location.deleteLocation(req.params.locations)
      .then(location => res.json(location))
      .catch(err => res.status(err.status).send(err))
  })

  return router
}