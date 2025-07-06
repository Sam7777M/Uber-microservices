const rideModel = require('../models/ride.model');
const { publishToQueue } = require('../service/rabbit')

module.exports.createRide = async (req, res, next) => {


    const { pickup, destination } = req.body;


    const newRide = new rideModel({
        user: req.user._id,
        pickup,
        destination
    })



    await newRide.save();
    // Tell RabbitMQ that a new ride has been created
    // Always use JSON.stringify to convert the object to a string before sending it to RabbitMQ
    publishToQueue("new-ride", JSON.stringify(newRide))
    res.send(newRide);




}

module.exports.acceptRide = async (req, res, next) => {
    const { rideId } = req.query;
    const ride = await rideModel.findById(rideId);
    if (!ride) {
        return res.status(404).json({ message: 'Ride not found' });
    }

    ride.status = 'accepted';
    await ride.save();
    publishToQueue("ride-accepted", JSON.stringify(ride))
    res.send(ride);
}