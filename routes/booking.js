const express = require('express');
const router = express.Router();

//Controllers
const bookingController = require('../controllers/bookingController');
//Middlewares
const booking = require('../middlewares/booking');



// Get online drivers
router.get('/online_drivers', bookingController.onlineDrivers);
router.post('/get_distance', booking.checkLocations, bookingController.mapDistance);
router.get('/booking_types', bookingController.getTypes);
router.post('/save_booking', booking.checkSaveBooking, bookingController.saveBooking);

module.exports = router;