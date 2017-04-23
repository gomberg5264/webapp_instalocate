/**
 * Created by arjunrajpal on 23/04/17.
 */
var trip = require('../models/Trip')

module.exports = function(req,res){

    var flightId = req.query.flightId

    trip.findOne({"flightId":flightId},function (err,tripData) {

        if(err)
            res.json({"err":err})
        else
        {
            res.json(tripData)
        }

    })
}