var mongoose = require('mongoose')

var tripSchema = mongoose.Schema({

    flightId : String,
    sourceAirport: String,
    sourceAirportName: String,
    source: String,
    plane: String,
    destinationAirport: String,
    destinationAirportName: String,
    destination: String,
    departureTime: String,
    arrivalTime: String,
    sourceCoordinatesLat: Number,
    sourceCoordinatesLng: Number,
    destinationCoordinatesLat: Number,
    destinationCoordinatesLng: Number,
    planeCoordinatesLat: Number,
    planeCoordinatesLng: Number,
    waypoints: [{lat: Number, lng:Number}]
})

var trip = mongoose.model('trip',tripSchema)

module.exports = trip