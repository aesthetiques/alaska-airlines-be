# Alaska Airlines API

###Setup:
* Clone repo into local folder.

* Run `yarn install` or `npm i` in terminal to install required packages.

* Run `touch .env` in your terminal at the main directory level.
  * .env setup:

      `PORT=3000`

      `DEBUG=true`

      `CORS_ORIGIN=http://localhost:8080`

      `SECRET='<random string>'`

      `MONGO_URI=mongodb://localhost/aa-dev`

* Once your .env has the proper environment variables, open multiple tabs for your terminal.

* In one tab run `mongod --dbpath ./db` from the root directory of the backend.

* In another you run `yarn watch` or `npm run watch`. 

* If you want to take a look at the mongo database, you can also run `mongo` in a window to access the `aa-dev` database.

# Database Endpoints:

### Creating a new airport:
### `/api/location/new`
  
  This expects a request body that includes an `abbr` for the airport code [i.e. `SEA`] and a `location`, which is the `City, STATEABBREVIATION` format [`Seattle, WA`]

### `/api/locations`

  This simply fetches all airports from the database.

### `location/:locationId`

  This expects an included `locationId` in the query `parameters`. This is accessed by `req.params.locationId`

### `/api/location/update/:locationId`

  This expects an included `locationId` in the query `parameters`. This is accessed by `req.params.locationId`

### `/api/location/delete/:locationId`

  This expects an included `locationId` in the query `parameters`. This is accessed by `req.params.locationId`

### Creating a new flight:
### `/api/flight/new/:locationId`

  A flight requires the following properties in the request:

  `flightNum`

  `departure`
    
  `destination`
  
  `arrivalTime`
  
  `departureTime`
  
  `departureCode`
  
  `destinationCode`
  
  `firstClassPrice`
  
  `firstClassCount`
  
  `departureMilitary`
  
  `standardClassCount`
  
  `standardClassPrice`

  Then you include a `location._id` from the airport that the flight belongs to to submit it. This will automatically addd the flight to that airports' array of `flightsOut`.

### `/api/flights`

  This request expects no data, and will return an array of all of the flights in the database.

### `/api/flight/:flightId`

  This route is more of a preemptive measure, as it only returns a single flight, and it requires the `flight._id` in the request body as `flightId`

### `/api/flightplan/:departureCode/:destinationCode`

  This route expects the `abbr` property from a flight object. This is used in the front end with the search form. Ex: `SEA`.

### `/api/flight/delete/:flightId`

  This route expects a `flight._id` in the form of a req.params.locationId.