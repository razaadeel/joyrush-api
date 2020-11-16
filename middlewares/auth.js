const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

exports.checkSignUp = [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Please Enter a password of 6 or more characters').isLength({ min: 6 }),
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
];

exports.checkSignIn = [
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Password cannot be empty').notEmpty(),
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
];


exports.verifyToken = (req, res, next) => {
    // Get the Token form Header
    const token = req.header('Authorization');
    // Check if there is no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, Access denied' });
    }

    // Verify Token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ msg: 'Token not Valid' });
    }
}