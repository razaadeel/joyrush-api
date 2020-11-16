const { check, validationResult } = require('express-validator');

exports.checkLocations = (req, res, next) => {
    try {
        let { origin, destination } = req.body;
        if (origin && destination) {
            if (origin.lat && origin.lng && destination.lat && destination.lng) {
                req.origin = `${origin.lat},${origin.lng}`;
                req.destination = `${destination.lat},${destination.lng}`;
                next();
            } else {
                return res.status(400).json({
                    status: 'failed',
                    msg: 'To and From locations cannot be empty',
                });
            }
        }
    } catch (error) {
        res.status(400).json({ msg: 'Error while getting distance' });
    }
}

exports.checkSaveBooking = [
    check('userId', 'User Id is Required').isMongoId(),
    check('bookingType', 'Booking Type id is not correct').isMongoId(),
    check('origin.lat', 'Origin Latitude is  requried').isLength({ min: 1 }).notEmpty(),
    check('origin.lng', 'Origin Longitude is required').isLength({ min: 1 }).notEmpty(),
    check('destination.lat', 'Destination Latitude is  requried').isLength({ min: 1 }).notEmpty(),
    check('destination.lng', 'Destination Longitude is required').isLength({ min: 1 }).notEmpty(),
    // check('distanceCovered', 'Distance Covered is Required').notEmpty(),
    // check('timeTaken', 'Time taken is is Required').notEmpty(),
    // check('estimatedPrice', 'Estimated Price is Required').notEmpty(),
    (req, res, next) => {
        console.log('working')
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                status: 'failed',
                msg: error.array()[0].msg,
            });
        }
        next();
    }
]