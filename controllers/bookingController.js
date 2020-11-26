const axios = require('axios');
const config = require('config');
//DB Model 
const Driver = require('../models/Driver');
const BookingTypes = require('../models/BookingTypes');
const Booking = require('../models/Booking');

exports.onlineDrivers = async (req, res) => {
    try {
        const onlineDrivers = await Driver
            .find({ isOnline: true })
            .populate('vehicleType', ['name']);

        res.status(200).json(onlineDrivers);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }
}

exports.mapDistance = async (req, res) => {
    try {
        let bookingType = await BookingTypes.findOne({ name: 'Car' });

        let apiKey = config.get('mapApiKey');
        let map = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${req.origin}&destinations=${req.destination}&key=${apiKey}`);
        map = map.data;

        let data = map.rows[0].elements[0];
        let estimatedDuration = data.duration.value / 60;
        let distance = data.distance.value / 1000;
        let estimatedPrice = bookingType.priceMin * estimatedDuration + bookingType.priceKm * distance;

        res.status(200).json({
            duration: data.duration,
            distance: data.distance,
            estimatedPrice: estimatedPrice.toFixed(2)
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ msg: 'Server Error' });
    }
}

exports.getTypes = async (req, res) => {
    //req by id
    // try {
    //     let id = req.query.id;
    //     let bookingTypes = null;
    //     if (id) {
    //         bookingTypes = await BookingTypes.findById(id);
    //         res.status(200).json(bookingTypes);
    //     } else {
    //         bookingTypes = await BookingTypes.find().select('name');
    //         res.status(200).json(bookingTypes);
    //     }
    // } catch (error) {
    //     console.log(error.message)
    //     res.status(500).send({ msg: 'Server Error' });
    // }
    try {
        let { distance, duration } = req.body;
        let bookingTypes = await BookingTypes.find();
        let data = bookingTypes.map(type => ({
            id: type._id,
            name: type.name,
            estimatedPrice: (type.priceMin * duration + type.priceKm * distance).toFixed(2),
        }))
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ msg: 'Server Error' });
    }
}

exports.saveBooking = async (req, res) => {
    try {
        let data = req.body;

        let booking = new Booking(data);
        await booking.save();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: error.message });
    }
}

exports.getUserBookings = async (req, res) => {
    try {
        let data = await Booking.find({ userId: req.user.id })
            .populate('bookingType', 'name');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: error.message });
    }
}