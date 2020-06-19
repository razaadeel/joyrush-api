const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get the Token form Header
    const token = req.header('x-auth-token');

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
        res.status(401).json({ msg: 'Token not Valid' });
    }
}