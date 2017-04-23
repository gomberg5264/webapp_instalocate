/**
 * Created by arjunrajpal on 23/04/17.
 */
var trip = require('../models/Trip')

module.exports = function(req,res,tripData){

    waypoints=[]
    for(var i=0; i<tripData.waypoints.length;i++)
        waypoints.push({lat: tripData.waypoints[i][1], lng: tripData.waypoints[i][0]})

    var newTrip = new trip({


        flightId : tripData.flightId,
        sourceAirport: tripData.sourceAirport,
        sourceAirportName: tripData.sourceAirportName,
        source: tripData.source,
        plane: tripData.plane,
        destinationAirport: tripData.destinationAirport,
        destinationAirportName: tripData.destinationAirportName,
        destination: tripData.destination,
        departureTime: tripData.departureTime,
        arrivalTime: tripData.arrivalTime,
        sourceCoordinatesLat: tripData.sourceCoordinates[1],
        sourceCoordinatesLng: tripData.sourceCoordinates[0],
        destinationCoordinatesLat: tripData.destinationCoordinates[1],
        destinationCoordinatesLng: tripData.destinationCoordinates[0],
        planeCoordinatesLat: tripData.planeCoordinates[1],
        planeCoordinatesLng: tripData.planeCoordinates[0],
        waypoints: waypoints

    });

    trip.remove({"flightId":tripData.flightId},function (err,docs) {

        if(err)
        {
            res.json({"err":err})
        }
    })

    newTrip.save(function (err,data) {

        if(err)
            res.json({'error':err});

        res.json(data)

    });
}