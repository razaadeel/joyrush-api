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