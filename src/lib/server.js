'use strict'

import express from 'express'
import mongoose from 'mongoose'
import middleware from '../middleware'

const app = express().use(middleware)

//.env variables
const PORT = process.env.PORT || 3000
const VER = process.env.VER || '0.1.0'
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/aa-dev'

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI)

export const start = () => {
  app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}; Version: ${VER}, MONGODB_URI: ${MONGODB_URI}`)
  })
}