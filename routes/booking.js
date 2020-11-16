const express = require('express');
const router = express.Router();

//Controllers
const bookingController = require('../controllers/bookingController');
//Middlewares
const booking = require('../middlewares/booking');

const BookingTypes = require('../models/BookingTypes');


// Get online drivers
router.get('/online_drivers', bookingController.onlineDrivers);
router.post('/get_distance', booking.checkLocations, bookingController.mapDistance);
router.get('/booking_types', bookingController.getTypes);

module.exports = router;