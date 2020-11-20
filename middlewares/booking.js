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

exports.checkTypesBody = [
    check('distance', 'Distance is requried').notEmpty(),
    check('duration', 'Duration is requried').notEmpty(),
    (req, res, next) => {
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

exports.checkSaveBooking = [
    check('userId', 'User Id is Required').isMongoId(),
    check('bookingType', 'Booking Type id is not correct').isMongoId(),
    check('origin.latitude', 'Origin Latitude is  requried').notEmpty(),
    check('origin.longitude', 'Origin Longitude is required').notEmpty(),
    check('destination.latitude', 'Destination Latitude is  requried').notEmpty(),
    check('destination.longitude', 'Destination Longitude is required').notEmpty(),
    // check('distanceCovered', 'Distance Covered is Required').notEmpty(),
    // check('timeTaken', 'Time taken is is Required').notEmpty(),
    // check('estimatedPrice', 'Estimated Price is Required').notEmpty(),
    (req, res, next) => {
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