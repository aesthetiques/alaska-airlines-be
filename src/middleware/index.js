'use strict'

import cors from 'cors'
import debug from 'morgan'
import Promise from 'bluebird'
import {Router} from 'express'
import bodyParser from 'body-parser'
import errorHandler from './error-middleware'

import landingRoutes from '../routes/landing-routes'
import flightRoutes from '../routes/flight-routes'

const CORS_ORIGINS = process.env.CORS_ORIGIN || 'http://localhost:8080'

export default new Router().use([
  //Global Middleware
  cors({
    origin: CORS_ORIGINS.split(''),
    credentials: true,
  }),
  debug('dev'),
  bodyParser(),
  //Routes
  flightRoutes,
  landingRoutes,
  //Error Handlers
  errorHandler,
])