'use strict'

const debug = require('debug')('aa-location-routes')
import locationController from '../controllers/location-controller'
import bearerAuth from '../lib/bearer-auth-middleware'

module.exports = function(router){
  
  router.post('/newlocation', (req, res) => {
    debug('#Post /newlocation')

    locationController.createLocation(req.body)
      .then(location => res.json(location))
      .catch(err => res.status(err.status).send(err))
  })

  router.get('/locations'), (req, res) => {
    debug('#GET /locations')

    locationController.fetchLocations()
      .then(location => res.json(location))
      .catch(err => res.status(err.stats).send(err))
  }
  
  router.put('/updatelocation/:locationId', bearerAuth, (req, res) => {
    debug('#PUT /updatelocation/locationId')
    
    locationController.updateLocation(req.params.locationId, req.body)
      .then(location => res.json(location))
      .catch(err => res.status(err.status).send(err.message))
  })
  
  router.delete('/removelocation/:locationId', bearerAuth, (req, res) => {
    debug('#Delete /removelocation/:locationId')

    locationController.deleteLocation(req.params.locations)
      .then(location => res.json(location))
      .catch(err => res.status(err.status).send(err))
  })

  return router
}