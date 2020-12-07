const express = require('express');
const router = express.Router();

//Controllers
const bookingController = require('../controllers/bookingController');
//Middlewares
const booking = require('../middlewares/booking');
const auth = require('../middlewares/auth');



router.get('/online_drivers', bookingController.onlineDrivers);
router.post('/get_distance', booking.checkLocations, bookingController.mapDistance);
router.post('/booking_types', booking.checkTypesBody, bookingController.getTypes);
router.post('/save_booking', booking.checkSaveBooking, bookingController.saveBooking);
router.post('/user_bookings', auth.verifyToken, bookingController.getUserBookings);

module.exports = router;