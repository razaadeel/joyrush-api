const axios = require('axios');
const config = require('config');
//DB Model 
const Driver = require('../models/Driver');
const BookingTypes = require('../models/BookingTypes');

exports.onlineDrivers = async (req, res) => {
    try {
        const onlineDrivers = await Driver
            .find({ isOnline: true })
            .populate('vehicleType', ['name']);

        res.status(200).json(onlineDrivers);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
}

exports.mapDistance = async (req, res) => {
    try {
        let apiKey = config.get('mapApiKey');
        let map = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${req.origin}&destinations=${req.destination}&key=${apiKey}`);
        map = map.data;
        res.status(200).json({
            duration: map.rows[0].elements[0].duration.text,
            distance: map.rows[0].elements[0].distance.text
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}

exports.getTypes = async (req, res) => {
    try {
        let id = req.query.id;
        let bookingTypes = null;
        if (id) {
            bookingTypes = await BookingTypes.findById(id);
            res.status(200).json(bookingTypes);
        } else {
            bookingTypes = await BookingTypes.find();
            res.status(200).json(bookingTypes);
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error');
    }
}