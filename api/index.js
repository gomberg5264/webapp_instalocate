/**
 * Created by arjunrajpal on 23/04/17.
 */

var express = require('express')
var request = require('request')
var cheerio = require('cheerio')

var api = express.Router();

var storeDetails = require('./storeDetails')
var getFlightDetails = require('./getFlightDetails')

api.get('/storeDetails',function (req,res) {

    flightId = req.query.flightId

    url = 'http://uk.flightaware.com/live/flight/'+flightId

    var status = {}

    request(url, function(error, response, html) {

        if (!error) {

            // flightId = url.replace("http://uk.flightaware.com/live/flight/","")

            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // console.log($('script'));
            scripts = $('script')

            var str = scripts[54].children[0].data
            // console.log(str);
            str = str.replace("			var trackpollGlobals = ","")
            str = str.replace(";","")

            // console.log(str)

            str = JSON.parse(str)

            var urlData = "https://uk.flightaware.com/ajax/ignoreall/trackpoll.rvt?token="+str.TOKEN+"&locale=en_GB&summary=1"
            // console.log(urlData)
            request(urlData, function(error, response, html) {
                var data = cheerio.load(html);

                tripData = data.text()
                tripData = JSON.parse(tripData)

                // res.json(tripData)

                flights = Object.keys(tripData)[2]
                tripId = Object.keys(tripData[flights])[0]
                // console.log(details)
                // console.log(tripData[details][tripId])
                var sourceAirport = tripData[flights][tripId]["activityLog"]["flights"][0]["origin"]["iata"]
                var sourceAirportName = tripData[flights][tripId]["activityLog"]["flights"][0]["origin"]["friendlyName"]
                var source = tripData[flights][tripId]["activityLog"]["flights"][0]["origin"]["friendlyLocation"]
                var plane = tripData[flights][tripId]["activityLog"]["flights"][0]["aircraftTypeFriendly"]
                var destinationAirport = tripData[flights][tripId]["activityLog"]["flights"][0]["destination"]["iata"]
                var destinationAirportName = tripData[flights][tripId]["activityLog"]["flights"][0]["destination"]["friendlyName"]
                var destination = tripData[flights][tripId]["activityLog"]["flights"][0]["destination"]["friendlyLocation"]
                var departureTime = tripData[flights][tripId]["activityLog"]["flights"][0]["gateDepartureTimes"]["scheduled"]
                var arrivalTime = tripData[flights][tripId]["activityLog"]["flights"][0]["gateArrivalTimes"]["scheduled"]
                var sourceCoordinates = tripData[flights][tripId]["activityLog"]["flights"][0]["origin"]["coord"]
                var destinationCoordinates = tripData[flights][tripId]["activityLog"]["flights"][0]["destination"]["coord"]
                var coordinates = tripData[flights][tripId]["track"]
                var planeCoordinates = coordinates[coordinates.length-1]["coord"]
                var waypoints = tripData[flights][tripId]["waypoints"]


                if(arrivalTime==null)
                    arrivalTime = tripData[flights][tripId]["activityLog"]["flights"][0]["landingTimes"]["scheduled"]

                if(departureTime==null)
                    departureTime= tripData[flights][tripId]["activityLog"]["flights"][0]["takeoffTimes"]["scheduled"]

                arrivalTime = new Date(Number(arrivalTime)*1000).toUTCString()
                departureTime = new Date(Number(departureTime)*1000).toUTCString()

                tripDetails = {flightId: flightId, sourceAirport:sourceAirport, sourceAirportName:sourceAirportName, source:source, plane:plane, destinationAirport:destinationAirport, destinationAirportName:destinationAirportName, destination:destination, departureTime: departureTime, arrivalTime: arrivalTime, sourceCoordinates: sourceCoordinates, destinationCoordinates: destinationCoordinates, planeCoordinates: planeCoordinates, waypoints: waypoints}

                // console.log(JSON.stringify(tripDetails))
                // console.log(planeCoordinates[0],planeCoordinates[1])

                status = storeDetails(req,res,tripDetails)

            })

        }
    })

});

api.post('/getFlightDetails',function(req,res) {

    getFlightDetails(req,res)

});

module.exports = api