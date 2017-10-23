'use strict'

import superagent from 'superagent'
// import cleanDB from '../lib/clean-db'
import {start, close} from '../../src/lib/server'
import { mockLocation } from '../lib/mock-data'

let API_URL = process.env.API_URL

describe('Location Test Module', function(){
  beforeAll(start)
  afterAll(close)
  // afterEach(cleanDB)

  describe('POST /location/new', () => {
    test('should post a new location', () => {
      superagent.post(`${API_URL}/location/new`)
        .set('Content-Type', 'application/json')
        .send(mockLocation)
        .then((res, returnData) => {
          expect(res.status).toEqual(200)
        })
    })
  })

})
