'use strict'

import cors from 'cors'
import express from 'express'
import Promise from 'bluebird'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import errorHandler from '../middleware/error-middleware'

const app = express()
const router = express.Router()

//Routes:
// import flightRoutes from '../routes/flight-routes'
// import ticketRoutes from '../routes/ticket-routes'
// import landingRoutes from '../routes/landing-routes'
import locationRoutes from '../routes/location-routes'

//.env variables:
const PORT = process.env.PORT || 3000
const VER = process.env.VER || '0.1.0'
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/aa-dev'

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI)

app.use(
  bodyParser.json(),
  // errorHandler,
  cors()
)

// app.use('/api', flightRoutes(router))
// app.use('/api', ticketRoutes(router))
// app.use('api', landingRoutes(router))
app.use('/api', locationRoutes(router))

export const start = () => {
  app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}; Version: ${VER}, MONGODB_URI: ${MONGODB_URI}`)
  })
}